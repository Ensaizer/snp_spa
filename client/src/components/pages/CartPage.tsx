import { DeleteForeverOutlined } from '@mui/icons-material';
import { Box, Checkbox, List } from '@mui/material';
import React, { useState } from 'react';
import CartItem from '../ui/CartItem';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export default function CartPage(): JSX.Element {
const [deleteItems, setDeleteItems] = useState([]);
  const { cartItems, deleteProducts } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
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
        {cartItems.map((item) => (
          <CartItem item={item} inCheck={deleteProducts.id} />
        ))}
      </List>
    </>
  );
}
