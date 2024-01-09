import React, { useEffect, useState } from 'react';
import './CardCheckout.scss';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import CardCheckoutItem from './CardCheckoutItem';
import Button from '../../Button/Button';
import SelectVoucher from '../../Modal/ModalCheckoutOptions/SelectVoucher';
import SelectCourier from '../../Modal/ModalCheckoutOptions/SelectCourier';
import formatTitle from '../../../utils/titleFormatter';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { getDiscountNominal, parseDiscountAmount } from '../../../utils/CartCheckoutHelper';
import { formatPrice } from '../../../utils/product';
import useSellerDeliveryOptions from '../../../hooks/useSellerDeliveryOptions';
import LoadingAmount from '../../../pages/Checkout/LoadingAmount';

type CardCheckoutProps = {
  data: {
    storeID: number;
    storeName: string;
    storeItems: any[];
  },
  updateDelivery: (courierID:number, sellerID:number) => void,
  updateVoucher: (code: string, sellerID: number) => void,
  loadingPredict: boolean,
  predictedStore: any;
};

const CardCheckout = (props: CardCheckoutProps) => {
  const axiosPrivate = useAxiosPrivate();

  const {
    data, updateDelivery, updateVoucher, loadingPredict, predictedStore,
  } = props;

  const {
    storeID,
    storeName,
    storeItems,
  } = data;

  const { loadingCouriers, couriers } = useSellerDeliveryOptions(storeID);

  const [storeTotal, setStoreTotal] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  // const [deliveryCost, setDeliveryCost] = useState(20000);

  const [showVoucher, setShowVoucher] = useState(false);
  const [showCouriers, setShowCouriers] = useState(false);

  // selected voucher & courier
  const [voucher, setVoucher] = useState<any>(null);
  const [voucherCode, setVoucherCode] = useState('');
  const [courier, setCourier] = useState<any>(null);

  useEffect(() => { // set first available courier as default
    if (couriers.length > 0) {
      const firstCourier = couriers[0].courier;
      setCourier(firstCourier);
      updateDelivery(firstCourier.id, storeID);
    }
  }, [couriers]);

  useEffect(() => {
    const total = storeItems.reduce(
      (previousValue, currentValue) => previousValue + currentValue.subtotal,
      0,
    );

    setStoreTotal(total);
  }, []);

  useEffect(() => {
    let total = storeItems.reduce(
      (previousValue, currentValue) => previousValue + currentValue.subtotal,
      0,
    );
    if (voucher) {
      total -= getDiscountNominal(voucher, total);
    }
    setFinalTotal(total);
  }, [courier, voucher]);

  const handleChangeCourier = (courierData:any) => {
    setCourier(courierData);
    updateDelivery(courierData.id, storeID);
    setShowCouriers(false);
  };

  const handleChangeVoucher = (voucherData: any) => {
    setVoucher(voucherData);
    setVoucherCode(voucherData.code);
    setShowVoucher(false);
    updateVoucher(voucherData.code, storeID);
  };

  const onChangeVoucherCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVoucherCode(e.target.value);

    if (voucher === null) return;
    setVoucher(null);
    updateVoucher('', storeID);
  };

  const checkVoucherValid = async () => {
    if (voucherCode.length === 0) {
      toast.error('Masukkan kode voucher terlebih dahulu');
      return;
    }
    if (voucher) return;
    try {
      const response = await axiosPrivate.post(
        '/validate-voucher',
        JSON.stringify({ seller_id: storeID, code: voucherCode, spend: storeTotal }),
      );
      const { data: voucherData } = response;
      setVoucher(voucherData.data);
      updateVoucher(voucherData.data.code, storeID);
    } catch (e:any) {
      const { data: errorData } = e.response;
      toast.error(errorData.message);
    }
  };

  return (
    <div className="card_cart_container mb-3">
      {showVoucher && (
      <SelectVoucher
        total={finalTotal}
        sellerID={storeID}
        show={showVoucher}
        setShow={setShowVoucher}
        setVoucher={handleChangeVoucher}
        selectedID={voucher?.id || 0}
      />
      )}
      {showCouriers && (
      <SelectCourier
        couriers={couriers}
        loadingCouriers={loadingCouriers}
        show={showCouriers}
        setShow={setShowCouriers}
        selectedID={courier?.id || 0}
        selectCourier={handleChangeCourier}
      />
      )}
      <div className="card_cart_content">
        <div className="header">
          <div className="header_name">
            <div className="normal-link">
              <Link to={`/toko/${storeID}`}>
                <p className="name">{ storeName }</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="items_content">
          {storeItems.map(
            (item) => (
              <CardCheckoutItem
                key={`${item.id}-${item.name}`}
                data={item}
              />
            ),
          )}
        </div>
        <div className="store_options items_content border-top-dashed d-flex justify-content-between align-items-center">
          <p>Opsi Pengiriman:</p>
          <div className="row w-75 align-items-center">
            <p className="fw-bold col-6 text-center">{courier ? formatTitle(courier.name) : 'Belum Ada Kurir'}</p>
            <div className="col-2 d-flex justify-content-center">
              <Button text="Ubah" buttonType="plain w-auto p-2 text-secondary-blue" handleClickedButton={() => setShowCouriers(true)} />
            </div>
            <div className="col-4 text-end">
              {loadingPredict ? <LoadingAmount /> : `Rp ${formatPrice(predictedStore?.delivery_price || 0)}`}
            </div>
          </div>
        </div>
        <div className="store_options items_content border-top-dashed d-flex justify-content-between align-items-center">
          <p>Voucher Toko:</p>
          <div className="row w-75 align-items-center">
            <div className="fw-bold col-6 text-center d-flex gap-2">
              <input className="border p-1 w-75" value={voucherCode} onChange={onChangeVoucherCode} />
              <Button
                text="Gunakan"
                buttonType={`primary p-2 rounded-0 ${!!voucher && 'disabled'}`}
                handleClickedButton={() => checkVoucherValid()}
              />
            </div>
            <div className="col-2 d-flex justify-content-center">
              <Button
                text="Pilih"
                buttonType="plain w-auto p-2 text-secondary-blue"
                handleClickedButton={() => setShowVoucher(true)}
              />
            </div>
            <div className="ms-auto col-auto text-end text-break">
              {loadingPredict ? <LoadingAmount /> : parseDiscountAmount(voucher, storeTotal)}
            </div>
          </div>
        </div>
        <div className="store_options items_content border-top-dashed d-flex justify-content-end gap-5">
          <p>Total Pesanan:</p>
          <div className="fw-bold">
            {loadingPredict ? <LoadingAmount /> : `Rp ${formatPrice(predictedStore?.predicted_price || 0)}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCheckout;
