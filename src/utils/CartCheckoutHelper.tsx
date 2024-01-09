import PAYMENT_TYPE from '../constants/payment';
import { formatPrice } from './product';

const groupBySeller = (cartItems:any) => {
  const sellerProducts:any = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const cartItem of cartItems) {
    const sellerObj = sellerProducts
      .find((sellerProduct:any) => sellerProduct.storeID === cartItem.seller_id)
        || { storeID: cartItem.seller_id, storeItems: [], storeName: cartItem.seller_name };
    sellerObj.storeItems = [...sellerObj.storeItems, cartItem];
    if (sellerObj.storeItems.length <= 1) sellerProducts.push(sellerObj);
  }

  return sellerProducts;
};

const parseCartItemsToPayload = (sellerProducts:any[]) => sellerProducts.map((sellerProduct) => {
  const storeCart = {
    seller_id: sellerProduct.storeID, cart_item_id: [], voucher_code: '', courier_id: 0,
  };
  storeCart.cart_item_id = sellerProduct.storeItems.map((item: any) => item.id);
  return storeCart;
});

// const applyVoucherToStore = (voucherID:string | number, storeID:string | number,
// cartPerStore:any[]) => cartPerStore.map((cartStore) => {
//   if (cartStore.seller_id === storeID) {
//     cartStore.voucher_id = voucherID;
//   }
//   return cartStore;
// });

const setCourierOptionToStore = (
  courierID:number,
  sellerID:number,
  cartPerStore:any[],
) => cartPerStore.map((cartStore) => {
  if (cartStore.seller_id === sellerID) {
    return { ...cartStore, courier_id: courierID };
  }
  return cartStore;
});

const setVoucherToStore = (
  code:string,
  sellerID:number,
  cartPerStore:any[],
) => cartPerStore.map((cartStore) => {
  if (cartStore.seller_id === sellerID) {
    return { ...cartStore, voucher_code: code };
  }
  return cartStore;
});

const generateCheckoutPayload = (
  cartPerStore:any[],
  method:string,
  globalVoucher:string = '',
  accountNumber = '',
  buyerAddressID: number = 0,
) => {
  let paymentMethod = '';
  if (method === PAYMENT_TYPE.SLP) paymentMethod = 'sea-labs-pay';
  if (method === PAYMENT_TYPE.WALLET) paymentMethod = 'wallet';

  return {
    global_voucher_code: globalVoucher,
    cart_per_store: cartPerStore,
    payment_method: paymentMethod,
    account_number: accountNumber,
    buyer_address_id: buyerAddressID,
  };
};

const parseToCartItemState = (id:number | undefined, product:any, variant:any) => {
  const name = `${product.name} ${variant.variant1_value || ''} ${variant.variant2_value || ''}`.trim();
  return {
    cartItemID: id,
    name,
    thumbnail: product?.product_photos[0]?.photo_url,
    price: variant.price,
  };
};

const orderIsIncomplete = (cartPerStore:any[]) => {
  if (cartPerStore.length === 0) return true;
  // eslint-disable-next-line no-restricted-syntax
  for (const storeCart of cartPerStore) {
    if (storeCart?.courier_id === 0) return true;
  }
  return false;
};

const parseDiscountAmount = (voucher:any, storeTotal:number) => {
  if (voucher?.amount_type === 'percentage') {
    return `- Rp ${formatPrice((voucher.amount * storeTotal) / 100)} (${voucher.amount}% OFF)`;
  }
  if (voucher?.amount_type === 'nominal') {
    return `- Rp ${voucher.amount}`;
  }
  return '- Rp 0';
};

const getDiscountDisplay = (voucher:any) => {
  if (voucher?.amount_type === 'percentage') {
    return `(${voucher.amount}% OFF)`;
  }
  if (voucher?.amount_type === 'nominal') {
    return `Rp ${voucher.amount}`;
  }
  return 'Rp 0';
};

const getDiscountNominal = (voucher:any, storeTotal:number) => {
  if (voucher?.amount_type === 'percentage') {
    return (voucher.amount * storeTotal) / 100;
  }
  if (voucher?.amount_type === 'nominal') {
    return voucher.amount;
  }
  return 0;
};

const calculateSubtotalTrx = (predictedPrices:any[]) => predictedPrices.reduce((
  sum:any,
  a:any,
) => sum + a.total_order, 0);

const calculateDeliveryTotalTrx = (predictedPrices:any[]) => predictedPrices.reduce((
  sum:any,
  a:any,
) => sum + a.delivery_price, 0);

export {
  groupBySeller, parseCartItemsToPayload,
  parseDiscountAmount, getDiscountNominal, getDiscountDisplay,
  generateCheckoutPayload, parseToCartItemState,
  setCourierOptionToStore, orderIsIncomplete, setVoucherToStore,
  calculateSubtotalTrx, calculateDeliveryTotalTrx,
};
