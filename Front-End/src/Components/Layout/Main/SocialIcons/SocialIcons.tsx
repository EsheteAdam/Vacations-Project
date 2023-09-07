import { Box, Typography } from "@mui/material";
import "./SocialIcons.css";
import { SocialIcon } from "react-social-icons";

function SocialIcons(): JSX.Element {
    const styles = {
        iconContainer: {
            margin: "0 8px",
        },
    };
    return (
        <Box className="iconContainer">
            <Typography variant="body2" color="text.secondary" align="center">
                <SocialIcon
                    url="https://www.facebook.com/adam.eshete.5/"
                    network="facebook"
                    style={styles.iconContainer}
                    target="_blank"
                    className="social-icon"
                />
                <SocialIcon
                    url="https://github.com/EsheteAdam"
                    network="github"
                    style={styles.iconContainer}
                    target="_blank"
                    className="social-icon"
                />
                <SocialIcon
                    url="https://www.linkedin.com/in/%D7%90%D7%93%D7%9D-%D7%90%D7%99%D7%A9%D7%98%D7%94-7b229b25a/"
                    network="linkedin"
                    style={styles.iconContainer}
                    target="_blank"
                    className="social-icon"
                />
            </Typography>
        </Box>
    );
}

export default SocialIcons;
