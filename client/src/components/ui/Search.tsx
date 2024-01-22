import {Autocomplete, Box, IconButton, InputBase, Paper, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { searchProductsByArticleThunk } from '../../store/slice/ProductThunk';

export default function Search(): JSX.Element {
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(false);
  const {foundProducts, loading} = useAppSelector(state => state.productsState);
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState('');
  const changeHandler = (e:React.ChangeEvent<HTMLInputElement>):void => {
    setInputValue(e.target.value)
   };
  

  // const searchData = async (search) => {
  //   setLoading(true);
  //   const response = await fetch(`/api/products/search?input=${search}`);
  //   setLoading(false);
  //   const data = await response.json();
  //   console.log(data);
  //   setProducts(data);
  // };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (inputValue.length > 2) {
        void dispatch(searchProductsByArticleThunk(inputValue));
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  const submitHandler = (e:React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(searchProductsByArticleThunk(inputValue));
    setInputValue('');
  };
  return (
    <Box sx={{height: '250px', backgroundColor: '#2F2B4A', display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
      <Typography variant='h5' sx={{color: 'white',marginBottom: '20px'}}>Находи и покупай запчасти на SNP</Typography>
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: 600,
        }}
        onSubmit={submitHandler}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Введите артикул запчасти"
          name='articlePart'
          value={inputValue}
          inputProps={{ 'aria-label': 'search user by name' }}
          onChange={changeHandler}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
}
