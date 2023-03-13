import {getAllProducts} from './ProductService';
import React, {useState, createContext} from 'react';

export const ProductContext = createContext();

export const ProductsContextProvider = props => {
  const {children} = props;
  const [products, setProducts] = useState([]);
  const onGetAllProducts = async () => {
    try {
      const res = await getAllProducts();
      console.log('ressss=======', res);
      if (res.status == 'success') {
        setProducts(res.data);
        return true;
      }
    } catch (error) {
      console.log('GetAllGetALLProductsssssssss========', error);
    }
  };

  return (
    <ProductContext.Provider value={{onGetAllProducts, setProducts, products}}>
      {children}
    </ProductContext.Provider>
  );
};
