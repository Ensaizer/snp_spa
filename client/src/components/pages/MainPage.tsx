import React, {useLayoutEffect, useState} from 'react';
import { Container, Paper } from '@mui/material';
import { useGetAllCategoriesQuery } from '../../store/categorySlise/category.ts';
import Search from '../ui/Search';
import Carousel from '../ui/Carousel';
import CardItem from "../Card";
import {useAppDispatch} from "../../store/hooks.ts";
import {getAllProduct} from "../../store/Productslice/ProductThunk.ts";
import type {IProduct} from "../../types/ProductType.ts";

function MainPage(): JSX.Element {
  const { data, isLoading, error } = useGetAllCategoriesQuery('');
  const [state, setSatate] = useState(1);
    const [dataCard, setDataCard] = useState<IProduct[]>([]);
    const dispatch = useAppDispatch();
    useLayoutEffect(() =>{
        void dispatch(getAllProduct()).then((info) => setDataCard(info.payload))
    }, []);

    console.log(dataCard)
  return (
    <>
      <Search />
      <Container>
        <Carousel />
        {/* </Container> */}

      {isLoading && <h2>Loading...</h2>}
      {error && <h2>Sorry we have some error: {error.message}</h2>}
      {data && (
              <Paper elevation={16} sx={{display: 'flex', backgroundСolor: '#F0EFFA', overflow: 'hidden'}}>
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

      )}
          <div className="main__card">
              {
                  dataCard.map(item => <CardItem
                      key={item.id}
                      brandId = {item. brandId}
                      categoryId = {item.categoryId}
                      deliveryTime = {item.deliveryTime}
                      description = {item.description}
                      id = {item.id}
                      minOrder={item.minOrder}
                      multiplicity={item.multiplicity}
                      name = {item.name}
                      price={item.price}
                      stock = {item.stock}
                  />)
              }
          </div>

            </Container>
    </>
  );
}

export default MainPage;
