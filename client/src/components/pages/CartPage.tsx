import { DeleteForeverOutlined } from '@mui/icons-material';
import { Box, Checkbox, List } from '@mui/material';
import React, { useState } from 'react';
import {useAppSelector} from "../../store/hooks.ts";
import {useGetOneCartByIdQuery} from "../../store/cartSlice/cartSlice.ts";
import CartItem from "../ui/CartItem.tsx";


export default function CartPage(): JSX.Element {
    const {user} = useAppSelector(state => state.auth)
    const { data: carts } = useGetOneCartByIdQuery(user.id);

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
        {carts.map((item) => (
          <CartItem item={item}  />
        ))}
      </List>
    </>
  );
}
