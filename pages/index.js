import axios from 'axios';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import Product from '../models/Product';
import db from '../utils/db';
import { Store } from '../utils/Store';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import Link from 'next/link';
import Myswiper from '../components/Myswiper';
import Pushcomp from '../components/pushcomp';
import Article from '../models/Article';
// import Testbg from '../components/testbg';

export default function Home({ products, article }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('متاسفانه کالا موجود نیست');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });

    toast.success('محصول به سبد شما اضافه شد');
  };

  return (
    <Layout title="Home Page">
      {/* <Carousel showThumbs={false} autoPlay>
        {featuredProducts.map((product) => (
          <div key={product._id}>
            <Link href={`/product/${product.slug}`} passHref className="flex">
              <img src={product.banner} alt={product.name} />
            </Link>
          </div>
        ))}
      </Carousel> */}
      {/* <div className="bg-black flex flex-col w-full content-center text-white">
        <Sidebar className="bg-red-600" />
      </div> */}

      {/* <Testbg /> */}
      <div className="z-10 rounded-md shadow-lg shadow-blue-400">
        <Myswiper />
      </div>

      <h2 className="h2 my-4 ">تازه ها</h2>
      <div
        className="grid grid-cols-1 gap-0  md:gap-3  grid-rows-1
              bg-transparent
              sm:bg-transparent  sm:grid-cols-1  
              md:bg-transparent  md:grid-cols-1
              lg:bg-transparent  lg:grid-cols-3
              xl:bg-transparent
             2xl:bg-violet-100
                justify-center   items-center   rounded-lg  "
      >
        {products.map((product) => (
          <ProductItem
            product={product}
            key={product.slug}
            addToCartHandler={addToCartHandler}
          ></ProductItem>
        ))}
      </div>
      <div>
        <Pushcomp article={article} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  // const featuredProducts = await Product.find({ isFeatured: true }).lean();
  const article = await Article.find().lean();
  return {
    props: {
      // featuredProducts: featuredProducts.map(db.convertDocToObj),
      products: products.map(db.convertDocToObj),
      article: article.map(db.convertDocToObj),
    },
  };
}
