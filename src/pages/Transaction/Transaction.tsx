import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Transactions from '../../api/transactions';
import './Transaction.scss';
import Loading from '../../components/Loading/Loading';
import { formatPriceWithCurrency } from '../../utils/product';
import Button from '../../components/Button/Button';

const Transaction = () => {
  const axiosPrivate = useAxiosPrivate();
  const [trxDetails, setTrxDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { trxID } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/user/order-history';

  const findTransactionByID = async () => {
    await Transactions.FindTransactionByID(axiosPrivate, trxID)
      .then((resp:any) => {
        setTrxDetails(resp.data.data);
      })
      .catch((err:any) => toast.error(err.response?.data?.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    findTransactionByID().then();
  }, []);

  return (
    <>
      {loading && <Loading height={72} />}
      {
        !loading && trxDetails && (
          <div className="trx__container">
            <div className="trx__header">
              <div>
                <h3 className="title">Detail Transaksi</h3>
                <p>{`No.pesanan ${trxDetails.id}`}</p>
              </div>
              <p>{trxDetails.created_at}</p>
            </div>
            <div className="trx__content">
              {/* { */}
              {/*  trxDetails.orders.map((order:any) => { */}
              {/*    <Order */}
              {/*  }) */}
              {/* } */}
              <div className="trx__payment">
                <div className="trx__item-full">
                  <span>Pembayaran dengan</span>
                  <span>{trxDetails.payment_method.toUpperCase()}</span>
                </div>
                <div className="trx__item-full">
                  <span>Voucher (SeaDeals)</span>
                  <span>
                    {trxDetails.voucher ? `${trxDetails.voucher?.code} ${trxDetails.voucher?.amount_type === 'percentage' ? `${trxDetails.voucher?.amount}%` : `${formatPriceWithCurrency(trxDetails.voucher?.amount)}`}` : 'Tidak ada voucher'}
                  </span>
                </div>
                <div className="trx__item-full">
                  <span>Total</span>
                  <span>{formatPriceWithCurrency(trxDetails.total)}</span>
                </div>
              </div>
              <div className="d-flex justify-content-end my-3">
                <Button
                  buttonType="primary alt"
                  handleClickedButton={() => navigate(from, { replace: true })}
                  text="Kembali"
                />
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};

export default Transaction;
