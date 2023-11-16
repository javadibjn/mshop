import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useReducer } from 'react';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';
import moment from 'jalali-moment';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

export default function AdminOrderScreen() {
  // const numLatinToAr = (n) =>
  //   n.replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]).replace(/\./g, '٫');
  // console.log('11111111111111111111111111111111111', numLatinToAr('12345'));

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/orders`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  return (
    <Layout title="Admin Dashboard">
      <div className="grid md:grid-cols-4 md:gap-5">
        <div>
          <ul>
            <li
              className="bg-red-500  w-36  text-white
            rounded-md text-center h-10  content-center  items-center pt-1 m-2"
            >
              <Link href="/admin/dashboard">برگشت به داشبورد</Link>
            </li>
            <li
              className="bg-blue-500  w-36  text-white
            rounded-md text-center h-10  content-center  items-center pt-1 m-2"
            >
              <Link href="/admin/orders" className="font-bold">
                سفارشات
              </Link>
            </li>
            <li
              className="bg-blue-500   w-36  text-white
            rounded-md text-center h-10  content-center  items-center pt-1 m-2"
            >
              <Link href="/admin/products">محصولات</Link>
            </li>
            <li
              className="bg-blue-500  w-36  text-white
            rounded-md text-center h-10  content-center  items-center pt-1 m-2"
            >
              <Link href="/admin/users">کاربران</Link>
            </li>
          </ul>
        </div>
        <div className="overflow-x-auto md:col-span-3">
          <h1 className="mb-4 text-xl">داشبورد سفارشات</h1>

          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b py-2 text-sm bg-blue-200  rounded-md">
                  <tr>
                    <th className="px-5 py-2 text-center">کد</th>
                    <th className="px-5 py-2 text-right">خریدار</th>
                    <th className="px-5 py-2 text-center">تاریخ</th>
                    <th className="px-5 py-2 text-right">جمع (ریال) </th>
                    <th className="px-5 py-2 text-right">وضعیت پرداخت</th>
                    <th className="px-5 py-2 text-right">وضعیت حمل</th>
                    <th className="px-5 py-2 text-right">جزییات</th>
                  </tr>
                </thead>
                <tbody className="border-b  text-sm  text-bold">
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b">
                      <td className="px-5 py-2">
                        {order._id.substring(20, 24)}
                      </td>
                      <td className="px-5 py-2">
                        {order.user ? order.user.name : 'DELETED USER'}
                      </td>
                      <td className="px-5 py-2">
                        {/* {order.createdAt.substring(0, 10)} */}
                        {moment(order.createdAt.substring(0, 10), 'YYYY/MM/DD')
                          .locale('fa')
                          .format('YYYY/MM/DD')}
                      </td>
                      <td className="px-5 py-2">{order.totalPrice}</td>
                      <td className="px-5 py-2">
                        {order.isPaid
                          ? `${order.paidAt.substring(0, 10)}`
                          : 'پرداخت نشده'}
                      </td>
                      <td className="px-5 py-2">
                        {order.isDelivered
                          ? `${order.deliveredAt.substring(0, 10)}`
                          : 'حمل نشده'}
                      </td>
                      <td className="px-5 py-2">
                        <Link
                          href={`/order/${order._id}`}
                          passHref
                          className="text-red-500"
                        >
                          نمایش
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

AdminOrderScreen.auth = { adminOnly: true };
