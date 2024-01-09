import React, { useEffect, useState } from 'react';
import './WalletTopup.scss';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import isWalletPINSet from '../../../utils/isWalletPINSet';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import WalletHeader from '../WalletHeader';
import formatCardNumber from '../../../utils/walletFormatter';
import { formatPrice } from '../../../utils/product';
import LoadingPlain from '../../../components/Loading/LoadingPlain';
import SLPIframe from '../Iframe/SLPIframe';
import useWalletStatus from '../../../hooks/useWalletStatus';

const WalletTopup = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { loadingIsBlocked, isBlocked } = useWalletStatus();

  const [SLPAccounts, setSLPAccounts] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>();
  const [amount, setAmount] = useState <any>('');

  const [loading, setLoading] = useState(false);
  const [SLPUrl, setSLPUrl] = useState('');
  const [collapse, setCollapse] = useState(true);

  useEffect(() => {
    const getWalletInfo = async () => {
      try {
        const response = await axiosPrivate.get('user-wallet');
        const { data } = response.data;

        if (!isWalletPINSet(data.status)) {
          toast.error('Anda harus mengatur PIN untuk melakukan transaksi.');
          navigate('/wallet/settings');
          return;
        }
      } catch (err) {
        toast.error('Failed to Fetch User Wallet Info');
      }
    };
    getWalletInfo();
  }, []);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getSLPAccounts = async () => {
      try {
        const response = await axiosPrivate.get('user/sea-labs-pay', {
          signal: controller.signal,
        });
        let { data } = response.data;
        data = data.sort((x:any) => (x.is_main ? -1 : 0));
        if (isMounted) {
          setSLPAccounts(data);
          setSelected(data[0]);
        }
      } catch (err) {
        if (isMounted) toast.error('Failed to Fetch Connected SeaLabsPay Accounts');
      }
    };
    getSLPAccounts();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!loadingIsBlocked && isBlocked) {
      toast.error('Your Wallet is Currently Blocked.');
      navigate('/wallet');
    }
  });

  const requestTopup = async () => {
    if (!selected) {
      toast.error('register a sealabs pay account to top up');
      return;
    }

    try {
      setLoading(true);
      const response = await axiosPrivate.post(
        '/user/wallet/top-up/sea-labs-pay',
        JSON.stringify({ amount, account_number: selected.account_number }),
      );
      setSLPUrl(response.data?.data?.redirect_url);
    } catch (err:any) {
      toast.error(err.response.data.message || 'error requesting top up');
    } finally {
      setLoading(false);
    }
  };

  const changeSelected = (id:number) => {
    const newSelected = SLPAccounts.find((account) => account.id === id);
    const newList = [newSelected, ...SLPAccounts.filter((account) => account.id !== id)];
    setSelected(newSelected);
    setSLPAccounts(newList);
    setCollapse((prevState) => !prevState);
  };

  return (
    <div className="mini-w-screen mx-auto">
      <div className="mx-auto my-4 rounded bg-light shadow-sm rounded pt-5">
        <WalletHeader backToUrl="/wallet" text="Top Up" />
        <div className="px-4">
          {SLPUrl
            ? (
              <div className="px-2 pb-4">
                <div className="p-3 py-2 mb-4 rounded border bg-white d-flex justify-content-between">
                  <div>
                    <small>Akun:</small>
                    <p className="fw-bold fs-5">{selected.name}</p>
                  </div>
                  <div className="text-end">
                    <small>Jumlah:</small>
                    <p className="fw-bold">
                      Rp
                      {formatPrice(amount)}
                    </p>
                  </div>
                </div>
                <SLPIframe url={SLPUrl} />
              </div>
            )
            : (
              <>
                <div className="p-2 mb-4">
                  <p className="fs-5 fw-bold mb-2">Top Up dari Akun:</p>
                  {
                    SLPAccounts.length > 0
                      ? (
                        <div className={`mb-2 slp-transition ${collapse ? 'slp-list-close' : 'slp-list-open'}`}>
                          {SLPAccounts.map((account:any) => (
                            <button
                              key={account.id}
                              type="button"
                              className="p-2 border rounded mb-2 w-100 text-start bg-white"
                              onClick={() => changeSelected(account.id)}
                            >
                              <p className="fs-5 fw-bold mb-1">{account.name}</p>
                              <code className="text-dark fs-6">{formatCardNumber(account.account_number)}</code>
                            </button>
                          ))}
                        </div>
                      )
                      : (
                        <div className="p-2 border rounded mb-2 w-100 text-start bg-white">
                          <p className="fs-5 fw-bold">Belum Ada Akun SeaLabs Pay!</p>
                        </div>
                      )
                  }
                  <button
                    type="button"
                    className="float-end text-end bg-light rounded"
                    onClick={() => { setCollapse((prevState) => !prevState); }}
                  >
                    <small>Pilih Akun Lain</small>
                  </button>
                </div>
                <div className="p-2">
                  <p className="fs-5 fw-bold mb-2">Jumlah Top Up:</p>
                  <input
                    className="p-2 fs-4 border rounded mb-2 w-100 text-start mb-4"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.valueAsNumber)}
                  />
                  <button
                    type="button"
                    className={`bg-main p-2 text-white w-100 rounded mb-3 ${!selected && 'bg-darkgray'}`}
                    disabled={!selected}
                    onClick={() => requestTopup()}
                  >
                    Selanjutnya
                  </button>
                  <div className="d-flex justify-content-center">
                    {loading && <LoadingPlain height={56} />}
                  </div>
                </div>
              </>
            )}

          {/* {SLPAccounts.map((account) => ( */}
          {/*    <button type="button" className="p-2 border rounded mb-2 w-100 text-start"> */}
          {/*      <p className="fs-5 fw-bold">{account?.name}</p> */}
          {/*      <code className="text-dark fs-6">
          {formatCardNumber(account?.account_number)}</code> */}
          {/*    </button> */}
          {/* ))} */}

        </div>
      </div>
    </div>
  );
};

export default WalletTopup;
