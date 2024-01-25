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
import { Button, TextField } from '@mui/material';
import type { UserType } from '../../types/auth';
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from '../../store/userSlice/userSlice';

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
        <TableCell>{order.id}</TableCell>
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
                    <TableCell>Продукт</TableCell>
                    <TableCell>Количество</TableCell>
                    <TableCell align="right">Цена</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={order.Entry.Product.id}>
                    <TableCell component="th" scope="row">
                      {order.Entry.Product.name}
                    </TableCell>
                    <TableCell>{order.Entry.Product.quantity}</TableCell>
                    <TableCell align="right">{order.Entry.Product.price}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function CollapsibleTableForUsers(): JSX.Element {
  const { data } = useGetAllUsersQuery('');
  return data.length !== 0 ? (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Имя</TableCell>
            <TableCell align="center">Номер заказа</TableCell>
            <TableCell align="center">Статус заказа</TableCell>
            <TableCell align="center">Адрес доставки</TableCell>
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
    <Typography>Нет пользователей</Typography>
  );
}
