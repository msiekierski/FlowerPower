import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import React from 'react';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

const ResetPasswordDialog: React.FC<Props> = ({ isOpen, handleClose }) => {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Reset your password</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Write below your email address. If you're in your system, we'll send
          you a reset link.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Send link</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResetPasswordDialog;
