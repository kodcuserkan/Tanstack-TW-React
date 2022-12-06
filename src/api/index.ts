const BASE_URL = 'https://fakestoreapi.com';

export const getProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  return response.json();
};