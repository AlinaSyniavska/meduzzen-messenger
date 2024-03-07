import React, {Dispatch, FC, SetStateAction, useState} from "react";

import style from './NavBar.module.css';
import AuthForm from "../AuthForm/AuthForm.tsx";
import {actions} from "../../constants";
import {authService} from "../../services";
import {IUser} from "../../interfaces";
import useModal from "../../hooks/useModal.tsx";
import Error from "../Error/Error.tsx";

interface IProps {
    user: IUser | null;
    setUser: Dispatch<SetStateAction<IUser | null>>;
}

const NavBar: FC<IProps> = ({user, setUser}) => {
    const [open, setOpen] = useState(false);
    const [action, setAction] = useState(actions.login);
    const { isModalOpen, toggle } = useModal();
    const [error, setError] = useState<string>('');

    const signUp = () => {
        setAction(actions.register);
        setOpen(true);
    };

    const signIn = () => {
        setAction(actions.login);
        setOpen(true);
    };

    const signOut = async () => {
        const accessToken = localStorage.getItem('access') as string;

        try {
            await authService.logout(accessToken);
            localStorage.removeItem('userId');
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            setUser(null);
        } catch (e) {
            setError(`Sign Out failed.`);
            toggle();
        }
    };

    return (
        <React.Fragment>
            <nav className="nav-bar">
                <h1>Meduzzen Chat</h1>
                <div>
                    {user ? (
                        <button
                            onClick={signOut}
                            className="sign-out"
                            type="button"
                        >
                            Sign Out
                        </button>
                    ) : (
                        <div className={style.btnContainer}>
                            <button className="sign-in" onClick={signUp}>
                                Sign Up
                            </button>
                            <button className="sign-in" onClick={signIn}>
                                Sign In
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            <AuthForm
                isOpen={open}
                setOpen={setOpen}
                action={action}
                setUser={setUser}
            />

            <Error isOpen={isModalOpen} toggle={toggle}>{error}</Error>
        </React.Fragment>
    );
};

export {NavBar};
