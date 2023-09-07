import "./Delete.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/joy/Button";
import axios from "axios";
import { useState } from "react";
import { RootState, vacation } from "../../../../Redux/VacationStore";
import { deleteVacationAction } from "../../../../Redux/VacationReducer";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { VacationWithKey } from "../../../../Models/VacationWithKey";
import { useSelector } from "react-redux";
import { removeAllFollowsAction } from "../../../../Redux/FollowReducer";
import notify from "../../../../Models/Notyf";

// props to get vacation information from VacationCard component
type DeleteVacationProps = {
    vacationToDelete: VacationWithKey;
};

function Delete({ vacationToDelete }: DeleteVacationProps): JSX.Element {
    //for the alert if to delete the vacation
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //  get the logged in user state
    const followers = useSelector(
        (state: RootState) => state.follower.followers
    );

    const deleteVacation = async (vacation_key: number, image: string) => {
        // if the vacation has a follow remove it from database and redux
        if (
            followers.some((follower) => follower.vacation_key === vacation_key)
        ) {
            await axios.delete(
                `http://localhost:8080/api/v1/vacation/followers/removeAllFollowers/${vacation_key}`
            );
            vacation.dispatch(removeAllFollowsAction(vacation_key));
        }
        // delete the vacation from mysql and image from backend
        await axios
            .delete(
                `http://localhost:8080/api/v1/vacation/vacations/delete/${vacation_key}`
            )
            .then(() => {
                handleClose();
                // dispatch the delete action to Redux store
                vacation.dispatch(deleteVacationAction(vacation_key));
                // delete the image from the backend
                const imageName = new URL(image).pathname.split("/").pop();
                axios
                    .delete(
                        `http://localhost:8080/api/v1/vacation/vacations/deleteImage/${imageName}`
                    )
                    .then(() => {
                        console.log(
                            `Image: ${image} was successfully deleted.`
                        );
                        notify.success(
                            `The ${vacationToDelete.destination} vacation has been successfully deleted`
                        );
                    })
                    .catch((error) => {
                        console.error(
                            "There was an error deleting the image:",
                            error
                        );
                    });
            });
    };

    return (
        <div className="Delete">
            <Button
                color="danger"
                sx={{ width: "3px" }}
                onClick={handleClickOpen}
            >
                <DeleteForeverIcon />
            </Button>
            {/* dialog for confirmation of delete */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"delete this vacation?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {`Are you sure you want to delete the ${vacationToDelete.destination} vacation?`}
                        <br />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="success" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        onClick={() =>
                            deleteVacation(
                                vacationToDelete.vacation_key,
                                vacationToDelete.picture_file
                            )
                        }
                        color="danger"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Delete;
