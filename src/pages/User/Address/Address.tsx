import React, { useEffect, useState } from 'react';
import '../UserPage.scss';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Button from '../../../components/Button/Button';
import Cities from '../../../api/cities';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

import './Address.scss';
import ModalNewAddress from '../../../components/Modal/ModalNewAddress/ModalNewAddress';
import ModalEditAddress from '../../../components/Modal/ModalEditAddress/ModalEditAddress';

const Address = () => {
  const uRL = '/user/profiles/addresses';
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [cityId, setCityId] = useState('152');
  const [provinceId, setProvinceId] = useState('6');
  const [type, setType] = useState('Kota');
  const [subDistrict, setSubDistrict] = useState('');
  const [province, setProvince] = useState('DKI Jakarta');
  const [city, setCity] = useState('Jakarta Selatan');
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');
  const [newPostalCode, setNewPostalCode] = useState('');
  const [newAddress, setNewAddress] = useState('');

  const [addressId, setAddressId] = useState<any>('');
  const [prevStateAID, setPrevStateAID] = useState<any>('');

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setTimeout(() => {
      setShow(false);
    }, 500);
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const handleShowEditModal = () => setShowEditModal(true);

  const [provinces, setProvinces] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  const getAllProvince = async () => {
    await Cities.GetAllCities()
      .then((resp) => {
        const res = resp.data;
        let provinceIds: any[] = [];
        let provincesValues: any[] = [];
        for (let i = 0; i < res.length; i += 1) {
          const p = {
            province_id: res[i].province_id,
            province_name: res[i].province,
          };
          if (!provinceIds.includes(p.province_id)) {
            provinceIds = [...provinceIds, p.province_id];
            provincesValues = [...provincesValues, p];
          }
        }
        setProvinces(provincesValues);
      })
      .catch((err) => err);
  };

  const getCities = async () => {
    await Cities.GetAllCities()
      .then((resp) => {
        const res = resp.data;
        let values: any[] = [];
        for (let i = 0; i < res.length; i += 1) {
          const c = {
            province_id: res[i].province_id,
            province_name: res[i].province,
            city_id: res[i].city_id,
            city_name: res[i].city_name,
            type: res[i].type,
            isChecked: false,
          };
          if (province === c.province_name) {
            values = [...values, c];
          }
        }
        setCities(values);
      })
      .catch((err) => err);
  };

  const getProvinceId = (p:string) => {
    for (let i = 0; i < provinces.length; i += 1) {
      if (provinces[i].province_name === p) {
        return provinces[i].province_id;
      }
    }
    return 0;
  };

  const getCityId = (p:string) => {
    for (let i = 0; i < cities.length; i += 1) {
      if (cities[i].city_name === p) {
        return cities[i].city_id;
      }
    }
    return 0;
  };

  const getCityType = (p:string) => {
    for (let i = 0; i < cities.length; i += 1) {
      if (cities[i].city_name === p) {
        return cities[i].type;
      }
    }
    return '';
  };

  const [addresses, setAddresses] = useState<any[]>([]);
  const [mainAddress, setMainAddress] = useState<any>('');
  const getAddresses = async () => {
    try {
      const res = await axiosPrivate.get(
        uRL,
        {
          withCredentials: true,
        },
      );
      setAddresses(res.data.data);
    } catch (err) {
      navigate('/user', { replace: true });
    }
  };

  useEffect(() => {
    if (province !== '') {
      getCities().then();
      setCity(province);
      setCityId(getCityId(province));
      setType(getCityType(province));
    }
  }, [province]);

  useEffect(() => {
    if (cities.length > 0) {
      setCity(cities[0].city_name);
      setCityId(cities[0].city_id);
      setType(cities[0].type);
    }
  }, [cities]);

  const [resetAddressStatus, setResetAddressStatus] = useState<any>(false);

  const resetMainAddress = () => {
    if (addresses.length > 0) {
      for (let addressCount = 0; addressCount < addresses.length; addressCount += 1) {
        if (addresses[addressCount].is_main) {
          setMainAddress(addresses[addressCount]);
          setResetAddressStatus(false);
        }
      }
    }
  };

  useEffect(() => {
    getAllProvince().then();
    getAddresses().then();
  }, []);

  useEffect(() => {
    for (let addressCount = 0; addressCount < addresses.length; addressCount += 1) {
      if (addresses[addressCount].is_main) {
        setMainAddress(addresses[addressCount]);
      }
    }
  }, [addresses]);

  const handleSubmit = () => {
    try {
      axiosPrivate.post(
        uRL,
        JSON.stringify({
          province_id: provinceId,
          province,
          city_id: cityId,
          type,
          city,
          postal_code: postalCode,
          sub_district: subDistrict,
          address,
        }),
      ).then((r) => r);
      setShow(false);
      setResetAddressStatus(true);
    } catch (err) {
      navigate('/user', { replace: true });
    }
  };

  useEffect(() => {
    if (addressId !== prevStateAID) {
      const accessToken:any = localStorage.getItem('access_token');
      const decode:any = jwt_decode(accessToken);
      const userId = decode.user.user_id;
      try {
        axiosPrivate.patch(
          `${uRL}/${addressId.toString()}`,
          JSON.stringify({
            id: Number(addressId),
            zipcode: postalCode,
            sub_district_id: 0,
            address,
            user_id: userId,
          }),
        ).then((r) => r);
        setShow(false);
        setPrevStateAID(addressId);
        setResetAddressStatus(true);
      } catch (err) {
        navigate('/user', { replace: true });
      }
    }
  }, [addressId]);

  const [newAddressId, setNewAddressId] = useState<any>('');
  const [prevStateNewAID, setPrevStateNewAID] = useState<any>('');

  const handleCloseEditModal = () => {
    setTimeout(() => {
      setShowEditModal(false);
      setNewAddressId('');
    }, 500);
  };

  const handleSubmitEditForm = () => {
    const accessToken:any = localStorage.getItem('access_token');
    const decode:any = jwt_decode(accessToken);
    const userId = decode.user.user_id;
    try {
      axiosPrivate.patch(
        `${uRL}`,
        JSON.stringify({
          id: Number(newAddressId),
          postal_code: newPostalCode,
          sub_district_id: 0,
          address: newAddress,
          user_id: Number(userId),
        }),
      ).then((r) => r);
      setPrevStateNewAID(newAddressId);
      setShowEditModal(false);
      setResetAddressStatus(true);
    } catch (err) {
      navigate('/user', { replace: true });
    }
    setNewAddressId('');
    setPrevStateNewAID('');
    setNewAddress('');
    setNewPostalCode('');
  };

  useEffect(() => {
    getAddresses().then();
    resetMainAddress();
    getAddresses().then();
  }, [resetAddressStatus]);

  useEffect(() => {
    if (newAddressId !== prevStateNewAID) {
      handleShowEditModal();
    }
  }, [newAddressId]);

  const handleSelectProvince = (e: any) => {
    setProvince(e.target.value);
    setProvinceId(getProvinceId(e.target.value));
  };

  const handleSelectCity = (e: any) => {
    setCity(e.target.value);
    setCityId(getCityId(e.target.value));
    setType(getCityType(e.target.value));
  };

  return (
    <div className="address_container">
      <div className="address_content">
        <div className="header">
          <h5 className="title">Alamat Saya</h5>
          <Button
            buttonType="primary"
            text="Tambah alamat"
            handleClickedButton={handleShow}
          />
        </div>
        {
          show
          && (
            <ModalNewAddress
              isOpen={show}
              subDistrict={subDistrict}
              postalCode={postalCode}
              address={address}
              cities={cities}
              city={city}
              provinces={provinces}
              province={province}
              handleSelectCity={handleSelectCity}
              handleSelectProvince={handleSelectProvince}
              handleCloseModal={handleClose}
              handleInputSubDistrict={(e: any) => setSubDistrict(e.target.value)}
              handleInputPostalCode={(e: any) => setPostalCode(e.target.value)}
              handleInputAddress={(e: any) => setAddress(e.target.value)}
              handleSubmit={handleSubmit}
            />
          )
        }
        {
          showEditModal
          && (
            <ModalEditAddress
              isOpen={showEditModal}
              newPostalCode={newPostalCode}
              newAddress={newAddress}
              handleNewPostalCode={(e: any) => setNewPostalCode(e.target.value)}
              handleNewAddress={(e: any) => setNewAddress(e.target.value)}
              handleCloseModal={handleCloseEditModal}
              handleSubmit={handleSubmitEditForm}
            />
          )
        }
        {
          addresses.length > 0
          && (
            <div className="children">
              <div className="child row">
                <div className="contents row">
                  <div className="order col-2">
                    Alamat utama
                  </div>
                  <div className="left-side col-8">
                    {mainAddress.province}
                    {', '}
                    {mainAddress.city}
                    {', '}
                    {mainAddress.sub_district}
                    {', '}
                    {mainAddress.postal_code}
                    <br />
                    {mainAddress.address}
                  </div>
                  <div className="right-side col-2">
                    <p role="presentation" className="clickable" onClick={() => setNewAddressId(mainAddress.id)}>
                      Edit
                    </p>
                  </div>
                </div>
              </div>
              {
                addresses.map(
                  (a:any) => (
                    !a.is_main
                    && (
                      <div className="child row" key={a.id}>
                        <div className="contents row">
                          <div className="order col-2" />
                          <div className="left-side col-8">
                            {a.province}
                            {', '}
                            {a.city}
                            {', '}
                            {a.sub_district}
                            {', '}
                            {a.postal_code}
                            <br />
                            {a.address}
                          </div>
                          <div className="right-side col-2">
                            <p role="presentation" className="clickable" onClick={() => setAddressId(a.id)}>
                              Jadikan utama
                            </p>
                            <p role="presentation" className="clickable" onClick={() => setNewAddressId(a.id)}>
                              Edit
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  ),
                )
              }
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Address;
