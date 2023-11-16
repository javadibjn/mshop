import axios from 'axios';
import Link from 'next/link';
import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import React, { useEffect, useReducer } from 'react';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, summary: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}
function AdminDashboardScreen() {
  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/summary`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: summary.salesData.map((x) => x._id), // 2022/01 2022/03
    datasets: [
      {
        label: 'Sales',
        backgroundColor: 'rgba(162, 222, 208, 1)',
        data: summary.salesData.map((x) => x.totalSales),
      },
    ],
  };
  return (
    <Layout title="داشبورد مدیر">
      <div className="grid  md:grid-cols-4 md:gap-5  text-sm">
        <div>
          <ul>
            <li
              className="bg-gray-500   w-36  text-white
            rounded-md text-center h-10  content-center  items-center pt-1 m-2"
            >
              <Link href="/admin/dashboard" className="font-bold">
                داشبورد
              </Link>
            </li>
            <li
              className="bg-blue-500   w-36  text-white
            rounded-md text-center h-10  content-center  items-center pt-1 m-2"
            >
              <Link href="/admin/orders">سفارش ها</Link>
            </li>
            <li
              className="bg-blue-500   w-36  text-white
            rounded-md text-center h-10  content-center  items-center pt-1 m-2"
            >
              <Link href="/admin/products">کتاب ها</Link>
            </li>
            <li
              className="bg-blue-500   w-36  text-white
            rounded-md text-center h-10  content-center  items-center pt-1 m-2"
            >
              <Link href="/admin/users">کاربران</Link>
            </li>
            <li
              className="bg-blue-500   w-36  text-white
            rounded-md text-center h-10  content-center  items-center pt-1 m-2"
            >
              <Link href="/admin/nextupload">مدیریت تصویر</Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <h1 className="mb-4  text-base text-red-600">داشبورد مدیر</h1>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="card m-5 p-5">
                  <p className="text-base  text-red-600">
                    ریال{summary.ordersPrice}{' '}
                  </p>
                  <p className="">فروش ها</p>
                  <Link
                    className="text-base  text-blue-600"
                    href="/admin/orders"
                  >
                    مشاهده فروش ها
                  </Link>
                </div>
                <div className="card m-5 p-5">
                  <p className="text-base">{summary.ordersCount} </p>
                  <p>سفارش ها</p>
                  <Link
                    className="text-base  text-blue-600"
                    href="/admin/orders"
                  >
                    گزارش سفارش ها
                  </Link>
                </div>
                <div className="card m-5 p-5">
                  <p className="text-base">{summary.productsCount} </p>
                  <p>محصولات</p>
                  <Link
                    className="text-base  text-blue-600"
                    href="/admin/products"
                  >
                    گزارش محصولات
                  </Link>
                </div>
                <div className="card m-5 p-5">
                  <p className="text-base">{summary.usersCount} </p>
                  <p>کاربران</p>
                  <Link
                    className="text-base  text-blue-600"
                    href="/admin/users"
                  >
                    گزارش کاربران
                  </Link>
                </div>
              </div>
              <h2 className="text-sm">گزارش فروش</h2>
              <Bar
                options={{
                  legend: { display: true, position: 'right' },
                }}
                data={data}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

AdminDashboardScreen.auth = { adminOnly: true };
export default AdminDashboardScreen;
