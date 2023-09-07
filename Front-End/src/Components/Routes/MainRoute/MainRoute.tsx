import { Navigate, Route, Routes } from "react-router-dom";
import "./MainRoute.css";
import { RootState } from "../../../Redux/VacationStore";
import Main from "../../Layout/Main/Main";
import Login from "../../Pages/Login/Login";
import Page404 from "../../Pages/Page404/Page404";
import Register from "../../Pages/Register/Register";
import { useSelector } from "react-redux";
import VacationsPage from "../../Pages/VacationsPage/VacationsPage";
import About from "../../Pages/About/About";
import Report from "../../Pages/VacationsPage/Report/Report";

function MainRoute(): JSX.Element {
    const role = useSelector((state: RootState) => state.users.role);

    const UserOrRedirect = () => {
        if (role === "user" || role === "admin") {
            return <VacationsPage />;
        } else {
            // If user is not logged in, redirect to login
            return <Navigate to="/login" replace />;
        }
    };

    const AdminOrRedirect = () => {
        if (role === "admin") {
            return <Report />;
        } else {
            // If user is not admin, redirect to page404
            return <Navigate to="/*" replace />;
        }
    };
    return (
        <div className="MainRoute">
            <Routes>
                <Route path="about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/vacations" element={<UserOrRedirect />} />
                <Route path="/vacationReports" element={<AdminOrRedirect />} />
                <Route path="/" element={<Main />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </div>
    );
}

export default MainRoute;
