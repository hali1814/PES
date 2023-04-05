import customAxios from '../../helper/Axios';

export const getAllProducts = async () => {
  const result = await customAxios().get('/api/products/all');
  return result;
};
export const getAllGenres = async () => {
  const result = await customAxios().get('/api/genres/all');
  return result;
};
export const getDetail = async _id => {
  const result = await customAxios().get(`/api/product/${_id}`);
  return result;
};
export const getStore = async _id => {
  const result = await customAxios().get(`/api/store/${_id}`);
  return result;
};
export const getProductsByGenres = async _id => {
  const result = await customAxios().get(`/api/products/genre/${_id}`);
  return result;
};
export const getFlashSale = async () => {
  const result = await customAxios().get(`/api/products/flash_sale`);
  return result;
};
export const getCart = async () => {
  const result = await customAxios().get('/api/cart');
  return result;
};
export const addCart = async (idProduct, size, color, quantity) => {
  const data = { idProduct: idProduct, size: size, color: color, quantity: quantity }
  const result = await customAxios().post('/api/cart/add', data);
  return result;
};

export const deleteCart = async (idProduct, size, color) => {
  const data = { idProduct: idProduct, size: size, color: color }
  const result = await customAxios().post('/api/cart/delete/product', data);
  return result;
};

export const declineCart = async (idProduct, size, color) => {
  const data = { idProduct: idProduct, size: size, color: color, quantity: 1 }
  const result = await customAxios().post('/api/cart/decline/product', data);
  return result;
};

export const calculatorBill = async (voucher_shipping, voucher_pes) => {
  const data = { voucher_shipping, voucher_pes }
  const result = await customAxios().post('/api/bill/calculator', data);
  return result;
};

export const createBillService = async (voucher_shipping, voucher_pes) => {
  const data = { voucher_shipping, voucher_pes }
  const result = await customAxios().post('/api/bill/add', data);
  return result;
};

export const getBillsByStatus = async (status) => {
  const result = await customAxios().get(`/api/bills/${status}`);
  return result;
};
export const countCart = async () => {
  const result = await customAxios().get('/api/cart/count')
  return result
}

export const countNotification = async () => {
  const result = await customAxios().get('/api/notification/count')
  return result
}

export const allNotification = async () => {
  const result = await customAxios().get('/api/notification/all')
  return result
}

export const sawNotification = async (idNotification) => {
  const data = {idNotification}
  const result = await customAxios().post('/api/notification/all', data)
  return result
}
