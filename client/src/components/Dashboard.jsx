import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:5000/auth/user", { withCredentials: true })
            .then((response) => setUser(response.data))
            .catch(() => (window.location.href = "/"));
    }, []);

    const logout = () => {
        axios.get("http://localhost:5000/auth/logout", { withCredentials: true }).then(() => {
            window.location.href = "/";
        });
    };

    return (
        <div>
            {user ? (
                <>
                    <h1>Welcome, {user.name}</h1>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Dashboard;
