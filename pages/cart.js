import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { toast } from 'react-toastify';

function CartScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  const updateCartHandler = async (item, qty) => {
    const quantity = Number(qty);
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      return toast.error('متاسفانه کالا موجود نیست');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
    toast.success('سبد شما بروز رساتی شد');
  };
  return (
    <Layout title="Shopping Cart">
      <h1 className="mb-4 text-base font-bold text-red-500">سبد خرید</h1>
      {cartItems.length === 0 ? (
        <div>
          {' '}
          <div className="my-6">سبد شما خالی است </div>
          <Link
            className="w-56 px-5 py-2 h-16 rounded-md text-sm  text-center
           text-white bg-blue-600  hover:bg-blue-800 shadow-lg shadow-slate-600"
            href="/"
          >
            شروع خرید
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5  text-base ">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full  ">
              <thead className="border-b">
                <tr>
                  <th className="p-5 text-right text-sm text-blue-500 ">نام</th>
                  <th className="p-5 text-right text-sm text-blue-500">
                    تعداد
                  </th>
                  <th className="p-5 text-right text-sm text-blue-500">قیمت</th>
                  <th className="p-5 text-sm text-red-500">حذف از سبد</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link
                        href={`/product/${item.slug}`}
                        className="flex items-center"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                          style={{
                            maxWidth: '100%',
                            height: 'auto',
                          }}
                        ></Image>
                        <div className="pr-2  text-sm  font-bold">
                          {' '}
                          {item.name}
                        </div>
                      </Link>
                    </td>
                    <td className="p-5 text-right">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-sm  font-bold text-right">
                      {item.price} &nbsp; ریال
                    </td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeItemHandler(item)}>
                        <XCircleIcon className="h-5 w-5 text-red-500"></XCircleIcon>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <ul>
              <li>
                <div className="pb-3 text-base  font-bold text-blue-500">
                  قیمت کل ({cartItems.reduce((a, c) => a + c.quantity, 0)}) :
                  &nbsp; &nbsp;
                  {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)} ریال
                </div>
              </li>
              <li>
                <button
                  onClick={() => router.push('login?redirect=/shipping')}
                  className="primary-button w-full shadow-lg shadow-slate-600
                   bg-blue-600  rounded-md  h-10 text-sm  text-center
           text-white hover:bg-blue-800"
                >
                  ثبت سفارش
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
