import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup"; // ✅ Signup Page Add
import Manager from "./components/Manager"; 
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
const App = () => {
    return (
        <AuthProvider>
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} /> {/* ✅ Signup Route */}

                {/* Protected Route */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Manager />} />
                </Route>

                {/* Default Redirect */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
        </AuthProvider>
    );
};

export default App;
