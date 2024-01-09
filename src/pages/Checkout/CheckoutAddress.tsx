import React, { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import locationIcon from '../../assets/svg/icon_location.svg';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Button from '../../components/Button/Button';

const CheckoutAddress:FC<any> = ({ selectedAddr, setSelectedAddr }) => {
  const axiosPrivate = useAxiosPrivate();
  const [addrs, setAddrs] = useState<any[]>([]);
  const [collapse, setCollapse] = useState(true);

  const hasAddress = () => addrs.length > 0;

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUserAddrs = async () => {
      try {
        const response = await axiosPrivate.get(
          '/user/profiles/addresses',
          {
            signal: controller.signal,
          },
        );
        const { data } = response.data;
        if (isMounted) {
          setAddrs(data);
          if (data.length > 0) setSelectedAddr(data[0]);
        }
      } catch (err) {
        toast.error('failed to fetch address data');
      }
    };
    getUserAddrs();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const toggleAddressList = () => {
    setCollapse((prevState) => !prevState);
  };

  const handleChangeAddr = (id:number) => {
    const newSelected = addrs.find((addr) => addr.id === id);
    setSelectedAddr(newSelected);
    toggleAddressList();
  };

  return (
    <div className="p-4 bg-white mb-3 address_container shadow-sm">
      <div className="d-flex gap-2 mb-2 px-2">
        <img src={locationIcon} alt="location" />
        <p className="fs-5 d-inline fw-bold">Alamat Pengiriman</p>
      </div>
      <div className="p-1 px-2 container row">
        <div className="col-2">
          <p className="py-2 px-1">Kirim Ke Alamat</p>
        </div>
        <div className="ms-auto col-8 px-0 address_selector">
          {hasAddress()
            ? (
              <p
                className="fs-6 py-2 border rounded px-2 mb-2 address_main"
                onClick={toggleAddressList}
              >
                {`${selectedAddr.address}, ${selectedAddr.province}, ${selectedAddr.sub_district}, ${selectedAddr.city}, ${selectedAddr.postal_code}`}
              </p>
            )
            : <p className="fs-6 py-2 border rounded px-2 mb-2 address_main text-secondary text-center">Belum ada alamat tersimpan!</p>}
          <div className={`border rounded p-1 address_options ${collapse ? 'address_options_collapse' : 'address_options_open'}`}>
            {addrs.map((addr) => (
              <div
                key={addr.id}
                className="fs-6 py-2 px-1 address_options_item"
                onClick={() => handleChangeAddr(addr.id)}
                role="presentation"
              >
                {`${addr.address}, ${addr.province}, ${addr.sub_district}, ${addr.city}, ${addr.postal_code}`}
              </div>
            ))}
          </div>
        </div>
        <div className="col-auto">
          <Button
            buttonType="primary alt"
            text="Ubah"
            handleClickedButton={toggleAddressList}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutAddress;
