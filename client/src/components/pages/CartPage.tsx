import { DeleteForeverOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  Container,
  List,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { useDeleteAllCartsMutation, useGetOneCartByIdQuery } from '../../store/cartSlice/cartSlice';
import CartItem from '../ui/CartItem.tsx';

export default function CartPage(): JSX.Element {
  const { user } = useAppSelector((state) => state.auth);
  const { data, isLoading } = useGetOneCartByIdQuery(user.id);
  const [deleteAll] = useDeleteAllCartsMutation();
  const [checked, setChecked] = useState<number[]>([]);
  const [sum, setSum] = useState(0);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (data) {
      const amount = data.reduce((acc, item) => (acc += item.Product.price * item.quantity), 0);
      setSum(amount);
    }
  }, [data]);

  return (
    <>
      {isLoading && <h1>Идет загрузка...</h1>}
      <Container>
      <Typography
        sx={{ fontSize: '24px', paddingTop: '30px', paddingLeft: '90px', paddingBottom: '20px' }}
      >
        Корзина
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '25px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            // width: '300px',
            alignItems: 'center',

            justifyContent: 'space-between',
            // padding: '20px',
          }}
        >
          <Checkbox sx={{marginRight: '10px'}}
            onChange={() =>
              setChecked((prev) => {
                setFlag(!flag);
                if (flag) {
                  return [];
                }
                if (data) {
                  return data.map((item) => item.id);
                }
              })
            }
          />
          <Typography variant='body1'>Отметить/снять все товары</Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            width: '300px',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              void deleteAll(checked);
            }}
          >
            Удалить отмеченные
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Наименование</TableCell>
              <TableCell align="center">Срок доставки, дней</TableCell>
              <TableCell align="center">Остаток</TableCell>
              <TableCell align="center">Мин.заказ</TableCell>
              <TableCell align="center">Кратность</TableCell>
              <TableCell align="center">Цена за 1шт</TableCell>
              <TableCell align="center">В корзине</TableCell>
              <TableCell align="center">Стоимость</TableCell>
              <TableCell align="center">Удалить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
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
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          fontSize: '20px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

          marginTop: '30px',
        }}
      >
        {data && data.length !== 0 ? `Общая сумма заказа: ${sum} руб` : 'Ваша корзина пуста'}{' '}
      </Box>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '30px',
        }}
      >
        {data && data.length !== 0 && (
          <Button
            component={Link}
            to="/order"
            variant="contained"
            color="secondary"
            sx={{ minWidth: '300px' }}
          >
            ЗАКАЗАТЬ
          </Button>
        )}
      </div>
      </Container>
    </>
  );
}
