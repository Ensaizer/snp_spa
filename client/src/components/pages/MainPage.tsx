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
