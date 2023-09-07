import "./Register.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { User } from "../../../Models/User";
import { userLoginAction } from "../../../Redux/UserReducer";
import { vacation } from "../../../Redux/VacationStore";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Person, Group, Email, Password } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import notify from "../../../Models/Notyf";

// saves new user in the database and redux
const addNewUser = async (newUser: User) => {
    await axios
        .post("http://localhost:8080/api/v1/vacation/users/newUser", newUser)
        .then((response) => {
            vacation.dispatch(
                userLoginAction(
                    newUser.first_name,
                    newUser.last_name,
                    "user",
                    response.data.insertId
                )
            );
        });
};

function Copyright(props: any) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                A.A.G Vacations
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Register() {
    // use navigate for page navigate
    const navigate = useNavigate();
    // use form for form validation
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const send = async (data: any) => {
        // checking if email exists in database
        try {
            const response = await axios.post(
                "http://localhost:8080/api/v1/vacation/users/checkEmail",
                { email: data.email }
            );
            if (response.data) {
                notify.error(
                    "This email is already registered, please try again"
                );
                // if email don't exists add new user to database
            } else {
                const newUser: User = {
                    first_name: data.firstName,
                    last_name: data.lastName,
                    email: data.email,
                    password: data.password,
                    role: "user",
                };
                await addNewUser(newUser);
                navigate("/vacations");
                notify.success(
                    `Welcome ${data.firstName
                        .charAt(0)
                        .toUpperCase()}${data.firstName.slice(
                        1
                    )} ${data.lastName
                        .charAt(0)
                        .toUpperCase()}${data.lastName.slice(1)}`
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 1.5,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        border: "1px solid black",
                        borderRadius: "25px",
                        padding: "3rem",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.7)",
                        backgroundImage:
                            "linear-gradient(90deg, lightblue, lightgray)",
                    }}
                >
                    <Avatar sx={{ bgcolor: "lightblue", color: "yellow" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <form onSubmit={handleSubmit(send)}>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        {...register("firstName", {
                                            required: true,
                                        })}
                                        error={Boolean(errors.firstName)}
                                        helperText={
                                            errors.firstName &&
                                            "First name is required"
                                        }
                                        placeholder="First Name"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Person />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        autoFocus
                                        {...register("lastName", {
                                            required: true,
                                        })}
                                        error={Boolean(errors.lastName)}
                                        helperText={
                                            errors.lastName &&
                                            "Last name is required"
                                        }
                                        placeholder="Last Name"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Group />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        autoFocus
                                        {...register("email", {
                                            required: true,
                                            pattern:
                                                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        })}
                                        error={Boolean(errors.email)}
                                        helperText={
                                            errors.email &&
                                            "Email is required and must be a valid email address"
                                        }
                                        placeholder="Email Address"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Email />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        autoFocus
                                        label="Password"
                                        type="password"
                                        id="password"
                                        {...register("password", {
                                            required: true,
                                            minLength: 4,
                                        })}
                                        error={Boolean(errors.password)}
                                        helperText={
                                            errors.password &&
                                            "Password must have a minimum of 4 characters"
                                        }
                                        placeholder="Password"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Password />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Sign Up
                                    </Button>
                                </form>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 1 }} />
            </Container>
        </ThemeProvider>
    );
}
