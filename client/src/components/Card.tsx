import * as React from 'react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea } from '@mui/material';
import type { IProduct } from '../types/ProductType';

const CardItem: FC<IProduct> = ({ id, name, article, image, price, deliveryTime, description, stock }) => {
  return (
    <Card sx={{ maxWidth: 345 }} component={Link} to={`products/${id}`}>
      <CardActionArea>
        <CardMedia component="img" height="200" image={`1${image}.jpg`} alt={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '10px',
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontWeight: 'bold',
              }}
            >
              {price} рублей
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Остаток на складе: {stock}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '10px',
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontWeight: 'bold',
              }}
            >
              Артикул: {article}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Время доставки от: {deliveryTime} дней
            </Typography>
          </Box>
          <Button variant="contained" sx={{ marginTop: '10px' }}>
            Купить
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardItem;
