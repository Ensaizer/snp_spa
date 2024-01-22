import { Box, Typography, Modal as ModalMUI, Button, TextField } from '@mui/material';
import React from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    // border: '2px solid #fff',
    boxShadow: 24,
    textAlign: 'center',
    p: 4,
};

type ModalProps = {
    open: boolean;
    handleClose: () => void;
};

export default function Modal({ open, handleClose }: ModalProps): JSX.Element {
    return (
        <ModalMUI
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
                   Войти
                </Typography>
                    <Box component="form">
                        <Box mb={2}>
                            <TextField name="email" label="Почта" type="email" required />
                        </Box>
                        <Box mb={2}>
                            <TextField name="password" label="Пароль" type="password" required />
                        </Box>
                        <Button type="submit" variant ='contained'>Войти</Button>
                    </Box>
            </Box>
        </ModalMUI>
    );
}
