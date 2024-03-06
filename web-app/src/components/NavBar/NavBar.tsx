import React, { FC, useState } from "react";

import style from './NavBar.module.css';
import AuthForm from "../AuthForm/AuthForm.tsx";

const NavBar: FC = () => {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(false);

    const signUp = () => {
      setOpen(true);
    };

    const signIn = () => {
        setUser(true);
    };
    const signOut = () => {
        setUser(false);
    };

    return (
      <React.Fragment>
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


        <AuthForm isOpen={open} setOpen={setOpen}/>
      </React.Fragment>
    );
};

export {NavBar};
