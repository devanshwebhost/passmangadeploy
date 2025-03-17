import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // ✅ Loader state
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;

    const handleSignup = async () => {
        try {
            setLoading(true); // 🟢 Start loader
            const response = await fetch(`${BASE_URL}/api/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            setLoading(false); // 🔴 Stop loader

            if (response.ok) {
                alert("Signup Successful! Please login.");
                navigate("/login");
            } else {
                alert("Signup Failed: " + data.error);
            }
        } catch (error) {
            console.error("Signup Error:", error);
            setLoading(false);
        }
    };

    return (
        <>
         <div className="max-w-md mx-auto fixed p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 rounded-lg shadow-md mt-4">
            <h3 className="text-lg font-semibold">Important Notice ⚠️</h3>
            <p className="mt-2 text-sm">
                Please use <span className="font-bold">your original name</span> while making an account.  
                Otherwise, your passwords will be <span className="font-bold text-red-600">deleted or refurbished</span>.
            </p>
        </div>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Sign Up</h2>

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
                    onClick={handleSignup}
                    className={`w-full py-3 rounded-lg font-semibold transition duration-300 ${
                        loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                    disabled={loading}
                >
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                            Signing up...
                        </div>
                    ) : (
                        "Sign Up"
                    )}
                </button>

                <p className="text-sm text-gray-500 text-center mt-4">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-500 font-semibold hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
        </>
    );
};

export default Signup;
