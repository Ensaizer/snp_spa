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
import { Button } from '@mui/material';
import type { UserType } from '../../types/auth';
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from '../../store/userSlice/userSlice';

type ApprovedHandleType = {
  id: number;
  isApproved: boolean;
};
function Row(props: {
  user: UserType;
  deleteUserHandler: (id: number) => void;
  approvedUserHandler: ({ isApproved }: ApprovedHandleType) => void;
}): JSX.Element {
  const { user, deleteUserHandler, approvedUserHandler } = props;
  const [open, setOpen] = React.useState(false);

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
        <TableCell component="th" scope="row">
          {user.name}
        </TableCell>
        <TableCell align="center">{user.email}</TableCell>
        <TableCell align="center">{user.phone}</TableCell>
        <TableCell align="center">{user.userType}</TableCell>
        <TableCell align="center">
          <Button
            type="button"
            onClick={() => void approvedUserHandler({ id: user.id, isApproved: !user.isApproved })}
          >
            Подтвердить
          </Button>
          <Button type="button" onClick={() => void deleteUserHandler(user.id)}>
            Отказать
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
  const { data, isLoading } = useGetAllUsersQuery('');
  const [deleteUserMutation] = useDeleteUserMutation();
  const [updateUserMutation] = useUpdateUserMutation();
  const unApprovedUsers = data ? data.filter((user) => !user.isApproved) : [];
  const deleteUserHandler = async (id: UserType['id']): Promise<void> => {
    await deleteUserMutation({ id });
  };
  const approvedUserHandler = async (isApproved: boolean): Promise<void> => {
    await updateUserMutation({ isApproved });
  };
  return unApprovedUsers.length !== 0 ? (
    <TableContainer component={Paper} sx={{ marginTop: '40px' }}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Имя</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Телефон</TableCell>
            <TableCell align="center">Тип</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {unApprovedUsers.map((user) => (
            <Row
              key={user.id}
              user={user}
              deleteUserHandler={deleteUserHandler}
              approvedUserHandler={approvedUserHandler}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Typography>Нет новых пользователей</Typography>
  );
}
