import { Navigate, Route } from "react-router-dom";
import { isAuthenticated } from "../../util/requests";

type Props = {
    children: JSX.Element;
}

export function PrivateRoute({children}: Props) {
    if (!isAuthenticated()) {
        return <Navigate to='/admin/auth/login'/>;
    }

    return children;
}