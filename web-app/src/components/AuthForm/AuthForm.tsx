import React, {FC} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";

interface IProps {
  isOpen: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const AuthForm: FC<IProps> = ({isOpen, setOpen}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setOpen(false)}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          const email = formJson.email;
          const password = formJson.password;
          console.log(email, password);
          setOpen(false);
        },
      }}
    >
      <DialogTitle>Sign Up</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To sign up to this messenger, please enter your email address and password here.
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
        <Button type="submit">Sign Up</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AuthForm;