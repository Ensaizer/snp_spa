import {Box, IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from 'react';

export default function Search(): JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const changeHandler = (e) => setInputValue(e.target.value);
  

  const searchData = async (search) => {
    // setLoading(true);
    const response = await fetch(`/api/users/search?input=${search}`);
    // setLoading(false);
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (inputValue.length > 0) {
        searchData(inputValue);
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  const submitHandler = (e): void => {
    e.preventDefault();
    searchData(inputValue);
    setInputValue('');
  };
  return (
    <Box sx={{height: '250px', backgroundColor: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
