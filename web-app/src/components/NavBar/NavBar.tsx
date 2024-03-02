import React, { FC } from "react";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

const NavBar: FC = () => {
    const [user] = useAuthState(auth);

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    };
    const signOut = () => {
        auth.signOut();
    };

    return (
        <nav className="nav-bar">
            <h1>React Chat</h1>
            {user
                ? (<button onClick={signOut} className="sign-out" type="button">
                    Sign Out
                </button>)
                : (<button className="sign-in">
                    <img
                        onClick={googleSignIn}
                        src={require("../../img/btn_google_signin_dark_pressed_web.png")}
                        alt="sign in with google"
                    />
                </button>)
            }
        </nav>
    );
};

export { NavBar };
