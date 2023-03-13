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
