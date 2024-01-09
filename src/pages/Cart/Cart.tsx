import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeCartItem, checkCartItem, uncheckCartItem, getCartItems,
} from '../../features/cart/cartSlice';
import { AppDispatch } from '../../app/store';

import Card from '../../components/Cards/Card';
import './Cart.scss';
import CardCartAll from '../../components/Cards/CardCart/CardCartAll';
import Carts from '../../api/carts';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { checkedIDs } = useSelector((store:any) => store.cart);

  const [cartItems, setCartItems] = useState<any>([]);
  const [total, setTotal] = useState({
    totalPricePromotion: 0,
    totalPriceBase: 0,
    totalProduct: 0,
  });

  const [isAllProductsChecked, setIsAllProductsChecked] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const buyNow = location?.state?.cartId || '';

  const isAllChecked = (cart: any[]) => {
    for (let i = 0; i < cart.length; i += 1) {
      if (!cart[i].storeIsChecked) {
        return false;
      }
    }
    return true;
  };

  const isAllInStoreChecked = (items: any[]) => {
    for (let i = 0; i < items.length; i += 1) {
      if (!items[i].isChecked) {
        return false;
      }
    }
    return true;
  };

  const setTotalCheck = (store: any) => {
    let tempTotalProduct = 0;
    let tempTotalPricePromotion = 0;
    let tempTotalPriceBase = 0;
    for (let i = 0; i < store.length; i += 1) {
      const items = store[i].storeItems;
      for (let j = 0; j < items.length; j += 1) {
        if (items[j].isChecked) {
          tempTotalProduct += items[j].amount;
          tempTotalPricePromotion += items[j].pricePromotion * items[j].amount;
          tempTotalPriceBase += items[j].priceBase * items[j].amount;
        }
      }
    }
    setTotal({
      totalPricePromotion: tempTotalPricePromotion,
      totalPriceBase: tempTotalPriceBase,
      totalProduct: tempTotalProduct,
    });
  };

  const handleCheckedAllProducts = () => {
    const checkedStore = cartItems.map(
      (storeData: any) => {
        const newStoreData = storeData;
        const checked = !newStoreData.storeIsChecked;
        newStoreData.storeIsChecked = !isAllProductsChecked;
        newStoreData.storeItems.map(
          (item: any) => {
            const newItem = item;
            if (newItem.isChecked !== checked && checked) { dispatch(checkCartItem(item.id)); }
            if (newItem.isChecked !== checked && !checked) { dispatch(uncheckCartItem(item.id)); }
            newItem.isChecked = !isAllProductsChecked;
            return newItem;
          },
        );
        return newStoreData;
      },
    );

    setCartItems(checkedStore);
    setIsAllProductsChecked(isAllChecked(checkedStore));
    setTotalCheck(checkedStore);
  };

  const handleCheckedStore = (storeId: number) => {
    const checkedStore = cartItems.map(
      (storeData: any) => {
        if (storeData.storeId === storeId) {
          const newStoreData = storeData;
          const checked = !newStoreData.storeIsChecked;
          newStoreData.storeIsChecked = checked;
          newStoreData.storeItems.map(
            (item: any) => {
              const newItem = item;
              if (newItem.isChecked !== checked) {
                if (checked) dispatch(checkCartItem(item.id));
                if (!checked) dispatch(uncheckCartItem(item.id));
              }
              newItem.isChecked = newStoreData.storeIsChecked;
              return newItem;
            },
          );
          return newStoreData;
        }
        return storeData;
      },
    );

    setCartItems(checkedStore);
    setIsAllProductsChecked(isAllChecked(checkedStore));
    setTotalCheck(checkedStore);
  };

  const handleCheckedItem = (id: number) => {
    const checkedItem = cartItems.map(
      (storeData: any) => {
        const newStoreData = storeData;
        newStoreData.storeItems.map(
          (item: any) => {
            if (item.id === id) {
              const newItem = item;
              const checked = !newItem.isChecked;
              newItem.isChecked = checked;
              if (checked) dispatch(checkCartItem(id));
              if (!checked) dispatch(uncheckCartItem(id));
              return newItem;
            }
            return item;
          },
        );
        newStoreData.storeIsChecked = isAllInStoreChecked(newStoreData.storeItems);
        return newStoreData;
      },
    );

    setCartItems(checkedItem);
    setIsAllProductsChecked(isAllChecked(checkedItem));
    setTotalCheck(checkedItem);
  };

  const updateAmount = async (id: number, amount: number) => {
    const val = {
      cart_item_id: id,
      current_quantity: amount,
    };
    await Carts.PatchCartItem(axiosPrivate, val)
      .then((res: any) => res)
      .catch((err: any) => err);
  };

  const handleAmount = (storeId: number, id: number, amount: any) => {
    let newAmount = parseInt(String(amount), 10);
    if (amount === '') {
      newAmount = 0;
    }
    const updatedStore = cartItems.map(
      (storeData: any) => {
        if (storeData.storeId === storeId) {
          const newStoreData = storeData;
          newStoreData.storeItems.map(
            (item: any) => {
              if (item.id === id) {
                if (
                  item.maxQuantity !== 0
                  && item.minQuantity !== 0
                ) {
                  if (
                    newAmount <= item.maxQuantity
                    && newAmount >= item.minQuantity
                    && newAmount <= item.stock
                  ) {
                    const newItem = item;
                    newItem.amount = newAmount;
                    updateAmount(id, newAmount).then();
                    return newItem;
                  }
                  if (newAmount > item.maxQuantity) {
                    toast.error(`Maksimum pembelian adalah ${item.maxQuantity}`);
                  }
                  if (newAmount < item.minQuantity) {
                    toast.error(`Minimum pembelian adalah ${item.minQuantity}`);
                  }
                  if (newAmount > item.stock) {
                    toast.error(`Tidak boleh melebihi stok. Stok tersisa adalah ${item.stock}`);
                  }
                }
                if (
                  item.maxQuantity === 0
                  && item.minQuantity === 0
                ) {
                  if (newAmount >= 1 && newAmount <= item.stock) {
                    const newItem = item;
                    newItem.amount = newAmount;
                    updateAmount(id, newAmount).then();
                    return newItem;
                  }
                }
              }
              return item;
            },
          );
          return newStoreData;
        }
        return storeData;
      },
    );

    setCartItems(updatedStore);
    setTotalCheck(updatedStore);
  };

  const splitCart = (items: any[]) => {
    let totalPricePromotion = 0;
    let totalPriceBase = 0;
    let totalProduct = 0;
    let allItemsChecked = true;
    let tempCart: any[] = [];
    for (let i = 0; i < items.length; i += 1) {
      const isSellerExist = tempCart.find(
        (el: any) => el.storeId === items[i].seller_id,
      );
      let isChecked = items[i].id === buyNow;
      if (checkedIDs.includes(items[i].id)) {
        isChecked = true;
        totalPriceBase += items[i].price_before_discount * items[i].quantity;
        totalProduct += items[i].quantity;
        totalPricePromotion += items[i].price_per_item * items[i].quantity;
      }
      if (allItemsChecked && !isChecked) { allItemsChecked = false; }
      const newItem = {
        id: items[i].id,
        name: items[i].product_name,
        slug: items[i].product_slug,
        variant: items[i].product_variant,
        imgUrl: items[i].image_url,
        pricePromotion: items[i].price_per_item,
        priceBase: items[i].price_before_discount,
        stock: items[i].stock,
        discount: items[i].discount_nominal,
        amount: items[i].quantity <= items[i].stock ? items[i].quantity : items[i].stock,
        minQuantity: items[i].stock >= items[i].min_quantity
          ? items[i].min_quantity
          : items[i].stock,
        maxQuantity: items[i].stock >= items[i].max_quantity
          ? items[i].max_quantity
          : items[i].stock,
        isChecked,
      };
      if (!isSellerExist) {
        const newSeller = {
          storeId: items[i].seller_id,
          storeName: items[i].seller_name,
          storeIsChecked: newItem.isChecked,
          storeItems: [newItem],
        };
        tempCart = [...tempCart, newSeller];
      }
      if (isSellerExist) {
        tempCart = tempCart.map(
          (element: any) => {
            if (element.storeId === items[i].seller_id) {
              const addedItems = [...element.storeItems, newItem];
              return {
                storeId: element.storeId,
                storeName: element.storeName,
                storeIsChecked: isAllInStoreChecked(addedItems),
                storeItems: addedItems,
              };
            }
            return element;
          },
        );
      }
    }

    if (allItemsChecked) setIsAllProductsChecked(true);
    setCartItems(tempCart);
    setIsAllProductsChecked(isAllChecked(tempCart));
    setTotalCheck(tempCart);
    setTotal({ totalPriceBase, totalProduct, totalPricePromotion });
  };

  const fetchCartItems = async () => {
    await Carts.GetCartItem(axiosPrivate)
      .then((resp: any) => {
        const allItems = resp.data.data.cart_items;
        splitCart(allItems);
      })
      .catch((err: any) => err);
  };

  const deleteItem = async (id: number) => {
    const val = {
      cart_item_id: id,
    };
    await Carts.DeleteCartItem(axiosPrivate, val)
      .then(() => {
        toast.success('Barang berhasil dihapus dari keranjang');
        fetchCartItems().then();
      })
      .catch(() => {
        toast.error('Barang gagal dihapus');
      });
  };

  const handleDeleteItem = (storeId: number, id: number) => {
    deleteItem(id).then(() => {
      dispatch(removeCartItem(id));
      dispatch(getCartItems());
    });
  };

  useEffect(() => {
    fetchCartItems().then();
  }, []);

  useEffect(() => {
    handleCheckedItem(buyNow);
  }, [buyNow]);

  return (
    <div className="cart_container">
      <div className="cart_content">
        <CardCartAll
          totalProduct={total.totalProduct}
          totalPricePromotion={total.totalPricePromotion}
          totalPriceBase={total.totalPriceBase}
          isAllProductsChecked={isAllProductsChecked}
          handleCheckedAllProducts={handleCheckedAllProducts}
        />
        <div className="cart_items">
          {
            cartItems.map(
              (item: any) => (
                <Card
                  key={`${item.storeId}-${item.storeName}`}
                  data={item}
                  cardType="cart"
                  handleCheckedStore={handleCheckedStore}
                  handleCheckedItem={handleCheckedItem}
                  handleDeleteItem={handleDeleteItem}
                  handleAmount={handleAmount}
                />
              ),
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Cart;
