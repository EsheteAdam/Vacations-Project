import "./Login.css";
import "notyf/notyf.min.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { adminLoginAction, userLoginAction } from "../../../Redux/UserReducer";
import { vacation } from "../../../Redux/VacationStore";
import { Email, Password } from "@mui/icons-material";
import { InputAdornment, TextField, Typography } from "@mui/material";
import notify from "../../../Models/Notyf";
import img from "../../../assets/1111.jpg";

function Copyright(props: any) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <NavLink color="inherit" to={"/"}>
                A.A.G Vacations
            </NavLink>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Login() {
    // use navigate for page navigate
    const navigate = useNavigate();

    const send = async (data: any) => {
        // checking if email and password exists in database
        try {
            const response = await axios.post(
                "http://localhost:8080/api/v1/vacation/users/checkUser",
                { email: data.email, password: data.password }
            );
            // get the first and last name by email
            const firstLastName = await axios.get(
                `http://localhost:8080/api/v1/vacation/users/getFirstLastName/${data.email}`
            );
            console.log(firstLastName.data);
            if (response.data) {
                const isAdmin =
                    data.email === "adam@adam.adam" &&
                    data.password === "admin";
                if (isAdmin) {
                    // Dispatch admin login
                    vacation.dispatch(
                        adminLoginAction(
                            firstLastName.data.first_name,
                            firstLastName.data.last_name,
                            firstLastName.data.role
                        )
                    );
                    // Dispatch user login
                } else {
                    vacation.dispatch(
                        userLoginAction(
                            firstLastName.data.first_name,
                            firstLastName.data.last_name,
                            firstLastName.data.role,
                            firstLastName.data.user_key
                        )
                    );
                }
                navigate("/vacations");
                notify.success(
                    `Hello ${firstLastName.data.first_name
                        .charAt(0)
                        .toUpperCase()}${firstLastName.data.first_name.slice(
                        1
                    )} ${firstLastName.data.last_name
                        .charAt(0)
                        .toUpperCase()}${firstLastName.data.last_name.slice(1)}`
                );

                // if email or password don't exists give an error notyf
            } else {
                notify.error(
                    "Invalid email or password. Please check your credentials and try again"
                );
            }
        } catch (error) {
            console.error(error);
            notify.error(
                "Invalid email or password. Please check your credentials and try again"
            );
        }
    };

    // use form for form validation
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
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
                    <Avatar sx={{ bgcolor: "transparent", color: "yellow" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                        <form onSubmit={handleSubmit(send)}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Email Address"
                                placeholder="Email Address"
                                autoFocus
                                {...register("email", {
                                    required: true,
                                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                })}
                                error={Boolean(errors.email)}
                                helperText={
                                    errors.email &&
                                    "Email is required and must be a valid email address"
                                }
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
                                label="Password"
                                type="password"
                                id="password"
                                placeholder="Password"
                                {...register("password", {
                                    required: true,
                                    minLength: 4,
                                })}
                                error={Boolean(errors.password)}
                                helperText={
                                    errors.password &&
                                    "Password must have a minimum of 4 characters"
                                }
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
                                Sign In
                            </Button>
                        </form>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
