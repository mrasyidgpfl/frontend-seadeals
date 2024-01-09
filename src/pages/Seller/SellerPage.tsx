import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from '../../api/axios';
import { validateSortOption, validateSortOrder } from '../../utils/sortValidator';
import {
  getActiveTabName,
  validateNumParam,
} from '../../utils/urlParamValidator';
import SellerProductList from './ProductList/SellerProductList';
import SellerHeader from './SellerHeader';
import SellerTopProductList from './TopProducts/SellerTopProductList';
import CategoryList from './CategoryList';
import './SellerPage.css';
import URL_PARAM from '../../constants/URLParamOptions';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';

const SellerPage = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const allProductRef = useRef<null | HTMLDivElement>(null);
  const { sellerID } = useParams();
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();

  // fetched data
  const [sellerInfo, setSellerInfo] = useState<any>({});
  const [loadingSellerInfo, setLoadingSellerInfo] = useState<boolean>(true);
  const [sellerTopProducts, setSellerTopProducts] = useState([]);
  const [loadingTop, setLoadingTop] = useState<boolean>(true);
  const [sellerProducts, setSellerProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(true);
  const [sellerCategories, setSellerCategories] = useState([]);
  const [loadingCates, setLoadingCates] = useState<boolean>(true);

  // sort & filter
  const [sortOption, setSortOption] = useState(searchParam.get('orderBy') || '');
  const [sortOrder, setSortOrder] = useState(searchParam.get('sort') || '');
  const [selectedSorting, setSelectedSorting] = useState(getActiveTabName(sortOption, sortOrder));
  const [pageNum, setPageNum] = useState(validateNumParam(searchParam.get(URL_PARAM.Page)));
  const [totalPage, setTotalPage] = useState(1);
  const [categoryID, setCategoryID] = useState(
    validateNumParam(searchParam.get(URL_PARAM.Category)),
  );
  const [minPrice, setMinPrice] = useState(validateNumParam(searchParam.get(URL_PARAM.Min)));
  const [maxPrice, setMaxPrice] = useState(validateNumParam(searchParam.get(URL_PARAM.Max)));

  useEffect(() => { // get seller info
    let isMounted = true;
    const controller = new AbortController();
    let ax = axios;
    if (auth?.user) {
      ax = axiosPrivate;
    }

    const getSellerInfo = async () => {
      try {
        if (!sellerID || Number.isNaN(parseInt(sellerID, 10))) navigate('/404');

        const response = await ax.get(`sellers/${sellerID}`, {
          signal: controller.signal,
        });
        const { data } = response.data;
        if (isMounted) {
          const info = {
            id: data.id,
            name: data.name,
            imgUrl: data.profile_url,
            followers: data.followers,
            joinDate: data.join_date,
            rating: data.rating,
            reviewer: data.total_reviewer,
            city: data.address.city,
            isFollowing: data.is_follow,
            totalProduct: data.total_product || 0,
          };
          setSellerInfo(info);
          setLoadingSellerInfo(false);
        }
      } catch (err) {
        toast.error('failed to fetch seller data');
      }
    };
    getSellerInfo();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  useEffect(() => { // get top 6 seller products
    let isMounted = true;
    const controller = new AbortController();

    const getTopProducts = async () => {
      try {
        const response = await axios.get(
          `/products?sellerID=${sellerID}&limit=6&sort=&sortBy=`,
          {
            signal: controller.signal,
          },
        );
        const { data } = response.data;
        if (isMounted) {
          setSellerTopProducts(data.products);
          setLoadingTop(false);
        }
      } catch (err) {
        toast.error('failed to fetch top products');
      }
    };
    getTopProducts();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  useEffect(() => { // get sort-able filter-able products
    setLoadingProducts(true);
    let isMounted = true;
    const controller = new AbortController();

    const getSellerProducts = async () => {
      try {
        const option = validateSortOption(sortOption);
        const order = validateSortOrder(sortOrder);
        const response = await axios.get(
          `/products?sellerID=${sellerID}&limit=20&sort=${order}&sortBy=${option}&categoryID=${categoryID}&minAmount=${minPrice}&maxAmount=${maxPrice}&page=${pageNum}`,
          {
            signal: controller.signal,
          },
        );
        const { data } = response.data;
        if (isMounted) {
          setSellerProducts(data.products);
          setTotalPage(data.total_page);
          setLoadingProducts(false);
        }
      } catch (err:any) {
        toast.error('failed to fetch products');
      }
    };
    getSellerProducts();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [sortOrder, sortOption, pageNum, selectedSorting, categoryID, minPrice, maxPrice]);

  useEffect(() => { // get seller categories
    let isMounted = true;
    const controller = new AbortController();

    const getCategories = async () => {
      try {
        if (!sellerID || Number.isNaN(parseInt(sellerID, 10))) navigate('/404');

        const response = await axios.get(`categories?sellerID=${sellerID}`, {
          signal: controller.signal,
        });
        const { data } = response.data;
        if (isMounted) {
          setSellerCategories(data.categories);
          setLoadingCates(false);
        }
      } catch (err) {
        toast.error('failed to categories');
      }
    };
    getCategories();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const changePage = (num:number) => {
    searchParam.set('page', `${num}`);
    setSearchParam(searchParam);
    setPageNum(num);
  };

  const changeCategory = (num:number) => {
    searchParam.set('categoryID', `${num}`);
    setSearchParam(searchParam);
    setCategoryID(num);
  };

  return (
    <div className="p-2 py-5 bg-backdrop">
      <SellerHeader loading={loadingSellerInfo} sellerInfo={sellerInfo} />
      <SellerTopProductList
        loading={loadingTop}
        products={sellerTopProducts}
        clickToScroll={() => { allProductRef.current?.scrollIntoView({ behavior: 'smooth' }); }}
      />
      <CategoryList
        loading={loadingCates}
        categories={sellerCategories}
        setCategory={changeCategory}
      />
      <SellerProductList
        loading={loadingProducts}
        loadingCates={loadingCates}
        option={{ sortOption, setSortOption }}
        order={{ sortOrder, setSortOrder }}
        sortSelect={{ selectedSorting, setSelectedSorting }}
        setParam={{ searchParam, setSearchParam }}
        page={pageNum}
        setPage={changePage}
        totalPage={totalPage}
        innerRef={allProductRef}
        products={sellerProducts}
        categories={sellerCategories}
        categoryState={{ categoryID, changeCategory }}
        minPriceState={{ minPrice, setMinPrice }}
        maxPriceState={{ maxPrice, setMaxPrice }}
      />
    </div>
  );
};

export default SellerPage;
