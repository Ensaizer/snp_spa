import { Box, Typography } from '@mui/material';
import React from 'react';

export default function ErrorBoundary(): JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img alt="404 error" src="/pngwing.com.png" width="1000" />
      <Typography variant="h2" component="h1" mb={4} >
        Упс! 404.
      </Typography>
      <Typography variant="h5" component="h2" sx={{ textAlign: 'center' }}>
        Кажется что-то пошло не так. Страница, которую вы запрашиваете не существует.
        <br />
        Возможно она устарела, была удалена, или был введён неверный адрес в адресной строке.
      </Typography>
    </Box>
  );
}
