import React, { FC } from "react";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

const Welcome: FC = () => {
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    };

    return (
        <main className="welcome">
            <h2>Welcome to React Chat.</h2>
            <p>Sign in with Google to chat with your fellow React Developers.</p>
            <button className="sign-in">
                <img
                    onClick={googleSignIn}
                    src={require('../../img/btn_google_signin_dark_pressed_web.png')}
                    alt="sign in with google"
                />
            </button>
        </main>
    );
};

export { Welcome };
