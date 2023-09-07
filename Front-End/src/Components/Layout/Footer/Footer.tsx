import { Container, Typography } from "@mui/material";

import "./Footer.css";

function Footer(): JSX.Element {
    return (
        <div className="Footer" style={{ position: "fixed" }}>
            <Container maxWidth="sm">
                <Typography
                    variant="overline"
                    align="center"
                    color="text.secondary"
                >
                    © {new Date().getFullYear()} A.A.G Vacations. All rights
                    reserved to Adam Eshete.
                </Typography>
            </Container>
        </div>
    );
}

export default Footer;
