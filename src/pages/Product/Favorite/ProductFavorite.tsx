import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { ReactComponent as IconHeart } from '../../../assets/svg/icon_heart.svg';

import './ProductFavorite.scss';
import { formatCount } from '../../../utils/product';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useAuth from '../../../hooks/useAuth';
import Notifications from '../../../api/notifications';
import { AppDispatch } from '../../../app/store';
import { addFavoriteCount, reduceFavoriteCount } from '../../../features/navbarProfile/navbarProfileSlice';

type ProductFavoriteProps = {
  isFavorite: any,
  favorite: number,
  productId: number,
};

const ProductFavorite = (props: ProductFavoriteProps) => {
  const {
    isFavorite,
    favorite,
    productId,
  } = props;

  const [isFav, setIsFav] = useState(isFavorite);
  const [favCount, setFavCount] = useState(favorite);

  const dispatch = useDispatch<AppDispatch>();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleFavorite = async () => {
    if (auth.user) {
      const val = {
        product_id: productId,
      };
      await Notifications.PostFavorite(axiosPrivate, val)
        .then((resp: any) => {
          if (isFav) {
            toast.success('Barang berhasil dikeluarkan dari favorit');
            setFavCount(favCount - 1);
            dispatch(reduceFavoriteCount());
          }
          if (!isFav) {
            toast.success('Barang berhasil dimasukkan ke favorit');
            setFavCount(favCount + 1);
            dispatch(addFavoriteCount());
          }
          setIsFav(resp.data.data.favorites.is_favorite);
        })
        .catch(() => {
          if (isFav) {
            toast.error('Gagal mengeluarkan barang dari favorit');
          }
          if (!isFav) {
            toast.error('Gagal memasukkan barang ke favorit');
          }
        });
    }
    if (!auth.user) {
      toast.error('Silahkan masuk terlebih dahulu');
      navigate('/login', { state: { from: location } });
    }
  };

  return (
    <div className="product_favorite_container">
      <div
        className="product_favorite_content"
        onClick={handleFavorite}
        role="presentation"
      >
        {
          React.createElement(IconHeart, {
            className: `icon_heart ${isFav ? 'fav' : 'not-fav'}`,
          })
        }
        <p className="text">
          Favorit (
          { formatCount(favCount) }
          )
        </p>
      </div>
    </div>
  );
};

export default ProductFavorite;
