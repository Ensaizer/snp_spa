import { Box, Typography, Modal as ModalMUI, Button, TextField, Paper } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginHandlerThunk } from '../store/slices/auth/authThunks';
import { clearError } from '../store/slices/auth/authSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  minWidth: '300px',
  textAlign: 'center',
  p: 4,
};

type ModalProps = {
  open: boolean;
  handleClose: () => void;
};

export default function Modal({ open, handleClose }: ModalProps): JSX.Element {
  const { error } = useAppSelector((state) => state.auth);
  console.log(error);
  const dispatch = useAppDispatch();
  return (
    <ModalMUI
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
          Войти
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => {
            void dispatch(loginHandlerThunk(e));
          }}
        >
          <Box mb={2}>
            <TextField name="email" label="Электронная почта" type="email" required onChange={()=>dispatch(clearError())}/>
          </Box>
          <Box mb={2}>
            <TextField name="password" label="Пароль" type="password" required onChange={()=>dispatch(clearError())}/>
          </Box>
          {error && (
            <Typography
              variant="body1"
              sx={{ color: '#FB6019', marginBottom: '10px', marginTop: '5px' }}
            >
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained">
            Войти
          </Button>
        </Box>
      </Paper>
    </ModalMUI>
  );
}
