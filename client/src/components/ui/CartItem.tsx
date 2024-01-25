import {
  Button,
  Checkbox,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React, { useState } from 'react';
import type { IProduct } from '../../types/ProductType.ts';
import {
  useDeleteCartByIdMutation,
  useUpdateCartMutation,
} from '../../store/cartSlice/cartSlice.ts';

type CardProps = {
  id: number;
  Product: IProduct;
  quantity: number;
  userId: number;
  productId: number;
};

type CartItemProps = {

    item: CardProps;
    setChecked: () => void;
    setSum: () => void;
}
export default function CartItem({ item, setChecked, setSum, checked}: CartItemProps): JSX.Element {
    const {article, deliveryTime, name, minOrder, multiplicity, price, stock} = item.Product;
    const [deleteCart] = useDeleteCartByIdMutation();
    const [updateCartMutation] = useUpdateCartMutation();
    const { quantity, userId, productId, id }  = item;


  const [state, setState] = useState({
    quantity,
    sum: price * quantity,
  });
  
  const decrementClickHandle = () => {
    if (state.quantity > minOrder) {
      setState((prev) => ({
        ...prev,
        quantity: (prev.quantity -= multiplicity),
        sum: (prev.sum -= price * multiplicity),
      }));
      setSum((prev) => prev - price * multiplicity);
      void updateCartMutation({ id: userId, quantity: state.quantity, productId });
    }
  };

  const incrementClickHandle = () => {
    if (stock > state.quantity) {
      setState((prev) => ({
        ...prev,
        quantity: (prev.quantity += multiplicity),
        sum: (prev.sum += price * multiplicity),
      }));
      setSum((prev) => prev + price * multiplicity);
      void updateCartMutation({ id: userId, quantity: state.quantity, productId });
    }
  };

  const deleteHandler = (id): void => {
    void deleteCart(id);
    setChecked((prev) => prev.filter((el) => el !== id));
  };
  return (
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell align="center"><Checkbox
            checked={checked}
            onChange={() =>
              setChecked((prev) => {
                if (prev.some((el) => el === id)) {
                  return prev.filter((el) => el !== id);
                }
                return [...prev, id];
              })
            }
          /></TableCell>
        <TableCell >
          <Typography sx={{ fontSize: '16px', color: '#1B1D1F' }}>{name}</Typography>
          <Typography sx={{ fontSize: '16px', color: '#505255' }}>{article}</Typography>
        </TableCell>
        <TableCell align="center">{deliveryTime}</TableCell>
        <TableCell align="center">{stock}</TableCell>
        <TableCell align="center">{minOrder}</TableCell>
        <TableCell align="center">{multiplicity}</TableCell>
          <TableCell align="center">{price}</TableCell>
        <TableCell align="center">
          {' '}
          <div
            style={{
              borderRadius: '58px',
              width: 'auto',
              height: '40px',
              backgroundColor: '#F1F2F4',
              margin: 'auto',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <button
              type="button"
              style={{
                border: 'none',
                width: '30px',
                height: '30px',
                cursor: 'pointer',
                borderRadius: '58px',
              }}
              onClick={decrementClickHandle}
            >
              -
            </button>
            <Button sx={{ margin: '0', padding: '0', minWidth: '30px' }}>{state.quantity}</Button>
            <button
              type="button"
              style={{
                border: 'none',
                width: '30px',
                height: '30px',
                cursor: 'pointer',
                borderRadius: '58px',
              }}
              onClick={incrementClickHandle}
            >
              +
            </button>
          </div>
        </TableCell>
        <TableCell align="center">{state.sum}</TableCell>
        <TableCell align="center">
          {' '}
          <DeleteForeverIcon
            sx={{ color: '#6B59CC', width: '30px', height: '30px', cursor: 'pointer' }}
            onClick={() => deleteHandler(id, checked)}
          />
        </TableCell>
      </TableRow>
  );
}
