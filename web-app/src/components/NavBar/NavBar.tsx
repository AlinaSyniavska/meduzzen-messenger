import React, { FC, useState } from "react";

import style from './NavBar.module.css';
import AuthForm from "../AuthForm/AuthForm.tsx";
import {actions} from "../../constants";

const NavBar: FC = () => {
    const [open, setOpen] = useState(false);
    const [action, setAction] = useState(actions.login);
    const [user, setUser] = useState(false);

    const signUp = () => {
        setAction(actions.register);
        setOpen(true);
    };

    const signIn = () => {
        setAction(actions.login);
        setOpen(true);
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


        <AuthForm isOpen={open} setOpen={setOpen} action={action}/>
      </React.Fragment>
    );
};

export {NavBar};
