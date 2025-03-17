import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const isAuthenticated = localStorage.getItem("token"); // ✅ Check if user is logged in

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
