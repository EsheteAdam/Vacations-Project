import { useSelector } from "react-redux";
import "./Main.css";
import { RootState } from "../../../Redux/VacationStore";
import LoginMode from "./LoginMode/LoginMode";
import UnLoginMode from "./UnLoginMode/UnLoginMode";

function Main(): JSX.Element {
    const user = useSelector((state: RootState) => state.users.currentUser);

    return (
        <div className="Main">
            {user == null && <UnLoginMode />}
            {user !== null && <LoginMode />}
        </div>
    );
}

export default Main;
