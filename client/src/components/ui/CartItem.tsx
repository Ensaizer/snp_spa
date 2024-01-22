import { Button, Checkbox, Container, InputBase, Typography } from '@mui/material';
import React from 'react';

export default function CartItem(): JSX.Element {
  return (
    <Container sx={{ display: 'flex' }}>
      <Container sx={{ display: 'flex' }}>
        <Checkbox />
        <Container>
          <Typography sx={{ fontSize: '16px', color: '#1B1D1F' }}>Bosch</Typography>
          <Typography sx={{ fontSize: '16px', color: '#1B1D1F' }}>
            Батарея аккумуляторная
          </Typography>
          <Typography sx={{ fontSize: '16px', color: '#505255' }}>Артикул: 0092S40890</Typography>
        </Container>
        <Container
          sx={{
            color: '#1B1D1F',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          0 дней
        </Container>
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div
            style={{
              borderRadius: '58px',
              width: 'auto',
              height: '40px',
              backgroundColor: '#F1F2F4',
              margin: 'auto',
              justifyContent: 'space-between',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <Button sx={{ margin: '0', padding: '0' }}>-</Button>
            <InputBase
              sx={{ width: '40px', margin: '0', padding: '0', textAlign: 'center' }}
              placeholder="100"
            />
            <Button sx={{ margin: '0', padding: '0' }}>+</Button>
          </div>
        </Container>
      </Container>
    </Container>
  );
}
