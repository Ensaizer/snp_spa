import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import {useState} from "react";
import Modal from "../Modal.tsx";

const NavBar = () => {
    const[open, setOpen] = useState(false)
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        SNP
                    </Typography>
                    <Button color="inherit" component={ NavLink } to={'/'}>Главная</Button>
                    <Button color="inherit" onClick={() => setOpen(true)}>Войти</Button>
                    <Button color="inherit" component={ NavLink } to={'/registration'}>Регистрация</Button>
                    <Button color="inherit" component={ NavLink } to={'/basket'}>Корзина</Button>
                    <Button color="inherit" component={ NavLink } to={'/profile'}>Профиль</Button>
                    <Modal open={open} handleClose={() => setOpen(false)}/>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavBar;
