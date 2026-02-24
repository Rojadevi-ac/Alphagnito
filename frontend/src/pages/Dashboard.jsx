import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div style={{ padding: "40px" }}>
            <h1>Welcome to Dashboard </h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Dashboard;