import React from "react";
import { Button } from "../components/ui/button";

function Home() {
    const googleLogin = () => {
        window.location.href = "http://localhost:5000/auth/google";
    };

    const githubLogin = () => {
        window.location.href = "http://localhost:5000/auth/github";
    };

    return (
        <div className="flex flex-col min-h-screen min-w-full bg-slate-800">

        <main className="flex-grow">
          <h1>Welcome</h1>
          <Button>Click me</Button>
          <button onClick={googleLogin}>Login with Google</button>
          <button onClick={githubLogin}>Login with GitHub</button>
        </main>

      </div>
    );
}

export default Home;
