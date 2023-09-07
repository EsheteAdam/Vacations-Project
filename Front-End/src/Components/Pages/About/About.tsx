import "./About.css";
import { Box, Container, Typography } from "@mui/material";
import SocialIcons from "../../Layout/Main/SocialIcons/SocialIcons";

function About(): JSX.Element {
    return (
        <div className="About">
            <Container className="content-container">
                <Typography variant="h2">
                    <h3>About</h3>
                </Typography>
                <Typography variant="body2">
                    <h2>General Info</h2>
                    <p>
                        This project is a vacation management system with two
                        types of roles: Users and Admin. It provides the
                        functionality to manage and view vacations based on
                        different parameters.
                    </p>
                </Typography>
                <Typography>
                    <h2>Roles and Functionalities</h2>
                    <br />
                    <h3>User</h3>
                    <p>View vacations - Follow/Unfollow vacations.</p>
                    <h3>Admin</h3>
                    <p>
                        add, edit, and delete vacations - View reports and
                        download CSV file.
                    </p>
                </Typography>
                <Typography>
                    <h2>Infrastructure</h2>
                    <p>
                        The project is built using the following technologies:
                        <br />
                        - Database: MySQL
                        <br />
                        - Server Side: REST API in Node.js using Express
                        <br />- Client Side: React with Redux using TypeScript
                    </p>
                </Typography>
                <Typography>
                    <h2>Vacations Page (User)</h2>
                    <p>
                        Only logged in users can view the vacations page. It
                        displays vacation details, followers, and follow status.
                        Additionally, it supports pagination for displaying
                        vacations and provides filtering options.
                    </p>
                </Typography>
                <Typography>
                    <h2>Admin Interface</h2>
                    <h3>Vacation Page</h3>
                    <p>
                        The admin interface includes options to add a new
                        vacation, as well as delete and edit options for each
                        vacation card.
                    </p>
                    <h3>Vacation Reports Page</h3>
                    <p>
                        The admin interface also includes a vacation reports
                        page that displays all vacation names, including their
                        follower counts, and provides an option to download the
                        data in CSV format.
                    </p>
                </Typography>
                <Typography>
                    <h2>Prerequisites</h2>
                    <p>
                        To run this project, you'll need the following
                        prerequisites:
                        <br />
                        - Node.js
                        <br />
                        - MySQL
                        <br />
                        - React
                        <br />
                        - Redux
                        <br />
                        - TypeScript
                        <br />
                        - Express
                        <br />- Docker
                    </p>
                </Typography>
                <Box sx={{ padding: 2 }}>
                    <SocialIcons />
                </Box>
            </Container>
        </div>
    );
}

export default About;
