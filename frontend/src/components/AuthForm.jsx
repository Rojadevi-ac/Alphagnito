import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function AuthForm({ mode, setMode }) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (mode === "register") {

                if (formData.password !== formData.confirmPassword) {
                    alert("Passwords do not match");
                    return;
                }

                await API.post("/auth/register", {
                    username: formData.username,
                    password: formData.password
                });

                alert("Registered Successfully 🎉");
                setMode("login");

            } else {

                const res = await API.post("/auth/login", {
                    username: formData.username,
                    password: formData.password
                });

                localStorage.setItem("token", res.data.token);
                navigate("/dashboard");
            }

        } catch (err) {
            alert(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <>
            <h2>
                {mode === "login" ? "Welcome to Solace" : "Create Account"}
            </h2>

            <p>
                {mode === "login"
                    ? "Sign in to your account"
                    : "Register to continue"}
            </p>

            <form onSubmit={handleSubmit}>

                {/* Username (for both login & register) */}
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />

                {/* Email only for register (optional UI) */}
                {mode === "register" && (
                    <input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={handleChange}
                    />
                )}

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                {mode === "register" && (
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                )}

                {mode === "login" && (
                    <div className="auth-options">
                        <label>
                            <input type="checkbox" />
                            Remember me
                        </label>
                        <span className="forgot">Forgot password?</span>
                    </div>
                )}

                <button type="submit">
                    {mode === "login" ? "Login" : "Register"}
                </button>
            </form>

            <p className="bottom-text">
                {mode === "login"
                    ? "Don't have an account?"
                    : "Already have an account?"}

                <span
                    className="toggle-link"
                    onClick={() => {
                        setMode(mode === "login" ? "register" : "login");
                        setFormData({
                            username: "",
                            email: "",
                            password: "",
                            confirmPassword: ""
                        });
                    }}
                >
                    {mode === "login" ? " Register" : " Login"}
                </span>
            </p>
        </>
    );
}

export default AuthForm;