import {
  addCart,
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
      console.log('ressss', res)
      if (res.status == 'success') {
        setDetail(res.data);
        return res.data;
      }
    } catch (error) {
      console.log('GetAllGetALLProductsssssssss========', error);
    }
  };

  const onAddCart = async (idProduct, size, color, quantity) => {
    try {
      const res = await addCart(idProduct, size, color, quantity);
      if (res.status == 'success') {
        console.log('add cart product ==>', res.data.message);
        return true;
      }
      else {
        return false;
      }
    } catch (error) {
      console.log('onAddCart failed ===>', error);
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
        onAddCart,
        setCart,
        onGetProductsByGenre,
        setProductsByGenre,
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
