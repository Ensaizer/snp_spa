import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react'

export default function RegistrationForm() {
    const dispatch = useAppDispatch();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h3" gutterBottom>
        Регистрация
      </Typography>
      <Box component="form" onSubmit={(e) => void dispatch(registrationHandlerThunk(e))}>
        <Box mb={2}>
          <TextField name="name" label="ФИО/Название организации" type="text" required />
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
        <Button type="submit" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </Box>
    </Box>
  )
}
