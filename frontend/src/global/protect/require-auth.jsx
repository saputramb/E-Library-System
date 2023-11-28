import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthProvider } from "../../routes/routers";

function RequireAuth({ children }) {
    const { isLogin, path } = useContext(AuthProvider);

    if (!isLogin) {
        return <Navigate to={path.root} state={{ from: path.dashboard }} replace />;
    } else {
        return children;
    }
}

export default RequireAuth;