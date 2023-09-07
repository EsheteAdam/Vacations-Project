import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import "./Page404.css";
import { NavLink } from "react-router-dom";

function Page404(): JSX.Element {
    return (
        <div className="Page404">
            <div className="spin circle">
                <Typography variant="h5">
                    <h1>404</h1>
                    <Button variant="text" style={{ textDecoration: "none" }}>
                        <NavLink to={"/"}>Home</NavLink>
                    </Button>
                </Typography>
            </div>
        </div>
    );
}

export default Page404;
