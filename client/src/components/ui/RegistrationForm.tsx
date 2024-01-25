import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { registrationHandlerThunk } from '../../store/slices/auth/authThunks';
import RegistraionModal from './RegistrationModal';

export default function RegistrationForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const [type, setType] = useState('физическое лицо');
  const [modalOpen, setModalOpen] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setType((event.target as HTMLInputElement).value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '20px' }}>
      <Typography variant="h3" gutterBottom>
        Регистрация
      </Typography>
      <Box
        component="form"
        sx={{ minWidth: '450px' }}
        onSubmit={(e) => void dispatch(registrationHandlerThunk(e)).then(() => setModalOpen(true))}
      >
        <Box mb={1}>
          <FormControl fullWidth>
            <FormLabel id="userType" hidden>
              Тип
            </FormLabel>
            <RadioGroup
              sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}
              aria-labelledby="userType-radio-buttons-group"
              name="userType"
              value={type}
              onChange={handleChange}
            >
              <FormControlLabel
                value="физическое лицо"
                control={<Radio />}
                label="Физическое лицо"
              />
              <FormControlLabel
                value="юридическое лицо"
                control={<Radio />}
                label="Юридическое лицо"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box mb={1}>
          <TextField name="name" label="ФИО" type="text" required fullWidth />
        </Box>
        <Box mb={1}>
          <TextField name="email" label="Почта" type="email" required fullWidth />
        </Box>
        <Box mb={1}>
          <TextField name="password" label="Пароль" type="password" required fullWidth />
        </Box>
        <Box mb={1}>
          <TextField name="phone" label="Телефон" type="tel" required fullWidth />
        </Box>
        <Box mb={1}>
          <TextField name="deliveryAddress" label="Адрес доставки" type="text" fullWidth required />
        </Box>
        {type === 'юридическое лицо' && (
          <>
            <Box mb={1}>
              <TextField
                name="orgName"
                label="Полное наименование организации"
                type="text"
                required
                fullWidth
              />
            </Box>
            <FormControl fullWidth>
              <FormLabel id="roleId" hidden>
                Тип
              </FormLabel>
              <RadioGroup
                sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}
                aria-labelledby="userType-radio-buttons-group"
                name="roleId"
              >
                <FormControlLabel value="1" control={<Radio />} label="Покупатель" />
                <FormControlLabel value="2" control={<Radio />} label="Продавец" />
              </RadioGroup>
            </FormControl>
            <Box mb={1} sx={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
              <TextField name="INN" label="ИНН" type="text" required />
              <TextField name="KPP" label="КПП" type="text" required />
            </Box>
            <Box mb={1}>
              <TextField name="OGRN" label="ОГРН" type="text" required fullWidth />
            </Box>
            <Box mb={1}>
              <TextField
                name="legalAddress"
                label="Юридический адрес"
                type="text"
                required
                fullWidth
              />
            </Box>
            <Box mb={1}>
              <TextField name="currAccount" label="Расчетный счёт" type="text" required fullWidth />
            </Box>
            <Box mb={1}>
              <TextField
                name="corrAccount"
                label="Корреспондентский счёт"
                type="text"
                required
                fullWidth
              />
            </Box>
          </>
        )}
        <Button type="submit" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </Box>
      <RegistraionModal modalOpen={modalOpen} setModalOpen={setModalOpen}/>
    </Box>
  );
}
