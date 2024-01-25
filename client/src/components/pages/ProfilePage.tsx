import { Container } from '@mui/material';
import React from 'react';
import UserOrders from '../ui/UserOrders';

export default function ProfilePage(): JSX.Element {
  return (
    <Container sx={{padding: '20px'}}>
      <UserOrders />
    </Container>
  );
}
