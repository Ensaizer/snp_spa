import React from 'react';
import { Box, Container } from '@mui/material';
import Search from '../ui/Search';
import Carousel from '../ui/Carousel';

function MainPage(): JSX.Element {
  return (
    <>
      <Search />
      <Container>
        <Carousel/>
      </Container>
    </>
  );
}

export default MainPage;
