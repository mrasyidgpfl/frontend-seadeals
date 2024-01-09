import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import CartDropdownItem from './CartDropdownItem';
import Button from '../../components/Button/Button';
import LoadingPlain from '../../components/Loading/LoadingPlain';

interface Props {
  cartItems: any[],
  cartTotal: number,
  loadingCart: boolean,
  setShowCart: ()=>void
}

const CartDropdown:FC<Props> = ({
  cartItems, cartTotal, loadingCart, setShowCart,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="cart_dropdown mt-5"
      onMouseEnter={() => setShowCart()}
    >
      <div className="cart_dropdown_content shadow">
        {loadingCart
          ? <div className="text-center"><LoadingPlain height={56} /></div>
          : (
            <>
              {cartItems.length <= 0 && <small className="text-secondary fw-bold d-block text-center">Belum Ada Barang</small>}
              {cartItems.length > 0
                && (
                <>
                  <small className="text-secondary fw-bold">Baru Ditambahkan</small>
                  <div className="py-3">
                    {cartItems.map((item:any) => (
                      <CartDropdownItem
                        key={item.id}
                        product={item}
                      />
                    ))}
                  </div>
                  <div className="d-flex justify-content-between align-items-center pt-2">
                    <small>{cartTotal > 5 && `${cartTotal - 5} Produk Lainnya`}</small>
                    <Button
                      buttonType="primary rounded-0 p-2"
                      text="Tampilkan Keranjang"
                      handleClickedButton={() => { navigate('/cart'); }}
                    />
                  </div>
                </>
                )}
            </>
          )}
      </div>
    </div>
  );
};

export default CartDropdown;
