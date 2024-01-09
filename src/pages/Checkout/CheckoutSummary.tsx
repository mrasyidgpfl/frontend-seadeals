import React, { FC } from 'react';
import Button from '../../components/Button/Button';
import { formatPrice } from '../../utils/product';
import LoadingAmount from './LoadingAmount';
import { getDiscountDisplay, getDiscountNominal } from '../../utils/CartCheckoutHelper';

interface Props {
  fullTotal: number,
  subtotal: number,
  deliveryTotal: number,
  handleClick: ()=>void,
  loadingPredict: boolean,
  globalVoucher: any,
  checkoutDisabled: boolean,
}

const CheckoutSummary:FC<Props> = ({
  fullTotal, subtotal = 0, deliveryTotal = 0,
  handleClick, checkoutDisabled, loadingPredict, globalVoucher,
}) => (
  <div className="bg-white shadow-sm mb-3 fw-bold">
    <div className="p-4 border-bottom-dashed border-top text-secondary">
      <div className="row justify-content-end py-1">
        <p className="col-3">Subtotal untuk Produk</p>
        <div className="col-2 text-end">
          {loadingPredict ? <LoadingAmount /> : `Rp ${formatPrice(subtotal)}`}
        </div>
      </div>
      <div className="row justify-content-end py-1">
        <p className="col-3">Total Ongkos Kirim:</p>
        <div className="col-2 text-end">
          {loadingPredict ? <LoadingAmount /> : `Rp ${formatPrice(deliveryTotal)}`}
        </div>
      </div>
      {
        globalVoucher.id
          && (
          <div className="row justify-content-end py-2 text-dark">
            <div className="col-3">
              <p>Diskon SeaDeals:</p>
              <small>{getDiscountDisplay(globalVoucher)}</small>
            </div>
            <div className="col-2 text-end text-main">
              {loadingPredict ? <LoadingAmount /> : `- Rp ${getDiscountNominal(globalVoucher, subtotal)}`}
            </div>
          </div>
          )
      }
      <div className="row justify-content-end py-3 fs-5 text-dark">
        <p className="col-3">Total Pembayaran:</p>
        <div className="col-2 text-end">
          {loadingPredict ? <LoadingAmount /> : `Rp ${formatPrice(fullTotal)}`}
        </div>
      </div>
    </div>
    <div className="p-4 d-flex justify-content-end bg-light">
      <Button
        buttonType={`secondary ${checkoutDisabled && 'disabled'}`}
        text="Buat Pesanan"
        handleClickedButton={handleClick}
      />
    </div>
  </div>
);

export default CheckoutSummary;
