import React, { useLayoutEffect, useState } from 'react';
import { Card, CardActions, CardContent, CardMedia } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { deleteOneProductThunk, getOneProductByIdThunk } from '../store/slice/ProductThunk';

function Product(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { activeProduct, error, isLoading } = useAppSelector((state) => state.productsState);

  useLayoutEffect(() => {
    if (id) {
      void dispatch(getOneProductByIdThunk(+id));
    }
  }, []);
  console.log();
  return (
    <>
      {error && <h1>Sorry we have some problem!</h1>}
      {isLoading && <h2>Loading...</h2>}

      {!isLoading && !error && (
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia sx={{ height: 140 }} image="/vite.svg" title="green iguana" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">КУПИТЬ</Button>
          </CardActions>
          <CardActions>
            <Button size="small" onClick={() => void dispatch(deleteOneProductThunk(id as string))}>
              DELETE
            </Button>
            <Button size="small" component={Link} to={`/products/${id}/edit`}>
              UPDATE
            </Button>
          </CardActions>
        </Card>
      )}
    </>
  );
}

export default Product;
