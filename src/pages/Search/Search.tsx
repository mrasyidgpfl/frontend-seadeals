import React, { useEffect, useRef, useState } from 'react';

import './Search.scss';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import ProductList from './ProductList/ProductList';
import Products from '../../api/products';
import Filter from '../../components/Filter/Filter';
import ProductCategories from '../../api/product_categories';
import { FILTER_PRICE } from '../../constants/filter';
import Sort from '../../components/Sort/Sort';
import { SORT_SEARCH } from '../../constants/sort';
// import MiniPagination from '../../components/Pagination/MiniPagination';
import Pagination from '../../components/Pagination/Pagination';
import Cities from '../../api/cities';
import FilterDelete from '../../components/Filter/FilterDelete';

const Search = () => {
  const [products, setProducts] = useState([]);
  const [cities, setCities] = useState<any>([]);
  const [cityValues, setCityValues] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [categoryValues, setCategoryValues] = useState<any>('');
  const [priceValues, setPriceValues] = useState<any>({
    minPrice: '',
    maxPrice: '',
  });
  const [priceChange, setPriceChange] = useState({});
  const [ratingValues, setRatingValues] = useState<any>('');
  const [filter, setFilter] = useState('');
  const [sorting, setSorting] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    totalPage: 1,
  });

  const innerRef = useRef(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const getSearchParams = searchParams.get('searchInput');
  const getCategoryParams = searchParams.get('categoryName');
  console.log(getCategoryParams);

  const sortOptions = SORT_SEARCH;
  const priceItems = FILTER_PRICE;

  const getProducts = async (tempFilter: string) => {
    await Products.GetAllProducts(tempFilter)
      .then((resp) => {
        setProducts(resp.data.data.products);
        setPagination((prevState: any) => ({
          ...prevState,
          totalPage: resp.data.data.total_page,
        }));
      })
      .catch((err) => err);
  };

  const getAllCities = async () => {
    await Cities.GetAllCities()
      .then((resp) => {
        const res = resp.data;
        let values: any[] = [];
        for (let i = 0; i < res.length; i += 1) {
          const city = {
            city_id: res[i].city_id,
            city_name: res[i].city_name,
            type: res[i].type,
            isChecked: false,
          };
          values = [...values, city];
        }
        setCities(values);
      })
      .catch((err) => err);
  };

  const getAllCategories = async () => {
    await ProductCategories.GetAllCategories()
      .then((resp) => {
        setCategories(resp.data.data.categories);
        if (getCategoryParams) {
          const categoryIndex = resp.data.data.categories.findIndex(
            (el: any) => el.name.includes(getCategoryParams),
          );
          setCategoryValues(resp.data.data.categories[categoryIndex].id);
        }
      })
      .catch((err) => err);
  };

  const validatePriceFilter = () => {
    if (
      priceValues.minPrice > 0
      && priceValues.maxPrice > 0
      && priceValues.maxPrice >= priceValues.minPrice
    ) {
      return `&minAmount=${priceValues.minPrice}&maxAmount=${priceValues.maxPrice}`;
    }
    if (priceValues.minPrice > 0 && priceValues.maxPrice === '') {
      return `&minAmount=${priceValues.minPrice}`;
    }
    if (priceValues.maxPrice > 0 && priceValues.minPrice === '') {
      return `&maxAmount=${priceValues.maxPrice}`;
    }
    if (priceValues.minPrice === '' && priceValues.maxPrice === '') {
      return '';
    }
    return false;
  };

  const fillFilter = () => {
    let tempFilter = `?limit=30&page=${pagination.page}`;
    if (getSearchParams) {
      tempFilter += `&s=${getSearchParams}`;
    }
    if (categoryValues > 0) {
      tempFilter += `&categoryID=${categoryValues}`;
    }
    if (validatePriceFilter() !== false) {
      tempFilter += validatePriceFilter();
    }
    if (validatePriceFilter() === false) {
      toast.error('Masukkan batas harga yang valid');
    }
    if (
      priceValues.minPrice !== ''
      && priceValues.maxPrice !== ''
      && priceValues.maxPrice >= priceValues.minPrice
    ) {
      tempFilter += `&minAmount=${priceValues.minPrice}&maxAmount=${priceValues.maxPrice}`;
    }
    if (ratingValues > 0) {
      tempFilter += `&rating=${ratingValues}`;
    }
    if (cityValues.length > 0) {
      tempFilter += '&city=';
      for (let i = 0; i < cityValues.length; i += 1) {
        if (i > 0) {
          tempFilter += ',';
        }
        tempFilter += cityValues[i];
      }
    }
    return tempFilter;
  };

  const locationParams = (data: string[]) => {
    let params = '';
    for (let i = 0; i < data.length; i += 1) {
      if (i > 0) {
        params += ',';
      }
      params += data[i];
    }

    if (data.length > 0) {
      searchParams.set('location', params);
    }
    if (data.length === 0) {
      searchParams.delete('location');
    }
    setSearchParams(searchParams);
  };

  const addCityValues = (cityName: string) => {
    const addedValues = [...cityValues, cityName];
    setCityValues(addedValues);

    locationParams(addedValues);
  };

  const deleteCityValues = (cityName: string) => {
    const deletedValues = cityValues.filter((el: string) => el !== cityName);
    setCityValues(deletedValues);

    locationParams(deletedValues);
  };

  const handleInputLocation = (values: string) => {
    const checkedCities = cities.map(
      (city: any) => {
        if (city.city_name === values) {
          if (city.isChecked) {
            deleteCityValues(city.city_name);
          }
          if (!city.isChecked) {
            addCityValues(city.city_name);
          }
          const editedCity = city;
          editedCity.isChecked = !city.isChecked;
          return editedCity;
        }
        return city;
      },
    );
    setCities(checkedCities);
  };

  const handleInputCategory = (values: number) => {
    if (values === categoryValues) {
      setCategoryValues('');

      searchParams.delete('categoryName');
    }
    if (values !== categoryValues) {
      setCategoryValues(values);

      const category = categories.find((el: any) => el.id === values);
      searchParams.set('categoryName', category.name);
    }
    setSearchParams(searchParams);
  };

  const handleInputPrice = (event: any) => {
    const { name, value } = event.target;
    setPriceValues((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));

    if (value > 0) {
      searchParams.set(name, value);
    }
    if (value === '') {
      searchParams.delete(name);
    }
    setSearchParams(searchParams);
  };

  const handleInputRating = (number: number) => {
    if (number === ratingValues) {
      setRatingValues('');
      searchParams.delete('rating');
    }
    if (number !== ratingValues) {
      setRatingValues(number);
      searchParams.set('rating', String(number));
    }
    setSearchParams(searchParams);
  };

  const handleSort = (event: any) => {
    const { value } = event.target;
    setSorting(value);
    const splitValue = value.split(' ');
    let sortBy = '';
    let sort = '';
    if (splitValue[0] === 'Rekomendasi') {
      sortBy = 'favorite';
    }
    if (splitValue[0] === 'Terbaru') {
      sortBy = 'date';
      sort = 'desc';
    }
    if (splitValue[0] === 'Terlaris') {
      sortBy = 'sold_count';
      sort = 'desc';
    }
    if (splitValue[0] === 'Harga') {
      sortBy = 'price';
      if (splitValue[1] === 'Terendah') {
        sort = 'asc';
      }
      if (splitValue[1] === 'Tertinggi') {
        sort = 'desc';
      }
      searchParams.set('sort', splitValue[1]);
    }

    searchParams.set('sortBy', splitValue[0]);
    setSearchParams(searchParams);

    let tempFilter = filter;
    tempFilter += `&sortBy=${sortBy}`;
    tempFilter += `&sort=${sort}`;
    getProducts(tempFilter).then();
  };

  const handlePagination = (newPage: number) => {
    setPagination((prevState) => ({
      ...prevState,
      page: newPage,
    }));
    searchParams.set('page', String(newPage));
    setSearchParams(searchParams);
  };

  const handleDeleteCategoryFilter = () => {
    setCategoryValues('');
    searchParams.delete('categoryName');
    setSearchParams(searchParams);
  };

  const handleDeletePriceFilter = () => {
    setPriceValues({
      minPrice: '',
      maxPrice: '',
    });
    setPriceChange({});
    searchParams.delete('minPrice');
    searchParams.delete('maxPrice');
    setSearchParams(searchParams);
  };

  const handleDeleteRatingFilter = () => {
    setRatingValues('');
    searchParams.delete('rating');
    setSearchParams(searchParams);
  };

  const handleDeleteLocationFilter = () => {
    setCityValues([]);
    const deleteAllCitiesChecked = cities.map(
      (item: any) => {
        const tempItem = item;
        tempItem.isChecked = false;
        return tempItem;
      },
    );

    setCities(deleteAllCitiesChecked);
    searchParams.delete('location');
    setSearchParams(searchParams);
  };

  const handleDeleteAllFilter = () => {
    handleDeleteLocationFilter();
    handleDeleteCategoryFilter();
    handleDeleteRatingFilter();
    handleDeletePriceFilter();
    setFilter('');
  };

  const setPriceInput = () => {
    setPriceChange(priceValues);
  };

  useEffect(() => {
    getAllCategories().then();
    getAllCities().then();
    setFilter(`?limit=30&page=1&s=${getSearchParams}&categoryID=${categoryValues}`);
    getProducts(`?limit=30&page=1&s=${getSearchParams}&categoryID=${categoryValues}`).then();
  }, []);

  useEffect(() => {
    const tempFilter = fillFilter();
    setFilter(tempFilter);
    getProducts(tempFilter).then();
  }, [
    categoryValues,
    priceChange,
    ratingValues,
    cityValues,
    getSearchParams,
    getCategoryParams,
    pagination.page,
  ]);

  return (
    <div className="search_container">
      <div className="search_content">
        <div className="left_content">
          <h2>Filter</h2>
          <Filter
            filterType="location"
            filterClass="filter_search"
            data={cities}
            values={cityValues}
            handleInput={handleInputLocation}
            handleDelete={handleDeleteLocationFilter}
          />
          <Filter
            filterType="category"
            filterClass="filter_search"
            data={categories}
            values={categoryValues}
            handleInput={handleInputCategory}
            handleDelete={handleDeleteCategoryFilter}
          />
          <Filter
            filterType="price"
            filterClass="filter_search"
            data={priceItems}
            values={priceValues}
            handleInput={handleInputPrice}
            handleDelete={handleDeletePriceFilter}
            setInput={setPriceInput}
          />
          <Filter
            filterType="rating"
            filterClass="filter_search"
            data={[]}
            values={ratingValues}
            handleInput={handleInputRating}
            handleDelete={handleDeleteRatingFilter}
          />
          <FilterDelete
            handleDeleteAll={handleDeleteAllFilter}
          />
        </div>
        {
          products.length > 0
          && (
            <div className="right_content" ref={innerRef}>
              <Sort
                sortType="search"
                options={sortOptions}
                values={sorting}
                handleInput={handleSort}
              />
              <ProductList
                data={products}
              />
              <Pagination
                page={pagination.page}
                totalPage={pagination.totalPage}
                setPage={handlePagination}
                innerRef={innerRef}
              />
            </div>
          )
        }
        {
          products.length === 0
          && (
            <div className="not_found">
              <p className="title">Hasil tidak ditemukan</p>
              <p className="subtitle">Silahkan masukkan kata kunci yang lain atau hapus filter!</p>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Search;
