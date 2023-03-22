import {
  getAllGenres,
  getAllProducts,
  getCart,
  getDetail,
  getFlashSale,
  getProductsByGenres,
  getStore,
} from './ProductService';
import React, { useState, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ProductContext = createContext();

export const ProductsContextProvider = props => {
  const { children } = props;
  const [products, setProducts] = useState([]);
  const [genres, setGenres] = useState([]);
  const [detail, setDetail] = useState('');
  const [store, setStore] = useState([]);
  const [cart, setCart] = useState([]);
  const [productID, setProductID] = useState([]);
  const [flashSaleProducts, setFlashSaleProducts] = useState([]);
  const [productsByGenre, setProductsByGenre] = useState([]);

  const onGetAllProducts = async () => {
    try {
      const res = await getAllProducts();
      if (res.status == 'success') {
        setProducts(res.data);
        return true;
      }
    } catch (error) {
      console.log('GetAllGetALLProductsssssssss========', error);
    }
  };

  const onGetAllFlashSaleProducts = async () => {
    try {
      const res = await getFlashSale();
      // console.log('ssssssdd', res);
      if (res.status == 'success') {
        setFlashSaleProducts(res.data);

        return true;
      }
    } catch (error) {
      console.log('GetAllGetALLProductsssssssss========', error);
    }
  };

  const onGetAllGenre = async () => {
    try {
      const res = await getAllGenres();
      if (res.status == 'success') {
        setGenres(res.data);
        return true;
      }
    } catch (error) {
      console.log('GetAllGetALLProductsssssssss========', error);
    }
  };

  const onGetDetail = async _id => {
    try {
      const res = await getDetail(_id);
      if (res.status == 'success') {
        setDetail(res.data);
        return true;
      }
    } catch (error) {
      console.log('GetAllGetALLProductsssssssss========', error);
    }
  };

  const onGetProductsByGenre = async _id => {
    try {
      const res = await getProductsByGenres(_id);
      if (res.status == 'success') {
        setProductsByGenre(res.data);
        return true;
      }
    } catch (error) {
      console.log('GetAllGetALLProductsssssssss========', error);
    }
  };

  const onGetStore = async _id => {
    try {
      const res = await getStore(_id);
      if (res.status == 'success') {
        setStore(res.data);
        return true;
      }
    } catch (error) {
      console.log('GetAllGetALLProductsssssssss========', error);
    }
  };

  const onGetCart = async () => {
    try {
      const res = await getCart()
      if (res.status == 'success') {
        setCart(res.data);
        console.log('onGetCart ==>', cart)
        return true
      }
    } catch (error) {
      console.log('GET CART ERROR ==>', error);
    }
  }

  return (
    <ProductContext.Provider
      value={{
        productsByGenre,
        setCart,
        onGetProductsByGenre,
        onGetAllProducts,
        setProducts,
        products,
        onGetAllGenre,
        genres,
        onGetDetail,
        detail,
        onGetStore,
        store,
        flashSaleProducts,
        onGetAllFlashSaleProducts,
        onGetCart,
        cart
      }}>
      {children}
    </ProductContext.Provider>
  );
};
