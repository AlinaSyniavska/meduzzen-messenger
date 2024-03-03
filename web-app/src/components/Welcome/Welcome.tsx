import { FC } from 'react';
// import { auth } from "../../firebase";
// import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

const Welcome: FC = () => {
    const signIn = () => {

    };

    return (
        <main className="welcome">
            <h2>Welcome to Meduzzen Chat</h2>
            <p>Sign in to chat with your friends</p>
            <button className="sign-in" onClick={signIn}>
                Sign In
            </button>
        </main>
    );
};

export { Welcome };
