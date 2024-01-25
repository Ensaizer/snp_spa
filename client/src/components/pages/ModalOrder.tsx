import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import type { TransitionProps } from '@mui/material/transitions';
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(
    (
        props: TransitionProps & {
            children: React.ReactElement<any, any>;
        },
        ref: React.Ref<unknown>,
    ) => <Slide direction="up" ref={ref} {...props} />,
);
type ModalOrderProps ={
    modalOpen: boolean;
    setModalOpen: () => void
}
export default function ModalOrder({ modalOpen, setModalOpen }:ModalOrderProps ): JSX.Element {
    const navigate = useNavigate();
    const handleClose = () => {
        setModalOpen(false);
        navigate('/');
    };
    return (
        <Dialog
            open={modalOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>Благодарим за покупку</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    В ближайшее время наши менеджеры с вами свяжутся!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Понятно</Button>
            </DialogActions>
        </Dialog>
    );
}

