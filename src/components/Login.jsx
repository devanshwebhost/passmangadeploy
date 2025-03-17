import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // ✅ Loader state
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;

    
    const handleLogin = async () => {
        try {
            setLoading(true); // 🟢 Start loader
            const response = await fetch(`${BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password })
            });
    
            const data = await response.json();
            console.log(data)
            if (response.ok) {
                localStorage.setItem("token", data.token); // ✅ Save token
                localStorage.setItem("user", JSON.stringify({ username: data.username, email: data.email })); // ✅ Save user details
    
                alert(`Welcome to PassManga!`); // ✅ Show welcome message
                navigate("/dashboard", { replace: true });
            } else {
                alert("Login Failed: " + data.error);
            }
        } catch (error) {
            console.error("Login Error:", error);
        }
        setLoading(false); // 🔴 Stop loader
    };
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    onClick={handleLogin}
                    className={`w-full py-3 rounded-lg font-semibold transition duration-300 ${
                        loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                    disabled={loading}
                >
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                            Logging in...
                        </div>
                    ) : (
                        "Login"
                    )}
                </button>

                <p className="text-sm text-gray-500 text-center mt-4">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-blue-500 font-semibold hover:underline">
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
