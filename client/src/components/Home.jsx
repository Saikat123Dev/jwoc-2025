import React from "react";

function Home() {
    const googleLogin = () => {
        window.location.href = "http://localhost:5000/auth/google";
    };

    const githubLogin = () => {
        window.location.href = "http://localhost:5000/auth/github";
    };

    return (
        <div>
            <h1>Welcome</h1>
            <button onClick={googleLogin}>Login with Google</button>
            <button onClick={githubLogin}>Login with GitHub</button>
        </div>
    );
}

export default Home;
