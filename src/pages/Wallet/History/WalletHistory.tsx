import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import WalletHistoryRows from './WalletHistoryRows';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import Loading from '../../../components/Loading/Loading';
import ModalWalletTrxDetails from '../../../components/Modal/ModalWalletTrxDetails/ModalWalletTrxDetails';

const WalletHistory = () => {
  const axiosPrivate = useAxiosPrivate();
  const observer = useRef<any>();

  const [showModal, setShowModal] = useState(false);
  const [selectedTrx, setSelectedTrx] = useState<any>(null);

  const [trxs, setTrxs] = useState<any>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const hasNext = () => page < totalPage;

  const lastTrxRef = useCallback((node:any) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNext()) {
        setTimeout(() => {
          setPage((prevPage) => prevPage + 1);
        }, 50);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getWalletInfo = async () => {
      try {
        setLoading(true);
        const response = await axiosPrivate.get('/user/wallet/transactions', {
          signal: controller.signal,
          params: {
            limit: 4,
            page,
          },
        });
        const { data } = response.data;
        if (isMounted) {
          setTrxs((prevState:any) => [...prevState, ...data.transactions]);
          setTotalPage(data.total_page);
        }
        if (initialLoading) setInitialLoading(false);
      } catch (err) {
        toast.error('Gagal memuat transaksi');
      } finally {
        setLoading(false);
      }
    };
    getWalletInfo();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [page]);

  const selectTrx = (trx:any) => {
    setSelectedTrx(trx);
    setShowModal(true);
  };

  return (
    <div className="mini-w-screen mx-auto">
      {showModal && (
        <ModalWalletTrxDetails
          show={showModal}
          setShow={setShowModal}
          trx={selectedTrx}
        />
      )}
      <div className="mx-auto my-4 rounded bg-white shadow-sm rounded py-3 pb-1 wallet__history">
        <div className="px-4 mb-4 d-flex align-items-center gap-3">
          <div className="normal-link mb-2">
            <Link to="/wallet">
              <h3>&#8249;</h3>
            </Link>
          </div>
          <h4 className="mb-1">Wallet History</h4>
        </div>
        <div className="px-4 pt-1">
          <h6 className="text-start mb-4">Transactions</h6>
          {
            initialLoading
              ? (
                <Loading height={64} />
              )
              : (
                <WalletHistoryRows
                  trxs={trxs}
                  loading={loading}
                  innerRef={lastTrxRef}
                  selectTrx={selectTrx}
                />
              )
          }
        </div>
      </div>
    </div>
  );
};

export default WalletHistory;
