import {Button, Checkbox, Container, Divider, InputBase, Typography} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React, {useState} from 'react';
import type {IProduct} from "../../types/ProductType.ts";
import {useDeleteCartByIdMutation, useUpdateCartMutation} from "../../store/cartSlice/cartSlice.ts";


type CardProps = {
    id: number;
    Product: IProduct;
    quantity: number;
    userId: number;
    productId: number;
}

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
    const [ state, setState ] = useState({
        quantity,
        sum: price * quantity
    })

    const decrementClickHandle = () => {
        if (state.quantity > minOrder){
            setState((prev)=> ({
                ...prev,
                quantity: prev.quantity -= multiplicity,
                sum: prev.sum -= price * multiplicity
            }))
            void updateCartMutation({id: userId, quantity: state.quantity, productId})
            setSum((prev) => prev - state.sum)
        }
    };

    const incrementClickHandle = () => {
        if (stock > state.quantity){
            setState((prev) => ({
                ...prev,
                quantity: prev.quantity += multiplicity,
                sum: prev.sum += price * multiplicity
            }));
            void updateCartMutation({id: userId, quantity: state.quantity, productId});
            setSum((prev) => prev + state.sum)
        }
    }

    const deleteHandler = (id): void => {
        void deleteCart(id)
        setChecked((prev) => prev.filter(el=> el !== id))

    }
  return (
      <>
          <Container sx={{
              display: 'flex',
          }}>
              <Container sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '5px'
              }}>
                  <Checkbox
                      checked={checked}
                      onChange={() => setChecked((prev) => {
                          if(prev.some(el => el === id)){
                              return prev.filter(el => el !== id)
                          }
                          return [...prev, id]
                          }
                      )}
                  />
                  <Container>
                      <Typography sx={{ fontSize: '16px', color: '#1B1D1F' }}>{name}</Typography>
                      <Typography sx={{ fontSize: '16px', color: '#505255' }}>
                           {article}
                      </Typography>
                  </Container>
                  <Container>
                  <Typography sx={{ fontSize: '16px', color: '#505255', minWidth: '30px' }}>
                      Остаток: {stock}
                  </Typography>
                  </Container>
                  <Container
                      sx={{
                          color: '#1B1D1F',
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex',
                      }}
                  >
                      {deliveryTime} дней
                  </Container>
                  <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                          <button style={{
                              border: 'none',
                              width: '30px',
                              height: '30px',
                              cursor: 'pointer',
                              borderRadius: '58px'
                          }} onClick={decrementClickHandle}>-</button>
                          <Button sx={{ margin: '0', padding: '0', minWidth: '30px'}}>{state.quantity}</Button>
                          <button style={{
                              border: 'none',
                              width: '30px',
                              height: '30px',
                              cursor: 'pointer',
                              borderRadius: '58px'
                          }} onClick={incrementClickHandle}>+</button>
                      </div>
                  </Container>
                  <Container sx={{fontSize: '12px' }}>
                      Стоимость: <br/>{state.sum} рублей
                  </Container>
                  <Container sx={{fontSize: '12px' }}>
                      Цена за {minOrder} шт: <br/>{price} рублей
                  </Container>
                  <Container>
                      <DeleteForeverIcon sx={{color: '#6B59CC', width: '30px', height: '30px', cursor:'pointer'}} onClick={() => deleteHandler(id, checked)}/>
                  </Container>
              </Container>
          </Container>
          <Divider />
      </>

  );
}
