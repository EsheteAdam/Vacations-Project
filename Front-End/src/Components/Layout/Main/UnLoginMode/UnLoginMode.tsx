import {
    Box,
    CssBaseline,
    Grid,
    Paper,
    ThemeProvider,
    Typography,
    createTheme,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import "./UnLoginMode.css";
import SocialIcons from "../SocialIcons/SocialIcons";

function UnLoginMode() {
    // TODO remove, this demo shouldn't need to reset the theme.
    const defaultTheme = createTheme();
    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid
                container
                component="main"
                sx={{ height: "100vh", position: "fixed" }}
            >
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage:
                            "url(https://source.unsplash.com/random?vacations)",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) =>
                            t.palette.mode === "light"
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                    sx={{ backgroundColor: "ButtonFace" }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            backgroundSize: "cover",
                        }}
                    >
                        <Typography>
                            <div className="content-container">
                                <h1>Welcome To A.A.G Vacations</h1>
                                <p>
                                    Welcome to A.A.G Vacations - the perfect
                                    destination for an unforgettable vacation!
                                </p>
                                <p>
                                    To unlock a world of unforgettable
                                    experiences,
                                </p>
                                <Typography>
                                    please{" "}
                                    <NavLink
                                        to={"/register"}
                                        style={{ textDecoration: "none" }}
                                    >
                                        Register
                                    </NavLink>{" "}
                                    or{" "}
                                    <NavLink
                                        to={"/login"}
                                        style={{ textDecoration: "none" }}
                                    >
                                        Login
                                    </NavLink>
                                    .
                                </Typography>
                            </div>
                        </Typography>

                        <SocialIcons />
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default UnLoginMode;
