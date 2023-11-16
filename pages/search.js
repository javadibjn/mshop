import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import ProductItem from '../components/ProductItem';
import Product from '../models/Product';
import db from '../utils/db';
import Image from 'next/image';

const PAGE_SIZE = 4;

const prices = [
  {
    name: '1 تا 50000',
    value: '1-50000',
  },
  {
    name: '50001 تا 200000',
    value: '50001-200000',
  },
  {
    name: '200001 تا 10000000',
    value: '200001-10000000',
  },
];

// const ratings = [1, 2, 3, 4, 5];

export default function Search(props) {
  const router = useRouter();

  const {
    query = 'all',
    category = 'all',
    brand = 'all',
    price = 'all',
    rating = 'all',
    sort = 'featured',
    page = 1,
  } = router.query;

  const { products, countProducts, categories, brands, pages } = props;

  const filterSearch = ({
    page,
    category,
    brand,
    sort,
    min,
    max,
    searchQuery,
    price,
    rating,
  }) => {
    const { query } = router;
    if (page) query.page = page;
    if (searchQuery) query.searchQuery = searchQuery;
    if (sort) query.sort = sort;
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (price) query.price = price;
    if (rating) query.rating = rating;
    if (min) query.min ? query.min : query.min === 0 ? 0 : min;
    if (max) query.max ? query.max : query.max === 0 ? 0 : max;

    router.push({
      pathname: router.pathname,
      query: query,
    });
  };
  const categoryHandler = (e) => {
    filterSearch({ category: e.target.value });
  };
  const pageHandler = (page) => {
    filterSearch({ page });
  };
  const brandHandler = (e) => {
    filterSearch({ brand: e.target.value });
  };
  const sortHandler = (e) => {
    filterSearch({ sort: e.target.value });
  };
  const priceHandler = (e) => {
    filterSearch({ price: e.target.value });
  };
  // const ratingHandler = (e) => {
  //   filterSearch({ rating: e.target.value });
  // };

  const { state, dispatch } = useContext(Store);
  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      toast.error('Sorry. Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };
  return (
    <Layout title="جستجو">
      <div className="grid  grid-cols-1 md:grid-cols-[20%_80%]   text-sm">
        <div>
          <div className="text-red-600  text-sm">جستجو بر اساس</div>
          <div className="my-3 shadow-lg shadow-blue-400 bg-orange-400  rounded-t-md">
            <div
              className="grid grid-cols-[15%_85%] items-center
             border-orange-400 border-2 rounded-md rounded-b-none "
            >
              <div className="shadow-sm  shadow-blue-400  rounded-full ">
                <Image
                  src="/icons/cart1.png"
                  alt="/icons/cart1.png"
                  width={6}
                  height={6}
                  loading="lazy"
                  className="w-6 h-6    rounded-3xl 
               mx-auto mt-1 justify-center bg-white border-orange-400 border-2  hover:scale-105
               transition-all
               hover:brightness-110  "
                />
              </div>
              <div>
                <h2 className="text-white  text-sm mx-3">دسته بندی ها</h2>
              </div>
            </div>
            <select
              className="w-full border-orange-400 border-2 rounded-md  rounded-t-none"
              value={category}
              onChange={categoryHandler}
            >
              <option value="all" className="text-red-500 ">
                همه
              </option>
              {categories &&
                categories.map((category) => (
                  <option
                    className="  rounded-md"
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-3  shadow-lg shadow-blue-400 bg-orange-400  rounded-t-md">
            <div className="grid grid-cols-[15%_85%] items-center border-orange-400 border-2 rounded-md">
              <div className="shadow-sm  shadow-blue-400  rounded-full">
                <Image
                  src="/icons/cart1.png"
                  alt="/icons/cart1.png"
                  width={6}
                  height={6}
                  loading="lazy"
                  className="w-6 h-6    rounded-3xl 
               mx-auto mt-1 justify-center bg-white border-orange-400 border-2  hover:scale-105
               transition-all
               hover:brightness-110  "
                />
              </div>
              <div>
                <h2 className="text-white   text-sm  mx-3">برند</h2>
              </div>
            </div>
            <select
              className="w-full  border-orange-400 border-2 rounded-md"
              value={brand}
              onChange={brandHandler}
            >
              <option value="all">همه</option>
              {brands &&
                brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-3  shadow-lg shadow-blue-400 bg-orange-400  rounded-t-md">
            <div className="grid grid-cols-[15%_85%] items-center border-orange-400 border-2 rounded-md">
              <div className="shadow-sm  shadow-blue-400  rounded-full">
                <Image
                  src="/icons/cart1.png"
                  alt="/icons/cart1.png"
                  width={6}
                  height={6}
                  loading="lazy"
                  className="w-6 h-6    rounded-3xl 
               mx-auto mt-1 justify-center bg-white
                border-orange-400 border-2  hover:scale-105
               transition-all
               hover:brightness-110  "
                />
              </div>
              <div>
                <h2 className="text-white  text-sm  mx-3">قیمت</h2>
              </div>
            </div>
            <select
              className="w-full   border-orange-400 border-2 rounded-md"
              value={price}
              onChange={priceHandler}
            >
              <option value="all" className="text-red-500">
                همه
              </option>
              {prices &&
                prices.map((price) => (
                  <option key={price.value} value={price.value}>
                    {price.name}
                  </option>
                ))}
            </select>
          </div>
          {/* <div className="mb-3  shadow-lg shadow-slate-600 bg-orange-400  rounded-t-md">
            <div className="grid grid-cols-[15%_85%] items-center border-orange-400 border-2 rounded-md">
              <div className="shadow-sm  shadow-slate-200  rounded-full">
                <Image
                  src="/icons/cart1.png"
                  alt="/icons/cart1.png"
                  width={6}
                  height={6}
                  loading="lazy"
                  className="w-6 h-6    rounded-3xl 
               mx-auto mt-1 justify-center bg-white border-orange-400 border-2  hover:scale-105
               transition-all
               hover:brightness-110  "
                />
              </div>
              <div>
                <h2 className="text-white  text-sm   mx-3 ">رتبه بندی ها</h2>
              </div>
            </div>
            <select
              className="w-full  border-orange-400 border-2 rounded-md"
              value={rating}
              onChange={ratingHandler}
            >
              <option value="all">همه</option>
              {ratings &&
                ratings.map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} star{rating > 1 && 's'} & up
                  </option>
                ))}
            </select>
          </div> */}
        </div>
        <div className=" flex-col">
          <div className="mb-2 flex items-center justify-between border-b-2 pb-2">
            <div className="flex items-center text-red-600">
              {products.length === 0 ? 'هیچ ' : countProducts} مورد
              {query !== 'all' && query !== '' && ' : ' + query}
              {category !== 'all' && ' : ' + category}
              {brand !== 'all' && ' : ' + brand}
              {price !== 'all' && ' : Price ' + price}
              {rating !== 'all' && ' : Rating ' + rating + ' & up'}
              &nbsp;
              {(query !== 'all' && query !== '') ||
              category !== 'all' ||
              brand !== 'all' ||
              rating !== 'all' ||
              price !== 'all' ? (
                <button onClick={() => router.push('/search')}>
                  <XCircleIcon className="h-5 w-5 " />
                </button>
              ) : null}
            </div>
            <div className="pr-2  rounded-md shadow-lg shadow-blue-400">
              ترتیب بر اساس{' '}
              <select 
                value={sort}
                onChange={sortHandler}
                className="rounded-md  shadow-lg shadow-blue-400"
              >
                <option value="featured">منتخب</option>
                <option value="lowest">قیمت: کم ترین</option>
                <option value="highest">قیمت: بیشتری</option>
                <option value="toprated">نظر مشتریان</option>
                <option value="newest">تازه ها</option>
              </select>
            </div>
          </div>

          {/* ///////////////////////////// */}
          <div>
            <div className="grid grid-cols-1 gap-1 lg:grid-cols-2  ">
              {products.map((product) => (
                <ProductItem
                  key={product._id}
                  product={product}
                  addToCartHandler={addToCartHandler}
                />
              ))}
            </div>
            <ul className="flex">
              {products.length > 0 &&
                [...Array(pages).keys()].map((pageNumber) => (
                  <li key={pageNumber}>
                    <button
                      className={`default-button m-2 w-6 shadow-lg shadow-blue-400
                        rounded-md text-white
                        bg-blue-800 hover:bg-blue-500  ${
                          page == pageNumber + 1
                            ? 'font-bold bg-orange-400'
                            : ''
                        } `}
                      onClick={() => {
                        pageHandler(pageNumber + 1);
                      }}
                    >
                      {pageNumber + 1}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  const category = query.category || '';
  const brand = query.brand || '';
  const price = query.price || '';
  const rating = query.rating || '';
  const sort = query.sort || '';
  const searchQuery = query.query || '';

  const queryFilter =
    searchQuery && searchQuery !== 'all'
      ? {
          name: {
            $regex: searchQuery,
            $options: 'i',
          },
        }
      : {};
  const categoryFilter = category && category !== 'all' ? { category } : {};
  const brandFilter = brand && brand !== 'all' ? { brand } : {};
  const ratingFilter =
    rating && rating !== 'all'
      ? {
          rating: {
            $gte: Number(rating),
          },
        }
      : {};
  // 10-50
  const priceFilter =
    price && price !== 'all'
      ? {
          price: {
            $gte: Number(price.split('-')[0]),
            $lte: Number(price.split('-')[1]),
          },
        }
      : {};
  const order =
    sort === 'featured'
      ? { isFeatured: -1 }
      : sort === 'lowest'
      ? { price: 1 }
      : sort === 'highest'
      ? { price: -1 }
      : sort === 'toprated'
      ? { rating: -1 }
      : sort === 'newest'
      ? { createdAt: -1 }
      : { _id: -1 };

  await db.connect();
  const categories = await Product.find().distinct('category');
  const brands = await Product.find().distinct('brand');
  const productDocs = await Product.find(
    {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...brandFilter,
      ...ratingFilter,
    },
    '-reviews'
  )
    .sort(order)
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean();

  const countProducts = await Product.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...brandFilter,
    ...ratingFilter,
  });

  await db.disconnect();
  const products = productDocs.map(db.convertDocToObj);

  return {
    props: {
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
      categories,
      brands,
    },
  };
}
