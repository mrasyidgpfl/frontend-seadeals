import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ROLES from '../constants/roles';
import Layout from '../layouts/Layout';
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import RequireAuth from '../RequireAuth';
import SellerHome from '../pages/Seller/SellerHome';
import UserPage from '../pages/User/UserPage';
import SellerLayout from '../layouts/SellerLayout';
import UserLayout from '../layouts/UserLayout';
import SellerRegister from '../pages/Seller/SellerRegister';
import PersistLogin from '../components/PersistLogin';
import SellerPage from '../pages/Seller/SellerPage';
import ProductPage from '../pages/Product/ProductPage';
import Search from '../pages/Search/Search';
import Register from '../pages/Register/Register';
import Cart from '../pages/Cart/Cart';
import Wallet from '../pages/Wallet/Wallet';
import WalletPIN from '../pages/Wallet/WalletPIN';
import WalletHistory from '../pages/Wallet/History/WalletHistory';
import WalletTopup from '../pages/Wallet/Topup/WalletTopup';
import CategoryPage from '../pages/Category/CategoryPage';
import RecommendationPage from '../pages/Recommendation/RecommendationPage';
import PostTrxSLP from '../pages/PostSLP/PostTrxSLP';
import PostTopupSLP from '../pages/PostSLP/PostTopupSLP';
import Checkout from '../pages/Checkout/Checkout';
import Transaction from '../pages/Transaction/Transaction';
import Address from '../pages/User/Address/Address';
import SimilarPage from '../pages/Similar/SimilarPage';
import OrderHistory from '../pages/User/OrderHistory/OrderHistory';
import UserOrder from '../pages/User/Order/UserOrder';
import UserProfile from '../pages/User/UserProfile/UserProfile';
import PageNotFound from '../pages/PageNotFound';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route element={<UserLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route element={<PersistLogin />}>
          <Route path="" element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="category" element={<CategoryPage />} />
          <Route path="recommendation" element={<RecommendationPage />} />
          <Route path="similar/">
            <Route path=":slug" element={<SimilarPage />} />
          </Route>
          <Route path="product/">
            <Route path=":slug" element={<ProductPage />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="cart" element={<Cart />} />
            <Route path="user/" element={<UserPage />}>
              <Route path="addresses" element={<Address />} />
              <Route path="order-history" element={<OrderHistory />} />
              <Route path="order/:id" element={<UserOrder />} />
              <Route path="profile" element={<UserProfile />} />
            </Route>

            <Route path="/wallet">
              <Route path="" element={<Wallet />} />
              <Route path="settings" element={<WalletPIN />} />
              <Route path="history" element={<WalletHistory />} />
              {/* <Route path="history/:id" element={<WalletTrxDetails />} /> */}
              <Route path="topup" element={<WalletTopup />} />
            </Route>

            <Route path="/checkout" element={<Checkout />} />
            {/* <Route path="/review/:productID" element={<Review formType="create"/>} /> */}

            <Route path="/transactions/:trxID" element={<Transaction />} />
          </Route>

          <Route path="/toko/">
            <Route path=":sellerID/" element={<SellerPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="/transactions/post-slp-topup/" element={<PostTopupSLP />} />
      <Route path="/transactions/post-slp-trx/" element={<PostTrxSLP />} />

      <Route element={<PersistLogin />}>
        <Route path="/seller/" element={<SellerLayout />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.Seller]} />}>
            <Route path="" element={<SellerHome />} />
          </Route>
          <Route path="register" element={<SellerRegister />} />
        </Route>
      </Route>

    </Route>
    <Route path="*" element={<PageNotFound />} />

  </Routes>
);

export default AppRoutes;
