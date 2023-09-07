import "./Edit.css";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/joy/Button";
import MaterialButton from "@mui/material/Button";
import { Vacation } from "../../../../Models/Vacation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RootState, vacation } from "../../../../Redux/VacationStore";
import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    InputAdornment,
    TextField,
} from "@mui/material";
import axios from "axios";
import { editVacationsAction } from "../../../../Redux/VacationReducer";
import { VacationWithKey } from "../../../../Models/VacationWithKey";
import { useSelector } from "react-redux";
import notify from "../../../../Models/Notyf";

// props to get vacation information from VacationCard component
type EditVacationProps = {
    editVacation: VacationWithKey;
};

function Edit({ editVacation }: EditVacationProps): JSX.Element {
    const [open, setOpen] = useState(false);
    // set the image
    const [image, setImage] = useState(editVacation.picture_file);
    // handle the image change
    function handleChange(event: any) {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    }

    // save the image in the backend
    const uploadImage = (newImage: any) => {
        // console.log(newImage);
        const image = new FormData();
        image.append("sampleFile", newImage);
        axios.post(
            "http://localhost:8080/api/v1/vacation/vacations/uploadImage",
            image,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
    };

    const updateVacation = async (updatedVacation: Vacation) => {
        // check if the image has changed
        const oldImage = editVacation.picture_file;
        const newImage = (updatedVacation.picture_file as any)[0];
        let updatedVacationWithName: any = { ...updatedVacation }; // Clone the object
        if (newImage && newImage.name) {
            updatedVacationWithName.picture_file = newImage.name; // Replace with the name
        }
        // edit the vacation
        await axios
            .put(
                `http://localhost:8080/api/v1/vacation/vacations/editVacation/${editVacation.vacation_key}`,
                updatedVacationWithName
            )
            .then(() => {
                handleClose();
                // delete the image from the backend
                if (
                    oldImage.split("/").pop() !== newImage.name &&
                    newImage.name !== undefined
                ) {
                    // delete the old image from the backend
                    const imageName = new URL(oldImage).pathname
                        .split("/")
                        .pop();
                    axios
                        .delete(
                            `http://localhost:8080/api/v1/vacation/vacations/deleteImage/${imageName}`
                        )
                        .then(() => {
                            // dispatch the delete action to Redux store
                            vacation.dispatch(
                                editVacationsAction({
                                    ...updatedVacation,
                                    picture_file:
                                        newImage && newImage.name
                                            ? newImage.name
                                            : oldImage.split("/").pop(),
                                    vacation_key: editVacation.vacation_key,
                                })
                            );

                            uploadImage(newImage);
                            console.log(
                                `Image ${oldImage
                                    .split("/")
                                    .pop()} was successfully deleted and ${
                                    newImage.name
                                } was uploaded.`
                            );
                        })
                        .catch((error) => {
                            console.error(
                                "There was an error deleting the image:",
                                error
                            );
                            notify.error(`The image has not been deleted`);
                        });
                } else {
                    // dispatch the delete action to Redux store
                    vacation.dispatch(
                        editVacationsAction({
                            ...updatedVacation,
                            vacation_key: editVacation.vacation_key,
                        })
                    );
                    notify.success(
                        "The vacation has been updated successfully"
                    );
                }
            });
    };

    // converts a date from the format dd/mm/yyyy to yyyy-mm-dd for edit.
    function transformDate(dateStr: string) {
        const [day, month, year] = dateStr.split("/");
        return `${year}-${month}-${day}`;
    }

    //  converts a date from the format yyyy-mm-dd to dd/mm/yyyy after edit.
    function reverseTransformDate(dateStr: string) {
        const [year, month, day] = dateStr.split("-");
        return `${day}/${month}/${year}`;
    }

    // get the vacation from redux
    const vacations = useSelector(
        (state: RootState) => state.vacations.vacations
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        reset,
    } = useForm<Vacation>({
        defaultValues: {
            ...editVacation,
            start_date: transformDate(editVacation.start_date),
            end_date: transformDate(editVacation.end_date),
        },
    });

    const handleClickOpen = () => {
        // after edit get the new values
        const updatedVacation = vacations.find(
            (vacation) => vacation.vacation_key === editVacation.vacation_key
        );
        if (updatedVacation) {
            reset({
                ...updatedVacation,
                start_date: transformDate(updatedVacation.start_date),
                end_date: transformDate(updatedVacation.end_date),
            });
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        reset();
    };

    const onSubmit = () => {
        // get the values of the input fields
        const formValues = getValues();
        // Transform dates back to dd/mm/yyyy format
        const updatedValues = {
            ...formValues,
            start_date: reverseTransformDate(formValues.start_date),
            end_date: reverseTransformDate(formValues.end_date),
        };
        updateVacation(updatedValues);
    };

    return (
        <div className="EditVacation">
            <Button
                sx={{ width: "3px", marginLeft: "6px" }}
                onClick={handleClickOpen}
            >
                <EditIcon />
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                sx={{
                    backgroundColor: "rgba(0,0,0,0.5)",
                }}
            >
                <DialogTitle>Edit Vacation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To edit this vacation, please update the information
                        below.
                    </DialogContentText>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            margin="dense"
                            id="destination"
                            label="destination"
                            fullWidth
                            {...register("destination", { required: true })}
                            error={Boolean(errors.destination)}
                            helperText={
                                errors.destination && "Destination is required"
                            }
                        />
                        <TextField
                            margin="dense"
                            id="description"
                            label="description"
                            type="text"
                            fullWidth
                            multiline
                            rows={3}
                            {...register("description", { required: true })}
                            error={Boolean(errors.description)}
                            helperText={
                                errors.description && "Description is required"
                            }
                        />
                        <label htmlFor="startDate" className="label-large">
                            Start date:
                        </label>
                        <TextField
                            margin="dense"
                            type="date"
                            id="start_date"
                            fullWidth
                            {...register("start_date", { required: true })}
                            error={Boolean(errors.start_date)}
                            helperText={
                                errors.start_date && "Start date is required"
                            }
                        />
                        <label htmlFor="finishDate" className="label-large">
                            Finish date:
                        </label>
                        <TextField
                            margin="dense"
                            type="date"
                            id="end_date"
                            fullWidth
                            {...register("end_date", {
                                required: true,
                                validate: {
                                    notEarlier: (value) => {
                                        const start_date = new Date(
                                            getValues("start_date")
                                        ); // get start date from form values
                                        const end_date = new Date(value); // convert finish date string to date object
                                        return end_date >= start_date;
                                    },
                                },
                            })}
                            error={Boolean(errors.end_date)}
                            helperText={
                                errors.end_date &&
                                "Finish date is required and must be later than start date"
                            }
                        />
                        <TextField
                            margin="dense"
                            placeholder="Price"
                            label="price"
                            type="number"
                            id="price"
                            fullWidth
                            {...register("price", {
                                required: true,
                                min: 0,
                                max: 10000,
                            })}
                            error={Boolean(errors.price)}
                            helperText={
                                errors.price &&
                                "Price is required and must be between 0 and 10000"
                            }
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        $
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            margin="dense"
                            type="file"
                            id="picture_file"
                            fullWidth
                            {...register("picture_file")}
                            onChange={handleChange}
                        />
                        <div className="container">
                            <img className="preview" src={image} alt={image} />
                        </div>
                        <MaterialButton onClick={handleClose} color="error">
                            Cancel
                        </MaterialButton>
                        <MaterialButton type="submit" color="success">
                            Save
                        </MaterialButton>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Edit;
