import type { CartProduct } from '../types';


const cartKey = 'supplements-store-cart';


const getToken = (): string | null => {
  return localStorage.getItem('token');
};


const setToken = (token: string): void => {
  localStorage.setItem('token', token);
};


const removeToken = (): void => {
  localStorage.removeItem('token');
};


const storeItemsInCart = (items: CartProduct[]): void => {
  localStorage.setItem(cartKey, JSON.stringify(items));
}


const getCartItems = (): any => {
  return localStorage.getItem(cartKey);
}


const addItemToCart = (item: CartProduct, items: CartProduct[]): CartProduct[] => {

  const existingItem = items.find(i => i.id === item.id);

  if (!existingItem) {
    return [...items, { ...item, totalQuantity: 1, totalPrice: parseFloat(item.price).toFixed(2) }];
  }

  return items.map((i: CartProduct) =>
    i.id !== item.id ? i : {
      ...i,
      totalQuantity: i.totalQuantity + 1,
      totalPrice: ((i.totalQuantity + 1) * parseFloat(i.price)).toFixed(2)
    }
  );
}


const processItemToCart = (product: any): CartProduct []| void => {

  const item: CartProduct = {
    id: product.id,
    name: product.name,
    price: product.price,
    totalQuantity: 1,
    totalPrice: product.price,
  }

  const items = getCartItems();

  if (!items) {
    storeItemsInCart([item]);
    return;
  }

  const refreshedItems = addItemToCart(item, JSON.parse(items));

  storeItemsInCart(refreshedItems);

  return refreshedItems;
}


const removeItemFromCart = (product: CartProduct, items: CartProduct[]): CartProduct[] => {
  return items.filter((item: CartProduct) => item.id !== product.id);
}


const processRemoveItemFromCart = (product: CartProduct): void => {
  const items = getCartItems();

  if (!items) {
    return;
  }

  const refreshedItems = removeItemFromCart(product, JSON.parse(items));

  storeItemsInCart(refreshedItems);
}


const processDecrementItemFromCart = (product: CartProduct, items: CartProduct[]): CartProduct[] => {

  let refreshedItems;

  if (product.totalQuantity === 1) {
    refreshedItems = removeItemFromCart(product, items);
  } else {
      refreshedItems = items.map((item: CartProduct) => item.id === product.id ?
      {
        ...product,
        totalQuantity: product.totalQuantity - 1, totalPrice: ((product.totalQuantity - 1) * parseFloat(product.price)).toFixed(2)
      }
      :
      item
    );
  }
  storeItemsInCart(refreshedItems);

  return refreshedItems;
}



export {
  getToken,
  setToken,
  removeToken,
  getCartItems,
  addItemToCart,
  processItemToCart,
  removeItemFromCart,
  processRemoveItemFromCart,
  processDecrementItemFromCart
}
