import { DeleteForeverOutlined } from '@mui/icons-material';
import { Box, Checkbox, List } from '@mui/material';
import React from 'react';
import CartItem from '../ui/CartItem';

export default function CartPage(): JSX.Element {
    
  return (
    <>
      <Box
        sx={{ fontSize: '24px', paddingTop: '30px', paddingLeft: '90px', paddingBottom: '20px' }}
      >
        Корзина
      </Box>
      <List sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Checkbox />
          Отметить/снять все товары
        </Box>
        <Box>
          Удалить все товары
          <DeleteForeverOutlined />
        </Box>
      </List>
    </>
  );
}
