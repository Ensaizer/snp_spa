import React, { useState } from 'react';
import { Container, Paper } from '@mui/material';
import { useGetAllCategoriesQuery } from '../../store/categorySlise/category.ts';
import Search from '../ui/Search';
import Carousel from '../ui/Carousel';








function MainPage(): JSX.Element {
  const { data, isLoading, error } = useGetAllCategoriesQuery('');
  const [state, setSatate] = useState(1);

  return (
    <>
      <Search />
      <Container>
        <Carousel />
        {/* </Container> */}

      {isLoading && <h2>Loading...</h2>}
      {error && <h2>Sorry we have some error: {error.message}</h2>}
      {data && (
        // <section className="categories">
        <Paper sx={{display: 'flex', backgroundСolor: '#F0EFFA', overflow: 'hidden'}}>
          <ul className="categories__list">
            {data.map((el) => (
              <li className="categories__item" key={el.id} onClick={() => setSatate(el.id)}>
                {el.name}
              </li>
            ))}
          </ul>
          {data.map((el) => (
            <img
              key={el.id}
              src={`${el.id}.jpg`}
              alt="trucks"
              className={el.id === state ? 'categories__img active' : 'categories__img '}
            />
          ))}
          </Paper>
        // </section> 
      )}
            </Container>
    </>
  );
}

export default MainPage;
