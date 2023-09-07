import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import "./NavBar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, vacation } from "../../../../Redux/VacationStore";
import { userLogoutAction } from "../../../../Redux/UserReducer";
import { Chip, Stack, Typography } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

function ResponsiveAppBar() {
    // check if user or admin is logged in
    const role = useSelector((state: RootState) => state.users.role);
    const user = useSelector((state: RootState) => state.users.currentUser);
    console.log(role);
    // conditional rendering if user is logged in or not
    const pages = user ? ["Vacations", "About"] : ["Login", "Register"];
    const settings = ["Logout"];

    //Vacation Reports only for admin
    if (role === "admin") {
        pages.push("Vacation Reports");
    }

    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // logout user
    const handleLogout = () => {
        vacation.dispatch(userLogoutAction());
        setAnchorElUser(null);
        navigate("/");
    };
    console.log(user);
    return (
        <AppBar position="fixed" sx={{ top: 0, backgroundColor: "Highlight" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="button"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 3,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            fontSize: "2rem",
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        A.A.G Vacations
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map((page) => (
                                <NavLink
                                    key={page}
                                    style={{ textDecorationLine: "none" }}
                                    to={`/${page
                                        .replace(/\s/g, "")
                                        .toLowerCase()}`}
                                >
                                    <MenuItem
                                        key={page}
                                        onClick={handleCloseNavMenu}
                                    >
                                        <Typography textAlign="center">
                                            {page}
                                        </Typography>
                                    </MenuItem>
                                </NavLink>
                            ))}
                        </Menu>
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {pages.map((page) => (
                            <NavLink
                                key={page}
                                style={{ textDecoration: "none" }}
                                to={`/${page.replace(/\s/g, "").toLowerCase()}`}
                            >
                                <Button
                                    key={page}
                                    style={{ color: "white" }}
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: "rgb(144, 192, 245)",
                                        display: "block",
                                    }}
                                >
                                    {page}
                                </Button>
                            </NavLink>
                        ))}
                    </Box>
                    {role && (
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open Settings">
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0, mb: 0.5 }}
                                >
                                    <Stack direction="row" spacing={1}>
                                        <Chip
                                            icon={<ManageAccountsIcon />}
                                            label={`${user?.first_name
                                                ?.charAt(0)
                                                .toUpperCase()}${user?.first_name?.slice(
                                                1
                                            )} ${user?.last_name
                                                ?.charAt(0)
                                                .toUpperCase()}${user?.last_name?.slice(
                                                1
                                            )}`}
                                            variant="outlined"
                                        />
                                    </Stack>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: "45px" }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem
                                        key={setting}
                                        onClick={handleLogout}
                                    >
                                        <Typography textAlign="center">
                                            {setting}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
