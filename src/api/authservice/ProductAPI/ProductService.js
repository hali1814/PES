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