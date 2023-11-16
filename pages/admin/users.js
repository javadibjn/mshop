import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, users: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true };
    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
}

function AdminUsersScreen() {
  const [{ loading, error, users, successDelete, loadingDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      users: [],
      error: '',
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/users`);
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

  const deleteHandler = async (userId) => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    try {
      dispatch({ type: 'DELETE_REQUEST' });
      await axios.delete(`/api/admin/users/${userId}`);
      dispatch({ type: 'DELETE_SUCCESS' });
      toast.success('User deleted successfully');
    } catch (err) {
      dispatch({ type: 'DELETE_FAIL' });
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="کاربران">
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
              <Link href="/admin/products">کتاب ها</Link>
            </li>
            <li
              className="bg-blue-500  w-36  text-white
            rounded-md text-center h-10  content-center  items-center pt-1 m-2"
            >
              <Link href="/admin/users" className="font-bold">
                کاربران
              </Link>
            </li>
          </ul>
        </div>
        <div className="overflow-x-auto md:col-span-3">
          <h1 className="mb-4 text-xl  text-blue-500">کاربران</h1>
          {loadingDelete && <div>Deleting...</div>}
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 py-2 text-right">کد</th>
                    <th className="px-5 py-2 text-right">نام</th>
                    <th className="px-5 py-2 text-right">ایمیل</th>
                    <th className="px-5 py-2 text-right">مدیر</th>
                    <th className="px-5 py-2 text-right">جزییات</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b">
                      <td className="px-5 py-2">
                        {user._id.substring(20, 24)}
                      </td>
                      <td className="px-5 py-2">{user.name}</td>
                      <td className="px-5 py-2">{user.email}</td>
                      <td className="px-5 py-2">
                        {user.isAdmin ? 'YES' : 'NO'}
                      </td>
                      <td className="px-5 py-2">
                        {/* <Link
                          href={`/admin/user/${user._id}`}
                          passHref
                          type="button"
                          className="default-button"
                        >
                          ویرایش
                        </Link> */}
                        &nbsp;
                        <button
                          type="button"
                          className="default-button"
                          onClick={() => deleteHandler(user._id)}
                        >
                          حذف
                        </button>
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

AdminUsersScreen.auth = { adminOnly: true };
export default AdminUsersScreen;
