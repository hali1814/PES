import customAxios from '../../helper/Axios';

export const getAllProducts = async () => {
  const result = await customAxios().get('/api/products/all');
  return result;
};
