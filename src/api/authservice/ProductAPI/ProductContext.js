import {
  getAllGenres,
  getAllProducts,
  getDetail,
  getStore,
} from './ProductService';
import React, {useState, createContext} from 'react';

export const ProductContext = createContext();

export const ProductsContextProvider = props => {
  const {children} = props;
  const [products, setProducts] = useState([]);
  const [genres, setGenres] = useState([]);
  const [detail, setDetail] = useState([]);
  const [store, setStore] = useState([]);

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

  const onGetStore = async _id => {
    try {
      const res = await getStore(_id);
      console.log('aaaaaaa', res);
      if (res.status == 'success') {
        setStore(res.data);
        return true;
      }
    } catch (error) {
      console.log('GetAllGetALLProductsssssssss========', error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        onGetAllProducts,
        setProducts,
        products,
        onGetAllGenre,
        genres,
        onGetDetail,
        detail,
        onGetStore,
        store,
      }}>
      {children}
    </ProductContext.Provider>
  );
};
