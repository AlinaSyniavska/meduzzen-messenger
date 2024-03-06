import React, { FC } from 'react';
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
import {actions} from "../../constants";

interface IProps {
    isOpen: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    action: string,
}

const AuthForm: FC<IProps> = ({ isOpen, setOpen, action }) => {
    const signUp = async (user: IUser) => {
        try {
            const id = (await userService.create(user)).data;
            console.log(id);
        } catch (e) {
            console.error('Registration failed', e);
        }
    };

    const signIn = async (user: IUser) => {
        try {
            const id = (await authService.login(user)).data;

            console.log(id);

            localStorage.setItem("userId", id.user?.id as string);
        } catch (e) {
            console.error('Sign In failed', e);
        }
    };

    return (
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
                    const email = formJson.email;
                    const password = formJson.password;
                    setOpen(false);

                    action === actions.register ? signUp({ email, password }) : signIn({ email, password });
                },
            }}
        >
            <DialogTitle>{action === actions.register ? 'Sign Up' : 'Sign In'}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To {action === actions.register ? 'sign up' : 'sign in'} to this messenger, please enter your email
                    address and password here.
                </DialogContentText>
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
                <Button type="submit">{action === actions.register ? 'Sign Up' : 'Sign In'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AuthForm;
