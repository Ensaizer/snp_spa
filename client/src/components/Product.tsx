import React, { useLayoutEffect, useState } from 'react';
import { Box, ButtonGroup, Container, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getOneProductByIdThunk } from '../store/Productslice/ProductThunk';
import { useCreateCartMutation } from '../store/cartSlice/cartSlice';

function Product(): JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [create] = useCreateCartMutation();
  const { user } = useAppSelector((state) => state.auth);
  const { activeProduct, error, isLoading } = useAppSelector((state) => state.productsState);
  const [quantity, setQuantity] = useState(0);
  const decrementClickHandle = (): void => {
    if (quantity > activeProduct.minOrder) setQuantity((prev) => prev - activeProduct.multiplicity);
  };
  const incrementClickHandle = (): void => {
    if (quantity < activeProduct.stock) setQuantity((prev) => prev + activeProduct.multiplicity);
  };

  useLayoutEffect(() => {
    if (id) {
      void dispatch(getOneProductByIdThunk(+id));
    }
  }, []);

  const clickCreateCartHandler = async () => {
    const cart = {
      userId: user.id,
      productId: id,
      quantity,
    };
    await create(cart).then(() => navigate('/cart'));
  };

  return (
    <>
      {error && <h1>Sorry we have some problem!</h1>}
      {isLoading && <h2>Loading...</h2>}

      {!isLoading && !error && (
        <Container
          maxWidth="md"
          sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', gap: '80px' }}
        >
          <Grid container spacing={2} sx={{ alignContent: 'flex-start' }}>
            <Grid item xs={4}>
              <Typography variant="h5" color="primary">
                Бренд
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6">{activeProduct.brandId}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5" color="primary">
                Артикул
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6">{activeProduct.article}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5" color="primary">
                Наименование
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6">{activeProduct.name}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5" color="primary">
                Описание
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6">{activeProduct.description}</Typography>
            </Grid>
          </Grid>
          <Box>
            <Box>
              <Box sx={{ display: 'flex', gap: '10px' }} mb={2}>
                <Typography variant="h5" color="primary">
                  В наличии:
                </Typography>
                <Typography variant="h5">{`${activeProduct.stock} шт`}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '10px' }} mb={2}>
                <Typography variant="h5" color="primary">
                  Мин. заказ:
                </Typography>
                <Typography variant="h5">{`${activeProduct.minOrder} шт`}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '10px' }} mb={2}>
                <Typography variant="h5" color="primary">
                  Кратность:
                </Typography>
                <Typography variant="h5">{`${activeProduct.multiplicity} шт`}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '10px' }} mb={2}>
                <Typography variant="h5" color="primary">
                  Цена:
                </Typography>
                <Typography variant="h5">{`${activeProduct.price} руб`}</Typography>
              </Box>
            </Box>
            <ButtonGroup
              variant="contained"
              size="large"
              sx={{ marginBottom: '20px', marginRight: '10px' }}
            >
              <Button
                variant="contained"
                type="button"
                id="decrement-button"
                onClick={decrementClickHandle}
              >
                -
              </Button>
              <Button disabled sx={{ color: 'black' }}>
                {quantity}
              </Button>
              <Button
                variant="contained"
                type="button"
                id="increment-button"
                onClick={incrementClickHandle}
              >
                +
              </Button>
            </ButtonGroup>
            <Box sx={{ display: 'flex', gap: '10px' }} mb={2}>
              <Typography variant="h5" color="secondary">
                Сумма:
              </Typography>
              <Typography variant="h5">{`${activeProduct.price * quantity} руб`}</Typography>
            </Box>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              type="button"
              id="addtocart-button"
              disabled={!quantity || !user.isApproved}
              onClick={(): void => clickCreateCartHandler()}
            >
              Добавить в корзину
              <AddShoppingCartIcon sx={{ marginLeft: '10px' }} />
            </Button>
          </Box>
        </Container>
      )}
    </>
  );
}

export default Product;
