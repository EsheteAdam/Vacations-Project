import { ThemeProvider } from "@emotion/react";
import { Typography, Box, Stack, createTheme, Button } from "@mui/material";
import "./LoginMode.css";

import { NavLink } from "react-router-dom";

// TODO remove, this demo shouldn't need to reset the theme.
const theme = createTheme({
    typography: {
        body1: {
            color: "#ffffff",
        },
        h1: {
            color: "#ffffff",
            fontSize: "4rem",
            lineHeight: "1.2",
        },
        subtitle1: {
            fontSize: "1.5rem",

            lineHeight: "1.5",
        },
    },
});

function LoginMode(): JSX.Element {
    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography variant="h1" sx={{ p: 5 }}>
                    A.A.G Vacations
                </Typography>
                <Typography variant="subtitle1">
                    Discover the world with A.A.G Vacations – your ultimate
                    getaway awaits. Immerse yourself in our curated collection
                    of unforgettable destinations, meticulously designed by our
                    expert team. From sun-kissed beaches to historic wonders,
                    embark on a journey that will leave you breathless. Let your
                    wanderlust guide you as you explore the extraordinary. The
                    world is calling, and A.A.G Vacations is ready to take you
                    there.
                </Typography>
                <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                >
                    <Button variant="contained" color="secondary">
                        <NavLink
                            to={"/vacations"}
                            style={{ textDecoration: "none" }}
                        >
                            Vacations Page
                        </NavLink>
                    </Button>
                    <Button variant="contained">
                        <NavLink
                            to={"/about"}
                            style={{ textDecoration: "none" }}
                        >
                            About
                        </NavLink>
                    </Button>
                </Stack>
            </Box>
        </ThemeProvider>
    );
}

export default LoginMode;
