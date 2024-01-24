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
import { Button, Input, TextField } from '@mui/material';
import type { UserType } from '../../types/auth';
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from '../../store/userSlice/userSlice';

function Row(props: {
  user: UserType;
  deleteUserHandler: (id: number) => void;
  updateDiscountHandler;
}): JSX.Element {
  const { user, deleteUserHandler, updateDiscountHandler } = props;
  const [open, setOpen] = React.useState(false);
  const [discount, setDiscount] = React.useState(user.discount);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          {user.Organization ? (
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          ) : null}
        </TableCell>
        <TableCell>{user.name}</TableCell>
        <TableCell align="center">{user.email}</TableCell>
        <TableCell align="center">{user.phone}</TableCell>
        <TableCell align="center">{user.userType}</TableCell>
        <TableCell align="center">
          <TextField
            name="discount"
            type="number"
            InputProps={{
              inputProps: {
                max: 100,
                min: 0,
                defaultValue: discount,
              },
            }}
            label="от 0 до 100"
            onChange={(e) => setDiscount(Number(e.target.value))}
          />
        </TableCell>
        <TableCell align="center" sx={{ display: 'flex', flexDirection: 'column' }}>
          <Button
            type="button"
            onClick={() => void deleteUserHandler(user.id)}
            sx={{ fontSize: '10px' }}
          >
            Удалить пользователя
          </Button>
          <Button
            type="button"
            onClick={() =>
              void updateDiscountHandler({ id: user.id, discount, isApproved: user.isApproved })
            }
            sx={{ fontSize: '10px' }}
          >
            Назначить скидку
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        {user.Organization ? (
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Данные об организации
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Наименование</TableCell>
                      <TableCell>ИНН</TableCell>
                      <TableCell align="right">КПП</TableCell>
                      <TableCell align="right">ОГРН</TableCell>
                      <TableCell align="right">Юр.адрес</TableCell>
                      <TableCell align="right">Кор.счет</TableCell>
                      <TableCell align="right">Расч.счет</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key={user.Organization.orgName}>
                      <TableCell component="th" scope="row">
                        {user.Organization.orgName}
                      </TableCell>
                      <TableCell>{user.Organization.INN}</TableCell>
                      <TableCell align="right">{user.Organization.KPP}</TableCell>
                      <TableCell align="right">{user.Organization.OGRN}</TableCell>
                      <TableCell align="right">{user.Organization.legalAddress}</TableCell>
                      <TableCell align="right">{user.Organization.corrAccount}</TableCell>
                      <TableCell align="right">{user.Organization.currAccount}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        ) : null}
      </TableRow>
    </>
  );
}

export default function CollapsibleTableForUsers(): JSX.Element {
  const { data } = useGetAllUsersQuery('');
  const [deleteUserMutation] = useDeleteUserMutation();
  const [updateUserMutation] = useUpdateUserMutation();
  const approvedUsers = data ? data.filter((user) => user.isApproved) : [];
  const deleteUserHandler = async (id: UserType['id']): Promise<void> => {
    await deleteUserMutation({ id });
  };
  const updateDiscountHandler = async (isApproved): Promise<void> => {
    console.log(isApproved.id, isApproved.discount, isApproved.isApproved);
    await updateUserMutation({ isApproved });
  };
  return approvedUsers.length !== 0 ? (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Имя</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Телефон</TableCell>
            <TableCell align="center">Тип</TableCell>
            <TableCell align="center">Скидка</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {approvedUsers.map((user) => (
            <Row
              key={user.id}
              user={user}
              deleteUserHandler={deleteUserHandler}
              updateDiscountHandler={updateDiscountHandler}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Typography>Нет пользователей</Typography>
  );
}
