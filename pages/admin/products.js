import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreate: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true };
    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };

    default:
      state;
  }
}
export default function AdminProdcutsScreen() {
  const router = useRouter();

  const [
    { loading, error, products, loadingCreate, successDelete, loadingDelete },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    products: [],
    error: '',
  });

  const createHandler = async () => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await axios.post(`/api/admin/products`);
      dispatch({ type: 'CREATE_SUCCESS' });
      toast.success('Product created successfully');
      router.push(`/admin/product/${data.product._id}`);
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(err));
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/products`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  }, [successDelete]);

  const deleteHandler = async (productId) => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    try {
      dispatch({ type: 'DELETE_REQUEST' });
      await axios.delete(`/api/admin/products/${productId}`);
      dispatch({ type: 'DELETE_SUCCESS' });
      toast.success('Product deleted successfully');
    } catch (err) {
      dispatch({ type: 'DELETE_FAIL' });
      toast.error(getError(err));
    }
  };
  return (
    <Layout title="مدیریت کتاب ها">
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
              <Link href="/admin/orders">سفارش ها</Link>
            </li>
            <li
              className="bg-blue-500  w-36  text-white
            rounded-md text-center h-10  content-center  items-center pt-1 m-2"
            >
              <Link href="/admin/products" className="font-bold">
                کتاب ها
              </Link>
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
          <div className="flex justify-between">
            <h1 className="mb-4 text-xl  text-blue-500">کتاب ها</h1>

            <div
              className="   rounded-md  p-4 bg-gray-100 my-10
                    mx-auto   shadow-md h-auto "
            >
              <div
                className=" flex break-normal bg-gray-50 
                    rounded-sm text-justify text-sm  
                    text-blue-600  content-center "
              >
                {loadingDelete && <div>Deleting item...</div>}
                <button
                  disabled={loadingCreate}
                  onClick={createHandler}
                  className="primary-button"
                >
                  {loadingCreate ? 'Loading' : 'جدید'}
                </button>
              </div>
            </div>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-center">کد</th>
                    <th className="px-5 text-center">نام</th>
                    <th className="px-5 text-center">قیمت</th>
                    <th className="px-5 text-center">دسته</th>
                    <th className="px-5 text-center">تعداد</th>
                    <th className="px-5 text-center">امتیاز</th>
                    <th className="px-5 text-center">جزییات</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product._id}
                      className="border-b  text-sm  text-bold"
                    >
                      <td className="px-5 py-2">
                        {product._id.substring(20, 24)}
                      </td>
                      <td className="px-5 py-2">{product.name}</td>
                      <td className="px-5 py-2">{product.price}</td>
                      <td className="px-5 py-2 text-center">
                        {product.category}
                      </td>
                      <td className="px-5 py-2">{product.countInStock}</td>
                      <td className="px-5 py-2">{product.rating}</td>
                      <td className="px-5 py-2">
                        <div
                          className="grid grid-rows-1  grid-cols-2
                                        text-sm  font-thin  text-center w-36 h-8"
                        >
                          <div
                            className="bg-blue-700  
                          text-center  w-16 text-white  rounded-md mx-2 "
                          >
                            <Link
                              href={`/admin/product/${product._id}`}
                              type="button"
                              className="default-button"
                            >
                              ویرایش
                            </Link>
                          </div>

                          <div
                            className="bg-red-600 
                            text-center w-16 text-white  rounded-md mx-2"
                          >
                            <button
                              onClick={() => deleteHandler(product._id)}
                              className="default-button"
                              type="button"
                            >
                              حذف
                            </button>
                          </div>
                        </div>
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

AdminProdcutsScreen.auth = { adminOnly: true };
