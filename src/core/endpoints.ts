const apiURL = (import.meta.env.VITE_APP_ENV === 'development' ? import.meta.env.VITE_DEV_BACKEND_API_URL : import.meta.env.VITE_PROD_BACKEND_API_URL);

const loginURL               = apiURL + '/auth/login';
const registerURL            = apiURL + '/auth/register';
const productsURL            = apiURL + '/products/';
const getOneProductURL       = apiURL + '/products/item/';
const updateOneProductURL    = apiURL + '/products/item/';
const getDeletedProductsURL  = apiURL + '/products/deleted';
const createProductURL       = apiURL + '/products/';
const deleteProductURL       = apiURL + '/products/item/133/restore';


const categoriesURL          = apiURL + '/category/';

const invoicesURL            = apiURL + '/invoices/';

const ordersURL              = apiURL + '/orders/';


const shippingMethodURL      = apiURL + '/shipping-methods/';


const dashboardURL           = apiURL + '/dashboard/';

const SUCCESS: string        = 'success';
const FAIL: string           = 'fail';
const ERROR: string          = 'error';

export {
  loginURL,
  productsURL,
  getOneProductURL,
  updateOneProductURL,
  getDeletedProductsURL,
  createProductURL,
  deleteProductURL,
  categoriesURL,
  invoicesURL,
  registerURL,
  ordersURL,
  shippingMethodURL,
  dashboardURL
}

export {
  SUCCESS,
  FAIL,
  ERROR,
}