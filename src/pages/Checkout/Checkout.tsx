import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import {
  calculateDeliveryTotalTrx,
  calculateSubtotalTrx, generateCheckoutPayload,
  groupBySeller, orderIsIncomplete,
  parseCartItemsToPayload,
  setCourierOptionToStore, setVoucherToStore,
} from '../../utils/CartCheckoutHelper';
import CardCheckout from '../../components/Cards/CardCheckout/CardCheckout';
import CheckoutAddress from './CheckoutAddress';
import CheckoutVoucher from './CheckoutVoucher';
import './Checkout.scss';
import CheckoutSummary from './CheckoutSummary';
import ModalPayment from '../../components/Modal/ModalPayment/ModalPayment';
import PAYMENT_TYPE from '../../constants/payment';

const Checkout = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { checkedIDs } = useSelector((store:any) => store.cart);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [sellerProducts, setSellerProducts] = useState([]);
  const [cartPerStore, setCartPerStore] = useState<any[]>([]);
  const [selectedAddr, setSelectedAddr] = useState<any>({});
  const [selectedGlobalVoucher, setSelectedGlobalVoucher] = useState<any>({});

  const [subtotal, setSubtotal] = useState(0);
  const [deliveryTotal, setDeliveryTotal] = useState(0);

  const [predictedPrices, setPredictedPrices] = useState<any[]>([]);
  const [predictedTotal, setPredictedTotal] = useState(0);
  const [loadingPredict, setLoadingPredict] = useState(false);

  const [checkoutDisabled, setCheckoutDisabled] = useState(true);

  useEffect(() => {
    if (orderIsIncomplete(cartPerStore)) return;
    if (!selectedAddr.id) {
      navigate('/user/profile');
      toast.error('Anda perlu mengatur alamat terlebih dahulu');
      return;
    }

    const predictPrice = async () => {
      toast.dismiss();
      toast.loading('Menghitung Total');
      setLoadingPredict(true);

      const globalVoucher = selectedGlobalVoucher?.code || '';

      try {
        const response = await axiosPrivate.post(
          '/predicted-price',
          JSON.stringify(generateCheckoutPayload(
            cartPerStore,
            PAYMENT_TYPE.WALLET,
            globalVoucher,
            '',
            selectedAddr.id,
          )),
        );
        const { data } = response.data;
        setPredictedPrices(data.predicted_prices || []);
        setPredictedTotal(data.total_predicted_price);
        setSubtotal(calculateSubtotalTrx(data.predicted_prices || []));
        setDeliveryTotal(calculateDeliveryTotalTrx(data.predicted_prices || []));
        toast.dismiss();
        setLoadingPredict(false);
      } catch (e:any) {
        toast.dismiss();
        toast.error(e.response);
      }
    };
    predictPrice();
  }, [cartPerStore, selectedAddr, selectedGlobalVoucher]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getCartItems = async () => {
      try {
        const response = await axiosPrivate.get(
          '/user/cart',
          {
            signal: controller.signal,
          },
        );
        const { data } = response.data;

        if (data.cart_items.length === 0) {
          toast.error('Anda belum memasukkan barang di keranjang!');
          navigate('/cart');
          return;
        }

        if (isMounted) {
          const cartItems = data.cart_items.filter((item:any) => checkedIDs.includes(item.id));
          const groupedBySeller = groupBySeller(cartItems);

          if (cartItems.length === 0) {
            toast.error('Anda belum memilih barang!');
            navigate('/cart');
            return;
          }

          setSellerProducts(groupedBySeller);
          setCartPerStore(parseCartItemsToPayload(groupedBySeller));
        }
      } catch (err:any) {
        toast.error('Gagal memuat data pesanan');
      }
    };
    getCartItems();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const hasSelectedAddr = () => !!selectedAddr.id;

  useEffect(() => {
    setCheckoutDisabled(!hasSelectedAddr() || loadingPredict || orderIsIncomplete(cartPerStore));
  }, [selectedAddr, loadingPredict, cartPerStore]);

  const handleClickOrder = () => {
    if (loadingPredict) return;

    if (!hasSelectedAddr()) {
      toast.error('Anda perlu menyimpan Alamat Kirim');
      return;
    }
    if (orderIsIncomplete(cartPerStore)) {
      toast.error('Anda perlu memilih Jasa Kurir');
      return;
    }
    if (sellerProducts.length === 0) return;

    setIsModalOpen(true);
  };

  const updateOrderDelivery = (courierID:number, sellerID:number) => {
    setCartPerStore((prevState) => setCourierOptionToStore(courierID, sellerID, prevState));
  };

  const updateOrderVoucher = (code:string, sellerID: number) => {
    setCartPerStore((prevState) => setVoucherToStore(code, sellerID, prevState));
  };

  return (
    <>
      {isModalOpen
          && (
          <ModalPayment
            isOpen={isModalOpen}
            orderItems={cartPerStore}
            handleCloseModal={() => setIsModalOpen(false)}
            total={predictedTotal}
            address={selectedAddr}
            globalVoucher={selectedGlobalVoucher}
          />
          )}
      <div className="w-75 mx-auto">
        <div className="px-4 mx-auto mt-3">
          <CheckoutAddress selectedAddr={selectedAddr} setSelectedAddr={setSelectedAddr} />
          {sellerProducts.map((sellerProduct:any) => {
            const predictedStore = predictedPrices.find(
              (prediction) => prediction.seller_id === sellerProduct.storeID,
            );
            return (
              <CardCheckout
                loadingPredict={loadingPredict}
                predictedStore={predictedStore}
                key={sellerProduct.storeID}
                data={sellerProduct}
                updateDelivery={updateOrderDelivery}
                updateVoucher={updateOrderVoucher}
              />
            );
          })}
          <CheckoutVoucher
            selectedGlobalVoucher={selectedGlobalVoucher}
            updateGlobalVoucher={setSelectedGlobalVoucher}
            subtotal={subtotal}
          />
          <CheckoutSummary
            loadingPredict={loadingPredict}
            fullTotal={predictedTotal}
            subtotal={subtotal}
            deliveryTotal={deliveryTotal}
            globalVoucher={selectedGlobalVoucher}
            handleClick={() => handleClickOrder()}
            checkoutDisabled={checkoutDisabled}
          />
        </div>
      </div>
    </>
  );
};

export default Checkout;
