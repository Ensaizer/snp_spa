import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Badge } from '@mui/material';
import Modal from '../Modal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logoutHandlerThunk } from '../../store/slices/auth/authThunks';
import { clearError, setModal } from '../../store/slices/auth/authSlice';
import { useGetOneCartByIdQuery } from '../../store/cartSlice/cartSlice';

function NavBar(): JSX.Element {
  const [open, setOpen] = useState(false);
  const { user, modal } = useAppSelector((state) => state.auth);
  const { data } = useGetOneCartByIdQuery(user.id);

  const dispatch = useAppDispatch();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        {/* <AppBar position="static" sx={{backgroundColor: '#F0EFFA', color: '#2F2B4A'}}> */}
        <Toolbar>
          <Box
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}
          >
            <Button color="inherit" component={NavLink} to="/">
              <Typography variant="h5">SNP</Typography>
              <img
                alt="logo"
                width="50"
                height="50"
                src="/icon.png"
                style={{ marginLeft: '10px' }}
              />
            </Button>
          </Box>
          <Button color="inherit" component={NavLink} to="/">
            Главная
          </Button>
          {user.status !== 'authenticated' && (
            <>
              <Button color="inherit" onClick={() => dispatch(setModal())}>
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
                <Badge badgeContent={data?.length} color="secondary">
                  <ShoppingCartIcon sx={{ color: 'white' }} />
                </Badge>
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
          {user.roleId === 3 && (
            <Button color="inherit" component={NavLink} to="/admin">
              Админ панель
            </Button>
          )}
          <Modal
            open={modal}
            handleClose={() => {
              dispatch(setModal());
              dispatch(clearError());
            }}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
