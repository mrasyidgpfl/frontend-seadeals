import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import WalletTrxItem from './WalletTrxItem';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const WalletTrxItems:FC<any> = () => {
  const axiosPrivate = useAxiosPrivate();
  const [trxs, setTrxs] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getTrxs = async () => {
      try {
        const response = await axiosPrivate.get('user/wallet/transactions?limit=3', {
          signal: controller.signal,
        });
        const { data } = response.data;
        if (isMounted) {
          setTrxs(data.transactions);
        }
      } catch (err) {
        toast.error('Failed to Fetch Wallet Transactions');
      }
    };
    getTrxs();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="mx-auto my-4 rounded bg-white shadow-sm rounded">
      <div className="px-4 py-3">
        <div className="d-flex justify-content-between">
          <h5 className="mb-0 fw-bold">Riwayat Transaksi</h5>
          <small className="">Last 3 Transactions</small>
        </div>
      </div>
      <div className="text-center normal-link">
        {trxs?.length > 0
          ? (
            <>
              {trxs.map((trx:any) => <WalletTrxItem key={trx.id} trxItem={trx} />)}
            </>
          )
          : (
            <div className="p-4 fs-5 border-top">
              <small className="text-secondary">No Transactions Yet!</small>
            </div>
          )}
      </div>
      <div className="border-top py-2 text-center fs-6">
        <Link to="/wallet/history">
          <small className="text-secondary">Transaksi Lainnya &nbsp; &#8250;</small>
        </Link>
      </div>
    </div>
  );
};

export default WalletTrxItems;
