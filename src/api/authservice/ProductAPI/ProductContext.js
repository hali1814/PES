import {
  addCart,
  deleteCart,
  getAllGenres,
  getAllProducts,
  getCart,
  getDetail,
  getBillsByStatus,
  calculatorBill,
  getFlashSale,
  getProductsByGenres,
  getStore,
  declineCart,
  createBillService,
  countCart,
  countNotification,
  allNotification,
  sawNotification,
  getUnRate,
  pushRate,
  cancelBill,
  getBillsDetails
} from './ProductService';
import React, { useState, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ProductContext = createContext();

export const ProductsContextProvider = props => {
  const { children } = props;
  const [products, setProducts] = useState([]);
  const [genres, setGenres] = useState([
    {
      _id: 'dfahsdkfhaksjhdfkjash', // Không xóa ID của HÀO HOA OKEEE
      label: 'Tất cả',
      images:
        'http://pes.store/images/2fba12b9-0511-4124-94eb-2ee01a2498b6.png',
      status: false,
    },
  ]);
  const [detail, setDetail] = useState('');
  const [store, setStore] = useState([]);
  const [cart, setCart] = useState([]);
  const [productID, setProductID] = useState([]);
  const [flashSaleProducts, setFlashSaleProducts] = useState([]);
  const [productsByGenre, setProductsByGenre] = useState([]);
  const [flashSaleLoading, setFlashSaleLoading] = useState(false)
  const [productLoading, setProductLoading] = useState(false)
  const [relatedProductLoading, setRelatedProductLoading] = useState(false)
  const [detailLoading, setDetailLoading] = useState(false)
  const [cartLoading, setCartLoading] = useState(false)
  const [cartQuantity, setCartQuantity] = useState()
  const [cartQuantityLoading, setCartQuantityLoading] = useState(false)
  const [dataBill, setDataBill] = useState('');
  const [billLoading, setBillLoading] = useState(false)

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
    setFlashSaleLoading(true)
    try {
      const res = await getFlashSale();
      if (res.status == 'success') {
        setFlashSaleProducts(res.data);
        setFlashSaleLoading(false)
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
        const tmp = [genres[0], ...res.data];
        setGenres(tmp);
        return true;
      }
    } catch (error) {
      console.log('GetAllGetALLProductsssssssss========', error);
    }
  };

  const onGetDetail = async _id => {
    setDetailLoading(true)
    try {
      const res = await getDetail(_id);
      if (res.status == 'success') {
        setDetail(res.data);
        setDetailLoading(false)
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
      } else {
        return false;
      }
    } catch (error) {
      console.log('onAddCart failed ===>', error);
    }
  };

  const onDeleteCart = async (idProduct, size, color) => {
    try {
      const res = await deleteCart(idProduct, size, color);
      if (res.status == 'success') {
        console.log('delete cart product ==>', res.data.message);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log('onAddCart failed ===>', error);
    }
  };

  const onCalculator = async (voucher_shipping, voucher_pes) => {
    setBillLoading(true)
    try {
      const res = await calculatorBill(voucher_shipping, voucher_pes);
      if (res.status == 'success') {
        setDataBill(res.data);
        setBillLoading(false)
        return res.data;
      }
    } catch (error) {
      console.log('onCalculator failed ===>', error);
    }
  };

  const onGetProductsByGenre = async _id => {
    // setRelatedProductLoading(true)
    setProductLoading(true)
    try {
      const res = await getProductsByGenres(_id);
      if (res.status == 'success') {
        setProducts(res.data)
        setProductsByGenre(res.data);
        setProductLoading(false)
        // setRelatedProductLoading(false)
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
    setCartLoading(true)
    try {
      const res = await getCart();
      if (res.status == 'success') {
        setCart(res.data);
        setCartLoading(false)
        return res.data;
      }
    } catch (error) {
      console.log('GET CART ERROR ==>', error);
    }
  };

  const onDeclineCart = async (idProduct, size, color) => {
    try {
      const res = await declineCart(idProduct, size, color);
      if (res.status == 'success') {
        console.log('add cart product ==>', res.data.message);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log('onAddCart failed ===>', error);
    }
  };


  const onGetStatusBills = async (status) => {
    try {
      const res = await getBillsByStatus(status);
      if (res.status == 'success') {
        return res.data;
      }
    } catch (error) {
      console.log('onGetStatusBills failed ===>', error);
    }
  };

  const createBills = async (voucher_shipping, voucher_pes) => {
    try {
      const res = await createBillService(voucher_shipping, voucher_pes);
      if (res.status == 'success') {
        return true;
      } else return false;
    } catch (error) {
      console.log('createBills failed ===>', error);
    }
  };
  const onCountCart = async () => {
    try {
      const res = await countCart()
      if (res.status === 'success') {
        setCartQuantity(res.data.quantityCart)
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log('onCountCart failed ===>', error);
      throw error
    }
  }

  const countNotificationContext = async () => {
    try {
      const res = await countNotification()
      if (res.status === 'success') {
        return res.data
      }
    } catch (error) {
      console.log('countNotificationContext failed ===>', error);
      throw error
    }
  }

  const getListNotification = async () => {
    try {
      const res = await allNotification()
      if (res.status === 'success') {
        return res.data
      }
    } catch (error) {
      console.log('countNotificationContext failed ===>', error);
      throw error
    }
  }

  const sawNotificationContext = async (idNotification) => {
    try {
      const res = await sawNotification(idNotification)
      if (res.status === 'success') {
        return res.data
      }
    } catch (error) {
      console.log('sawNotificationContext failed ===>', error);
      throw error
    }
  }


  const getUnRateContext = async () => {
    try {
      const res = await getUnRate()
      if (res.status === 'success') {
        return res.data
      }
    } catch (error) {
      console.log('getUnRateContext failed ===>', error);
      throw error
    }
  }


  const pushRateController = async (idRate, star, msg) => {
    try {
      const res = await pushRate(idRate, star, msg)
      if (res.status === 'success') {
        return true
      }
      return false
    } catch (error) {
      console.log('getUnRateContext failed ===>', error);
      throw error
    }
  }

  const cancelBillController = async (idBill) => {
    try {
      const res = await cancelBill(idBill)
      if (res.status === 'success') {
        return true
      }
      return false
    } catch (error) {
      console.log('cancelBillController failed ===>', error);
      throw error
    }
  }

  const getBillDetailsController = async (idBill) => {
    try {
      const res = await getBillsDetails(idBill)
      if (res.status === 'success') {
        return res.data
      }else {
        return false
      }
    } catch (error) {
      console.log('getBillDetailsController failed ===>', error);
      throw error
    }
  }

  return (
    <ProductContext.Provider
      value={{
        onDeleteCart,
        productsByGenre,
        onAddCart,
        onDeclineCart,
        setCart,
        onGetProductsByGenre,
        setProductsByGenre,
        onGetAllProducts,
        setProducts,
        onCalculator,
        products,
        onGetAllGenre,
        genres,
        onGetDetail,
        detail,
        onGetStore,
        store,
        onGetStatusBills,
        flashSaleProducts,
        onGetAllFlashSaleProducts,
        onGetCart,
        setGenres,
        cart,
        createBills,
        flashSaleLoading,
        setFlashSaleLoading,
        productLoading,
        setProductLoading,
        relatedProductLoading,
        setRelatedProductLoading,
        detailLoading,
        setDetailLoading,
        cartLoading,
        setCartLoading,
        onCountCart,
        cartQuantity,
        setCartQuantity,
        cartQuantityLoading,
        setCartQuantityLoading,
        dataBill,
         setDataBill,
         countNotificationContext,
         getListNotification,
         sawNotificationContext,
        billLoading,
        setBillLoading,
        getUnRateContext,
        pushRateController,
        cancelBillController,
        getBillDetailsController
      }}>
      {children}
    </ProductContext.Provider>
  );
};
