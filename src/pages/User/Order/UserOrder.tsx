import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Receipt } from '../../../constants/orderItem';
import useAxiosPrivateWithoutNavigate from '../../../hooks/useAxiosPrivateWithoutNavigate';
import UserOrderShipping from './UserOrderShipping';
import UserOrderDetails from './UserOrderDetails';
import './UserOrder.scss';
import UserOrderHeader from './UserOrderHeader';

const UserOrder = () => {
  const { id } = useParams();

  const [receiptLoading, setReceiptLoading] = useState<boolean>(true);
  const [loadingOrder, setLoadingOrder] = useState(true);

  const [receipt, setReceipt] = useState<Receipt>({
    buyer: { address: '', bought_date: '', name: '' },
    courier: { name: '', service: '' },
    order_detail: {
      delivery_price: 0,
      order_items: [],
      shop_voucher: {
        amount: 0, name: '', total_reduce: 0, type: '',
      },
      global_voucher_for_order: {
        amount: 0, name: '', total_reduce: 0, type: '',
      },
      total: 0,
      total_order: 0,
      total_quantity: 0,
    },
    payment_method: '',
    seller_name: '',
    transaction: {
      global_discount: [{
        amount: 0, name: '', seller_name: '', total_reduced: 0, type: '',
      }],
      order_payments: [],
      total: 0,
      total_transaction: 0,
    },
  });
  const [order, setOrder] = useState<any>(null);

  const axiosPrivate = useAxiosPrivateWithoutNavigate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getReceipt = async () => {
      try {
        const response = await axiosPrivate.get(`user/orders/receipt/${id}`, {
          signal: controller.signal,
        });
        const result = response.data;
        if (isMounted) {
          setReceiptLoading(false);
          setReceipt(result.data);
        }
      } catch (err) {
        toast.error('Gagal Memuat Receipt Order');
      }
    };
    const getOrder = async () => {
      try {
        const response = await axiosPrivate.get(`user/order/${id}`, {
          signal: controller.signal,
        });
        const result = response.data;
        if (isMounted) {
          setLoadingOrder(false);
          setOrder(result.data);
        }
      } catch (err) {
        toast.error('Gagal Memuat Order');
      }
    };
    getReceipt().then();
    getOrder().then();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  if (receiptLoading || loadingOrder) return <div>Loading...</div>;

  return (
    <div className="w-100">
      <UserOrderHeader trxID={order?.transaction_id} />
      <UserOrderShipping order={order} receipt={receipt} />
      <UserOrderDetails order={order} />
    </div>
  );
};

export default UserOrder;
