import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { v4 } from 'uuid';
import {
  deleteObject, getDownloadURL, ref, uploadBytes,
} from 'firebase/storage';
import Modal from '../Modal';
import Button from '../../Button/Button';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import storage from '../../../firebase/firebase';

import './ComplaintModal.scss';
import '../../Cards/CardOrderHistory/CardOrderHistory.scss';
import Orders from '../../../api/orders';
import CardOrderHistoryItem from '../../Cards/CardOrderHistory/CardOrderHistoryItem';
import { formatPrice } from '../../../utils/product';

type ModalComplaintProps = {
  data: {
    orderId: number,
    storeName: string,
    transaction:any,
    storeItems: any[],
  },
  title: string,
  isOpen: boolean,
  handleCloseModal: () => void;
  refreshData: ()=>void,
};

const ModalComplaint = (props: ModalComplaintProps) => {
  const {
    data,
    isOpen,
    title,
    handleCloseModal,
    refreshData,
  } = props;

  const {
    orderId,
    storeName,
    storeItems,
  } = data;

  const axiosPrivate = useAxiosPrivate();
  const imageInputRef = useRef<any>();

  const [complaint, setComplaint] = useState<any>({});
  const [open, setOpen] = useState(isOpen);
  const [complaintPhoto, setComplaintPhoto] = useState<any>([]);

  const handleImageChange = (e:any) => {
    e.preventDefault();
    if (complaintPhoto.length > 5) {
      return;
    }
    const [file] = e.target.files;
    // In MegaByte
    if ((file.size / 1024 / 1024) > 2) {
      toast.error('Photo tidak bisa lebih dari 2MB');
      return;
    }
    if (file) {
      const namePhoto = `complaint-photo-${v4()}`;
      const imgRef = ref(storage, `complaints/${namePhoto}`);

      uploadBytes(imgRef, file).then((snapshot) => {
        toast.success('image uploaded');
        getDownloadURL(snapshot.ref).then((url) => {
          setComplaintPhoto([...complaintPhoto, { photo_name: namePhoto, photo_url: url }]);
        });
      });
      const reader = new FileReader();
      reader.readAsDataURL(file);
      imageInputRef.current.value = '';
    }
  };

  const onDeleteClick = (idx:number) => (e:any) => {
    e.preventDefault();
    const photo = complaintPhoto[idx];
    const imgRef = ref(storage, `complaints/${photo.photo_name}`);

    deleteObject(imgRef).then(() => {
      toast.success('image deleted');
      setComplaintPhoto(complaintPhoto.filter((el:any, i:any) => (i !== idx)));
    }).catch((errDelete:any) => {
      console.log(errDelete);
      toast.error('failed to delete image');
    });
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const handleDescription = (e: any) => {
    setComplaint({ description: e.target.value });
  };

  const handleSubmit = async () => {
    const body = {
      order_id: data.orderId,
      photos: complaintPhoto,
      description: complaint.description,
    };
    await Orders.PostComplaintOrder(axiosPrivate, body)
      .then(() => {
        toast.success('Komplain berhasil dikirimkan');
        handleClose();
        refreshData();
      })
      .catch((err: any) => {
        toast.error(err.response?.data?.message);
      });
  };

  const children = () => (
    <div className="modal-review">
      <h3 className="title">{title}</h3>
      <div className="seller_info">
        <p className="name">{ storeName }</p>
        <p className="total-product">
          Total Produk :&nbsp;
          { storeItems.length }
        </p>
      </div>
      {
        storeItems.map(
          (item: any) => (
            <div className="item card-order-history_container" key={`${item.id}-${item.name}`}>
              <div className="card-order-history_content">
                <div className="center_content">
                  <CardOrderHistoryItem
                    orderId={orderId}
                    data={item}
                  />
                </div>
              </div>
            </div>
          ),
        )
      }
      <div className="item p-2">
        <div className="d-flex flex-column border rounded w-100 p-2">
          <div className="d-flex flex-column p-2">
            <span>Jumlah pengembalian dana</span>
            <h5 className="p-2">
              <b>
                Rp
                {formatPrice(data.transaction.total)}
              </b>
            </h5>
          </div>
          <div className="d-flex justify-content-between pt-2 border-top">
            <span>Pembayaran menggunakan</span>
            <span>{data.transaction.payment_method}</span>
          </div>
        </div>
      </div>
      <div className="item">
        <div className="form_content">
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit().then();
          }}
          >
            <div className="description_content">
              <label className="label" htmlFor="name">Deskripsi</label>
              <textarea
                name="description"
                className="description"
                maxLength={200}
                required
                placeholder="Masukkan komplain"
                onChange={handleDescription}
              />
            </div>
            <div className="photo_content">
              <label className="label" htmlFor="image">Foto</label>
              <div className="">
                {complaintPhoto.map(
                  (el:any, i:any) => (
                    <button className="input__image" key={`test${i.toString()}`} type="button" onClick={onDeleteClick(i)}>
                      <div className="d-flex flex-column justify-content-center input__image__filter">
                        <div>
                          X
                        </div>
                      </div>
                      <img className="img-fit input__image" alt={i.toString()} src={el.photo_url} />
                    </button>
                  ),
                )}
                {complaintPhoto.length < 5 && (
                  <button className="input__add-image-button" type="button" onClick={() => { imageInputRef.current.click(); }}>
                    <div>
                      +
                    </div>
                  </button>
                )}
                <input
                  name="image"
                  className="col-9 border rounded p-2 input__add-image"
                  type="file"
                  onInput={handleImageChange}
                  ref={imageInputRef}
                />
              </div>
            </div>
            <div className="buttons">
              <Button
                buttonType="primary alt"
                text="Batalkan"
                handleClickedButton={handleClose}
              />
              <Button
                isSubmit
                buttonType="primary"
                handleClickedButton={() => {}}
                text="Simpan"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      modalType="complaint p-4"
      cancel={handleCloseModal}
      isOpen={open}
    >
      {
        children()
      }
    </Modal>
  );
};

export default ModalComplaint;
