import axios from 'axios';
import Image from 'next/image';
// import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import Product from '../../models/Product';
// import Productdetail from '../../models/Productdetail';
import db from '../../utils/db';
import { Store } from '../../utils/Store';
import Link from 'next/link';
import Myswiper from '../../components/Myswiper';
import Safe from '../../components/safe';
import Redirecttype from '../../models/Redirecttype';
import Pushcomp from '../../components/pushcomp';
import Article from '../../models/Article';

export default function ProductScreen(props) {
  const { product } = props;
  const { redirecttype } = props;
  const { article } = props;
  // console.log('00000000000000000000000000000', product);
  // const { productdetail } = props;
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  if (!product) {
    return <Layout title="Produt Not Found">Produt Not Found</Layout>;
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('متاسفانه کالا موجود نیست');
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

  // const witchgrpp = (grpp, aoutor) => {
  //   if (grpp === 1) {
  //     if (aoutor === 'motarjem') return 'مترجم:';
  //     if (aoutor === 'aoutor') return 'نویسنده:';
  //   }

  //   if (grpp === 2) {
  //     if (aoutor === 'motarjem') return 'یووی:';
  //     if (aoutor === 'aoutor') return 'نوع:';
  //   }
  // };
  // const hidegrpp = (grpp) => {
  //   if (grpp === 1) return 1;
  //   if (grpp === 2) return 0;
  // };

  const hidewithredirect = (txtt) => {
    if (txtt === '-') return 1;
  };

  return (
    <Layout title={product.name}>
      <button
        href="/"
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
         focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
         text-sm p-2.5 text-center inline-flex items-center mr-2
         dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 
          shadow-lg shadow-blue-400"
      >
        <Link href="/" rel="" className="00">
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
          <span class="sr-only">Icon description</span>
        </Link>
      </button>

      <div
        className=" max-w-7xl   border-gray-300 border-2 hover:border-2
       hover:border-gray-500 transition-all  rounded-xl "
      >
        <div
          className="grid xl:grid-cols-3 md:gap-6
            xl:gap-1 object-top 
            mx-auto  my-0  shadow-md border-gray-300    w-full"
        >
          <div
            className="h-80   
            items-center 
            place-items-between content-center
            place-content-center place-items-between
            px-2 pt-0.5 mx-auto mb-3 w-full"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={210}
              height={140}
              sizes="(max-width: 450px) 100vw,
              (max-width: 1200px) 50vw,33vw"
              style={{ width: '100%', height: '100%' }} //The point is right there!
              //OR className='w-100 h-100'

              loading="lazy"
              className=" w-full    h-70
            rounded-xl
            mx-0.5
            mt-1
            justify-center
            hover:border-2
             hover:border-red-500 transition-all  border-gray-300 border-2
              hover:scale-125  hover:brightness-105 shadow-xl  shadow-blue-400
             "
            ></Image>
          </div>
          <div
            className="text-sm bg-gray-50  rounded-xl px-4 pt-5 mb-2 mt-1 
                border-gray-300 border-2 hover:border-2
                hover:border-gray-500  shadow-xl  shadow-blue-400
                 hover:scale-105   transition-all "
          >
            <h1 className=" text-sm font-bold text-red-600 ">{product.name}</h1>
            <div
              className="grid  grid-cols-[18%_82%] mt-1  mx-0.5 
                 "
            >
              <div className="text-blue-500">
                <ul>
                  <div className="grid grid-rows-1  grid-cols-[18%_82%]    w-96  px-1 ">
                    <div>شرح:</div>
                    <div className="text-slate-800 font-bold">
                      {product.description}
                    </div>
                  </div>
                  <li>
                    <div className="grid grid-rows-1  grid-cols-[18%_82%]    w-96  px-1 ">
                      <div>نوع کالا:</div>
                      <div className="text-slate-800 font-bold">
                        {product.category}
                      </div>
                    </div>
                  </li>
                  <li className="">
                    <div className="grid grid-rows-1  grid-cols-[18%_82%]     w-96  px-1 ">
                      <div>برند:</div>

                      <div className="text-slate-800 font-bold">
                        {product.brand}
                      </div>
                    </div>
                  </li>
                  <li
                    className={`${
                      hidewithredirect(redirecttype.aoutor) ? 'hidden' : ''
                    }   `}
                  >
                    <div className="grid grid-rows-1  grid-cols-[18%_82%]     w-96  px-1 ">
                      <div>{redirecttype.aoutor}:</div>
                      <div className="text-slate-800 font-bold">
                        {product.aoutor}
                      </div>
                    </div>
                  </li>
                  <li
                    className={`${
                      hidewithredirect(redirecttype.motarjem) ? 'hidden' : ''
                    }   `}
                  >
                    <div className="grid grid-rows-1  grid-cols-[18%_82%]      w-96  px-1 ">
                      {/* <div>{witchgrpp(product.grpp, 'motarjem')}</div> */}
                      <div>{redirecttype.motarjem}:</div>
                      <div className="text-slate-800 font-bold">
                        {product.motarjem}
                      </div>
                    </div>
                  </li>
                  <li
                    // className={`${!hidegrpp(product.grpp) ? 'hidden' : ''}   `}
                    className={`${
                      hidewithredirect(redirecttype.shabak) ? 'hidden' : ''
                    }   `}
                  >
                    <div className="grid grid-rows-1  grid-cols-[18%_82%]     w-96  pl-px ">
                      <div> {redirecttype.shabak}:</div>
                      <div className=" text-slate-800 font-bold">
                        {product.shabak}
                      </div>
                    </div>
                  </li>
                  <li
                    className={`${
                      hidewithredirect(redirecttype.ghata) ? 'hidden' : ''
                    }   `}
                  >
                    <div className="grid grid-rows-1  grid-cols-[18%_82%]     w-96  px-1 ">
                      <div>{redirecttype.ghata}:</div>
                      <div className=" text-slate-800 font-bold">
                        {product.ghata}
                      </div>
                    </div>
                  </li>
                  <li
                    className={`${
                      hidewithredirect(redirecttype.pagecount) ? 'hidden' : ''
                    }   `}
                  >
                    <div className="grid grid-rows-1  grid-cols-[18%_82%]     w-96  px-1 ">
                      <div> {redirecttype.pagecount}:</div>
                      <div className=" text-slate-800 font-bold">
                        {product.pagecount}
                      </div>
                    </div>
                  </li>
                  <li
                    className={`${
                      hidewithredirect(redirecttype.chapshamsi) ? 'hidden' : ''
                    }   `}
                  >
                    <div className="grid grid-rows-1  grid-cols-[18%_82%]     w-96  px-1 ">
                      <div> {redirecttype.chapshamsi} :</div>
                      <div className=" text-slate-800 font-bold">
                        {product.chapshamsi}
                      </div>
                    </div>
                  </li>
                  <li
                    className={`${
                      hidewithredirect(redirecttype.chapmiladi) ? 'hidden' : ''
                    }   `}
                  >
                    <div className="grid grid-rows-1  grid-cols-[18%_82%]     w-96  px-1 ">
                      <div> {redirecttype.chapmiladi} :</div>
                      <div className=" text-slate-800 font-bold">
                        {product.chapmiladi}
                      </div>
                    </div>
                  </li>
                  <li
                    className={`${
                      hidewithredirect(redirecttype.jeld) ? 'hidden' : ''
                    }   `}
                  >
                    <div className="grid grid-rows-1  grid-cols-[18%_82%]   pb-3  w-96  px-1 ">
                      <div> {redirecttype.jeld}:</div>
                      <div className=" text-slate-800 font-bold">
                        {product.jeld}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div></div>
            </div>
          </div>
          <div
            className="mt-1 mx-0.5 bg-gray-50  rounded-xl px-2 py-2 mb-2
             border-gray-300 border-2 hover:border-2
             hover:border-gray-500  shadow-xl  shadow-blue-400 
             hover:scale-105  hover:brightness-105 transition-all text-sm text-blue-500"
          >
            <ul>
              <li>
                <div className="grid grid-rows-1  grid-cols-[18%_82%]     w-96 pt-5 px-5 ">
                  <div> قیمت :</div>
                  <div className=" text-black font-bold">
                    {product.price} &nbsp; &nbsp;تومان
                  </div>
                </div>
              </li>
              <li>
                <div className="grid grid-rows-1  grid-cols-[18%_82%]     w-96 pt-3 px-5 ">
                  <div> موجودی :</div>
                  <div className=" text-black font-bold">
                    {product.countInStock > 0 ? 'موجود' : 'ناموجود'}
                  </div>
                </div>
              </li>
            </ul>

            <div
              className="grid grid-col-1  content-center
              align-middle justify-center rounded-md bg-transparent
               text-transparent hover:text-blue-900  hover:bg-blue-50"
            >
              <div className=" rounded-3xl ">اضافه به سبد</div>
              <div>
                <button
                  type="button"
                  onClick={addToCartHandler}
                  class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 
              focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
              text-sm px-5 py-2.5 text-center inline-flex items-center mr-2
               dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-auto
                shadow-lg shadow-blue-400"
                >
                  <svg
                    class="w-10 h-4     "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 21"
                  >
                    <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-16  w-auto mt-5">
          <Safe />
        </div>
        <div
          className="    rounded-xl  border-2  border-gray-300  
           p-4 bg-gray-50 my-10
       mx-auto   shadow-lg shadow-blue-400 h-auto "
        >
          <h1
            className=" text-blue-500 text-base font-bold  bg-gray-100  rounded-xl
          mx-8"
          >
            معرفی
          </h1>
          <div
            className=" flex break-normal bg-gray-50 
           rounded-sm text-justify text-base font-bold mx-12  my-5"
          >
            {product.longdesc ? product.longdesc : ''}
          </div>
          <div
            className="flex break-normal bg-gray-50 
           rounded-sm text-justify text-base font-bold mx-12  my-5"
          >
            {product.longdesc2 ? product.longdesc2 : ''}
          </div>
          <div
            className="flex break-normal bg-gray-50 
           rounded-sm text-justify text-base font-bold mx-12 my-5"
          >
            {product.longdesc3 ? product.longdesc3 : ''}
          </div>
        </div>
        <div className=" m-10">
          <div className="z-10   shadow-lg shadow-blue-400">
            <Myswiper data={product} />
          </div>
        </div>
        <div>
          <Pushcomp article={article} />
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();

  const grpp = product.grpp;
  const redirecttype = await Redirecttype.findOne({ grpp }).lean();
  const article = await Article.find().lean();
  // console.log('2222222222222222222222', redirecttype);
  // const productdetail = await Productdetail.findOne(
  //   { product },
  //   'longdesc shabak createdAt updatedAt'
  // ).lean();
  // console.log('33333333', productdetail);

  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
      redirecttype: redirecttype ? db.convertDocToObj(redirecttype) : null,
      article: article.map(db.convertDocToObj),
      // productdetail: productdetail ? db.convertDocToObj(productdetail) : null,
    },
  };
}
