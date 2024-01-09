import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Modal from '../Modal';
import Button from '../../Button/Button';
import useAuth from '../../../hooks/useAuth';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import storage from '../../../firebase/firebase';
import { ReactComponent as IconStar } from '../../../assets/svg/icon_star.svg';

import './ModalReview.scss';
import Reviews from '../../../api/reviews';

type ModalReviewProps = {
  data: {
    storeName: string,
    storeItems: any[],
  },
  isOpen: boolean,
  handleCloseModal: () => void;
  refreshData: ()=>void
};

const ModalReview = (props: ModalReviewProps) => {
  const {
    data,
    isOpen,
    handleCloseModal,
    refreshData,
  } = props;

  const {
    storeName,
    storeItems,
  } = data;

  const { auth } = useAuth();
  const userID = auth.user.user_id;
  const axiosPrivate = useAxiosPrivate();
  const addingPhoto = useRef<HTMLInputElement>(null);

  const [review, setReview] = useState<any>([]);
  const [open, setOpen] = useState(isOpen);
  const { productID } = useParams();

  const handleClose = () => {
    setOpen(!open);
  };

  const checkExistingReview = async () => {
    try {
      const response = await axiosPrivate.post(
        'user/existing-review',
        JSON.stringify({ product_id: Number(productID) }),
      );
      const { val } = response.data;
      if (val.id !== 0) {
        setReview(val);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const setReviewObject = () => {
    const tempReview = storeItems.map(
      (item: any) => ({
        userId: userID,
        productId: item.id,
        rating: -1,
        description: '',
        imageUrl: '',
        imageName: '',
      }),
    );
    setReview(tempReview);
  };

  useEffect(() => {
    checkExistingReview().then();
    setReviewObject();
  }, []);

  const handleDescription = (e: any, id: number) => {
    const tempReview = review.map(
      (item: any) => {
        if (item.productId === id) {
          const tempItem = item;
          tempItem.description = e.target.value;
          return tempItem;
        }
        return item;
      },
    );
    setReview(tempReview);
  };

  const getImageUrl = (imageUpload: any, id: number) => {
    const imageURL = imageUpload.name + v4();
    const imgRef = ref(storage, `reviews/${imageURL}`);

    uploadBytes(imgRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        const tempReview = review.map(
          (item: any) => {
            if (item.productId === id) {
              const tempItem = item;
              tempItem.imageUrl = url;
              tempItem.imageName = imageUpload.name;
              return tempItem;
            }
            return item;
          },
        );
        setReview(tempReview);
      });
    });
  };

  const handleSubmit = async () => {
    for (let i = 0; i < review.length; i += 1) {
      const val = {
        product_id: Number(review[i].productId),
        rating: Number(review[i].rating),
        description: review[i].description,
        image_url: String(review[i].imageUrl),
        image_name: review[i].imageName,
      };
      // eslint-disable-next-line no-await-in-loop
      await Reviews.PostReview(axiosPrivate, val)
        .then(() => {
          toast.success('Review berhasil dikirimkan');
          handleClose();
          refreshData();
        })
        .catch((err: any) => {
          toast.error(err.response?.data?.message);
        });
    }
  };

  const getReview = (id: number) => review.find((el: any) => el.productId === id);

  const localUpload = (event: any, id: number) => {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files![0]);
    getImageUrl(event.target.files![0], id);
  };

  const setRating = (rate: number, id: number) => {
    const tempReview = review.map(
      (item: any) => {
        if (item.productId === id) {
          const tempItem = item;
          tempItem.rating = rate !== item.rating ? rate : 0;
          return tempItem;
        }
        return item;
      },
    );
    setReview(tempReview);
  };

  const addPhoto = (event: any) => {
    event.stopPropagation();
    if (addingPhoto.current) {
      addingPhoto.current.click();
    }
  };

  const children = () => (
    <div className="modal-review">
      <h3 className="title">Berikan Penilaian</h3>
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
            <div
              key={`${item.id}-${item.name}`}
              className="item"
            >
              <div className="product_content">
                <div className="image_content">
                  <img
                    className="image"
                    src={item.imgUrl}
                    alt={item.name}
                  />
                </div>
                <p className="name">{ item.name }</p>
              </div>
              <div className="form_content">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="rating_content">
                    <label className="label" htmlFor="name">Rating</label>
                    <div className="rating">
                      {
                        Array(5).fill(0).map(
                          (el, index) => React.createElement(IconStar, {
                            key: `star-${5 - index}`,
                            className: `star ${index >= getReview(item.id)?.rating ? 'white' : ''}`,
                            onClick: () => setRating(index + 1, item.id),
                            role: 'presentation',
                          }),
                        )
                      }
                    </div>
                  </div>
                  <div className="description_content">
                    <label className="label" htmlFor="name">Deskripsi</label>
                    <textarea
                      name="description"
                      className="description"
                      maxLength={100}
                      placeholder="Masukkan deskripsi review"
                      value={getReview(item.id)?.description}
                      onChange={(event) => handleDescription(event, item.id)}
                    />
                  </div>
                  <div className="photo_content">
                    <label className="label" htmlFor="name">Foto</label>
                    <div className="photo">
                      {
                        getReview(item.id)?.imageUrl === ''
                        && (
                          <p
                            className="add"
                            onClick={addPhoto}
                            role="presentation"
                          >
                            &#43;
                          </p>
                        )
                      }
                      {
                        getReview(item.id)?.imageUrl !== ''
                        && (
                          <img
                            className="image"
                            src={getReview(item.id)?.imageUrl}
                            alt={getReview(item.id)?.imageName}
                          />
                        )
                      }
                      <input
                        name="image_url"
                        className="photo_input"
                        maxLength={100}
                        type="file"
                        accept="image/*"
                        ref={addingPhoto}
                        onChange={((event) => localUpload(event, item.id))}
                      />
                    </div>
                    {
                      getReview(item.id)?.imageUrl !== ''
                      && (
                        <Button
                          buttonType="secondary alt change"
                          text="Ubah Foto"
                          handleClickedButton={() => addPhoto}
                        />
                      )
                    }
                  </div>
                </form>
              </div>
            </div>
          ),
        )
      }
      <div className="buttons">
        <Button
          buttonType="primary alt"
          text="Batalkan"
          handleClickedButton={handleClose}
        />
        <Button
          isSubmit
          buttonType="primary"
          handleClickedButton={handleSubmit}
          text="Simpan"
        />
      </div>
    </div>
  );

  return (
    <Modal
      modalType="review"
      cancel={handleCloseModal}
      isOpen={open}
    >
      {
        children()
      }
    </Modal>
  );
};

export default ModalReview;
