import { useState } from "react";
import AuthForm from "../components/AuthForm";
import logo from "../assets/solace.png";
import "../styles/Auth.css";

function AuthPage() {
    const [mode, setMode] = useState("login");

    return (
        <div className="auth-container">
            <div className="auth-card">

                <div className="auth-left">
                    <AuthForm mode={mode} setMode={setMode} />
                </div>

                <div className="auth-right">
                    <img src={logo} alt="Solace Logo" />
                </div>

            </div>
        </div>
    );
}

export default AuthPage;