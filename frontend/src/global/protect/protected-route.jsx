import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserProvider } from "../users/data-user";
import { useEffect } from "react";
import { AuthProvider } from "@/routes/routers";

function ProtectedRoute({ children }) {
    const { path } = useContext(AuthProvider);
    const { role, getUsers } = useContext(UserProvider);

    useEffect(() => {
        getUsers();
    }, []);

    if (role && role !== 'admin') {
        return <Navigate to={path.dashboard} state={{ from: path.listUsers }} replace />;
    } else {
        return children;
    }
}

export default ProtectedRoute;