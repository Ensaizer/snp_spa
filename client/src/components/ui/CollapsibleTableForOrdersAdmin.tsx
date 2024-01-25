import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useGetAllOrdersQuery } from '../../store/orderSlice/orderSlice';
import type { OrderType } from '../../types';

function Row(props: { order: OrderType }): JSX.Element {
  const { order } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{order.id}</TableCell>
        <TableCell align="center">{order.status}</TableCell>
        <TableCell align="center">{order.deliveryAddress}</TableCell>
        <TableCell align="center">{order.deliveryDate}</TableCell>
        <TableCell align="center">{order.deliveryType}</TableCell>
        <TableCell align="center">{order.paymentType}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Данные о заказе
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Продукт</TableCell>
                    <TableCell align="center">Описание</TableCell>
                    <TableCell align="center">Количество</TableCell>
                    <TableCell align="center">Цена</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.Entries.map((entry) => (
                    <TableRow key={entry.Product.name}>
                      <TableCell align="center">{entry.Product.name}</TableCell>
                      <TableCell align="center">{entry.Product.description}</TableCell>
                      <TableCell align="center">{entry.quantity}</TableCell>
                      <TableCell align="center">{entry.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function CollapsibleTableForOrdersAdmin(): JSX.Element {
  const { data } = useGetAllOrdersQuery('');
  if (!data) return <>Загрузка...</>;
  return data.length !== 0 ? (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="center">Номер заказа</TableCell>
            <TableCell align="center">Статус заказа</TableCell>
            <TableCell align="center">Адрес доставки</TableCell>
            <TableCell align="center">Дата доставки</TableCell>
            <TableCell align="center">Тип доставки</TableCell>
            <TableCell align="center">Тип оплаты</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((order) => (
            <Row key={order.id} order={order} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Typography>Нет активных заказов</Typography>
  );
}
