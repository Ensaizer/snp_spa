import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React from 'react';

export default function RegistrationForm() {
  const dispatch = useAppDispatch();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h3" gutterBottom>
        Регистрация
      </Typography>
      <Box component="form" onSubmit={(e) => void dispatch(registrationHandlerThunk(e))}>
        <Box mb={2}>
          <TextField name="name" label="ФИО" type="text" required />
        </Box>
        <Box mb={2}>
          <TextField name="email" label="Почта" type="email" required />
        </Box>
        <Box mb={2}>
          <TextField name="password" label="Пароль" type="password" required />
        </Box>
        <Box mb={2}>
          <TextField name="phone" label="Телефон" type="tel" required />
        </Box>
        <Box mb={2}>
          <TextField name="deliveryAddress" label="Адрес доставки" type="text" required />
        </Box>
        <FormControl>
          <FormLabel id="userType">Тип</FormLabel>
          <RadioGroup
            aria-labelledby="userType-radio-buttons-group"
            name="userType"
            // value={value}
            // onChange={handleChange}
          >
            <FormControlLabel value="физическое лицо" control={<Radio />} label="Физическое лицо" />
            <FormControlLabel value="юридическое лицо" control={<Radio />} label="Юридическое лицо" />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel id="roleId">Тип</FormLabel>
          <RadioGroup
            aria-labelledby="userType-radio-buttons-group"
            name="roleId"
            // value={value}
            // onChange={handleChange}
          >
            <FormControlLabel value="1" control={<Radio />} label="Покупатель" />
            <FormControlLabel value="2" control={<Radio />} label="Продавец" />
          </RadioGroup>
        </FormControl>
        <Box mb={2}>
          <TextField name="orgName" label="Полное наименование организации" type="text" required />
        </Box>
        <Box mb={2}>
          <TextField name="INN" label="ИНН" type="text" required />
          <TextField name="KPP" label="КПП" type="text" required />
        </Box>
        <Box mb={2}>
          <TextField name="ORGN" label="ОГРН" type="text" required />
        </Box>
        <Box mb={2}>
          <TextField name="legalAddress" label="Юридический адрес" type="text" required />
        </Box>
        <Box mb={2}>
          <TextField name="currAccount" label="Расчетный счёт" type="text" required />
        </Box>
        <Box mb={2}>
          <TextField name="corrAccount" label="Корреспондентский счёт" type="text" required />
        </Box>
        <Button type="submit" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </Box>
    </Box>
  );
}
