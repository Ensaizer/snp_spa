import {
  Autocomplete,
  Box,
  IconButton,
  InputBase,
  Link,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { searchProductsByArticleThunk } from '../../store/slice/ProductThunk';
import { resetFoundProducts } from '../../store/slice/products';

export default function Search(): JSX.Element {
  const { foundProducts, loading } = useAppSelector((state) => state.productsState);
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState('');
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (inputValue.length > 4) {
        void dispatch(searchProductsByArticleThunk(inputValue));
      }
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
      dispatch(resetFoundProducts());
    };
  }, [inputValue]);

  return (
    <Box
      sx={{
        height: '250px',
        backgroundColor: '#2F2B4A',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5" sx={{ color: 'white', marginBottom: '20px' }}>
        Находи и покупай запчасти на SNP
      </Typography>
      <Paper
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: 600,
          position: 'relative',
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, padding: '5px' }}
          placeholder="Введите артикул запчасти"
          name="articlePart"
          value={inputValue}
          inputProps={{ 'aria-label': 'search user by name' }}
          onChange={changeHandler}
        />
        {/* <IconButton type="submit" sx={{ p: '10px' }} aria-label="search"> */}
          <SearchIcon />
        {/* </IconButton> */}
        {!!foundProducts.length && (
          <Paper sx={{ position: 'absolute', top: '45px', left: 0, right: 0, zIndex: 1 }}>
            <List>
              {foundProducts.map((product) => (
                <ListItem key={product.id}>
                  <Link
                    underline="none"
                    sx={{
                      fontSize: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                    component={ReactLink}
                    to={`/products/${product.id}`}
                  >
                    <Typography variant="h6" sx={{ color: '#FB6019' }}>
                      {product.article}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#2F2B4A' }}>
                      {product.name}
                    </Typography>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </Paper>
    </Box>
  );
}
