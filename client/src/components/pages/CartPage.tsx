import { DeleteForeverOutlined } from '@mui/icons-material';
import {Box, Button, Checkbox, List} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useAppSelector} from "../../store/hooks";
import {useDeleteAllCartsMutation, useGetOneCartByIdQuery} from "../../store/cartSlice/cartSlice";
import CartItem from "../ui/CartItem.tsx";



export default function CartPage(): JSX.Element {
    const {user} = useAppSelector(state => state.auth)
    const { data, isLoading } = useGetOneCartByIdQuery(user.id);
    const [deleteAll] = useDeleteAllCartsMutation()
    const [checked, setChecked] = useState<number[]>([]);
    const [sum, setSum] = useState(0);
    const [flag, setFlag] = useState(false)


  useEffect(() => {
    if (data) {
      const amount = data.reduce((acc, item) => (acc += item.Product.price * item.quantity), 0);
      setSum(amount);
    }
  }, [data]);



  return (
    <>
      {isLoading && <h1>Идет загрузка...</h1>}
      <Box
        sx={{ fontSize: '24px', paddingTop: '30px', paddingLeft: '90px', paddingBottom: '20px' }}
      >
        Корзина
      </Box>
      <List
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px',
          }}
        >
            <Box
                sx={{
                    display: 'flex',
                    width: '300px',
                    alignItems: 'center',

                    justifyContent: 'space-between',
                    padding: '20px'
                }}>
              <Checkbox onChange={() => setChecked((prev) => {
                  setFlag(!flag)
                  if(flag){
                      return [];
                  }
                  if(data){
                      return data.map(item => item.id)
                  }
              })}/>
            Отметить/снять все товары
          </Box>

              <Box sx={{
                  display: 'flex',
                  width: '300px',
                  alignItems: 'center',
                  justifyContent: 'space-around',
              }}>
                  <Button variant="contained" onClick={() => {
                      void deleteAll(checked)
                  }}>Удалить отмеченные</Button>
                  <DeleteForeverOutlined />
              </Box>

          </Box>
        {data &&
          data.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              checked={checked.includes(item.id)}
              setChecked={setChecked}
              setSum={setSum}
            />
          ))}
        <Box
          sx={{
            fontSize: '20px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            marginTop: '30px'
        }}>{data && (data.length !== 0) ? `Общая сумма заказа: ${sum} рублей` :  'Ваша корзина пуста'} </Box>
           <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '30px'}}>
              { data && (data.length !== 0) &&<Button
                  component={Link}
                  to='/order'
                  variant="contained"
                  color="secondary"
                  sx={{minWidth: '300px'}}
              >ЗАКАЗАТЬ</Button>
              }
          </div>
      </List>
    </>
  );
}
