import React, {FC, useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from '@mui/material';

import {authService, userService} from '../../services';
import { IUser } from '../../interfaces';
import {authActions} from "../../constants";
import Error from "../Error/Error.tsx";
import useModal from "../../hooks/useModal.tsx";

interface IProps {
    isOpen: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    action: string,
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>,
}

const AuthForm: FC<IProps> = ({ isOpen, setOpen, action, setUser }) => {
    const { isModalOpen, toggle } = useModal();
    const [error, setError] = useState<string>('');

    const signUp = async (user: IUser) => {
        try {
            const id = (await userService.create(user)).data;
            console.log(id);

            await signIn({email: user.email, password: user.password});
        } catch (e: any) {
            setError(`Registration failed. ${e.response.data.error}`);
            toggle();
        }
    };

    const signIn = async (user: IUser) => {
        try {
            const res = (await authService.login(user)).data;
            setUser(res.user as IUser);

            localStorage.setItem("userId", res.user?.id as string);
            localStorage.setItem("userName", res.user?.name as string);
            localStorage.setItem("access", res.access_token);
            localStorage.setItem("refresh", res.refresh_token);
        } catch (e: any) {
            setError(`Sign In failed. ${e.response.data.error}`);
            toggle();
        }
    };

    return (
      <React.Fragment>
        <Dialog
            open={isOpen}
            onClose={() => setOpen(false)}
            PaperProps={{
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(
                        (formData as any).entries(),
                    );
                    const name = formJson.name;
                    const email = formJson.email;
                    const password = formJson.password;
                    setOpen(false);

                    action === authActions.register ? signUp({name, email, password }) : signIn({ email, password });
                },
            }}
        >
            <DialogTitle>{action === authActions.register ? 'Sign Up' : 'Sign In'}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To {action === authActions.register ? 'sign up' : 'sign in'} to this messenger, please enter your email
                    address and password here.
                </DialogContentText>

                {
                  action === authActions.register && <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                }

                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="email"
                    name="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit">{action === authActions.register ? 'Sign Up' : 'Sign In'}</Button>
            </DialogActions>
        </Dialog>

        <Error isOpen={isModalOpen} toggle={toggle}>{error}</Error>
      </React.Fragment>
    );
};

export default AuthForm;
