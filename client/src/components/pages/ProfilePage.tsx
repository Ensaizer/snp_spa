import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import UserOrders from '../ui/UserOrders';
import { useAppSelector } from '../../store/hooks';

export default function ProfilePage(): JSX.Element {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <Container sx={{ padding: '20px' }}>
      <Grid container spacing={2} sx={{ alignContent: 'flex-start', marginBottom: '20px' }}>
        <Grid item xs={2}>
          <Typography variant="body1" color="primary">
            ФИО
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">{user.name}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body1" color="primary">
            Электронная почта
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">{user.email}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body1" color="primary">
            Телефон
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">{user.phone}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body1" color="primary">
            Адрес доставки
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">{user.deliveryAddress}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body1" color="primary">
            Скидка
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">{`${user.discount} %`}</Typography>
        </Grid>
      </Grid>
      <UserOrders />
    </Container>
  );
}
