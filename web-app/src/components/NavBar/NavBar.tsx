import {FC, useState} from "react";
// import { auth } from "../../firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

const NavBar: FC = () => {
    const [user, setUser] = useState(false);

    const signIn = () => {
        setUser(true);
    };
    const signOut = () => {
        setUser(false);
    };

    return (
        <nav className="nav-bar">
            <h1>Meduzzen Chat</h1>
            {user
                ? (<button onClick={signOut} className="sign-out" type="button">
                    Sign Out
                </button>)
                : (<button className="sign-in" onClick={signIn}>
                    Sign In
                </button>)
            }
        </nav>
    );
};

export { NavBar };
