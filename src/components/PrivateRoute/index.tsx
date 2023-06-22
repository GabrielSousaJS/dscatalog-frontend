import { Navigate } from "react-router-dom";
import { Role, hasAnyRoles, isAuthenticated } from "../../util/auth";

type Props = {
    children: JSX.Element;
    roles?: Role[]
}

export function PrivateRoute({children, roles = []}: Props) {
    if (!isAuthenticated()) {
        return <Navigate to='/admin/auth/login'/>;
    } else {
        return !hasAnyRoles(roles) ? (
            <Navigate to='/admin/products' />
        ) : (
            children
        );
    }
};