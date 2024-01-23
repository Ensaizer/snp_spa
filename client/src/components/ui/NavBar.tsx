import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import Modal from '../Modal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logoutHandlerThunk } from '../../store/slices/auth/authThunks';

function NavBar(): JSX.Element {
  const [open, setOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
      {/* <AppBar position="static" sx={{backgroundColor: '#F0EFFA', color: '#2F2B4A'}}> */}
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SNP
            <LocalShippingIcon sx={{verticalAlign: 'middle', width: '60px', height: '30px'}}/>
          </Typography>
          <Button color="inherit" component={NavLink} to="/">
            Главная
          </Button>
          {user.status !== 'authenticated' && (
            <>
              <Button color="inherit" onClick={() => setOpen(true)}>
                Войти
              </Button>
              <Button color="inherit" component={NavLink} to="/registration">
                Регистрация
              </Button>
            </>
          )}
          {user.status === 'authenticated' && (
            <>
              <Button color="inherit" component={NavLink} to="/profile">
                Профиль
              </Button>
              <Button color="inherit" component={NavLink} to="/cart">
                Корзина
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  void dispatch(logoutHandlerThunk());
                }}
              >
                Выйти
              </Button>
            </>
          )}
          <Modal open={open} handleClose={() => setOpen(false)} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
