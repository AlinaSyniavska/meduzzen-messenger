import {FC, useState} from "react";
// import { auth } from "../../firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

import style from './NavBar.module.css';

const NavBar: FC = () => {
    const [user, setUser] = useState(false);

    const signUp = () => {
        // setUser(true);
    };
    const signIn = () => {
        setUser(true);
    };
    const signOut = () => {
        setUser(false);
    };

    return (
        <nav className="nav-bar">
            <h1>Meduzzen Chat</h1>
            <div>
                {user
              ? (<button onClick={signOut} className="sign-out" type="button">
                  Sign Out
              </button>)
              : (<div className={style.btnContainer}>
                    <button className="sign-in" onClick={signUp}>
                        Sign Up
                    </button>
                    <button className="sign-in" onClick={signIn}>
                        Sign In
                    </button>
                </div>
              )
            }
            </div>
        </nav>
    );
};

export {NavBar};
