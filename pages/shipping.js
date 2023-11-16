import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
// import axios from 'axios';
import db from '../utils/db';
import  City  from "../models/City";

export default   function ShippingScreen({ city }) {
  // if (!data) {
  //   return toast.error('1111');
  // }
  // const { Mcity } = city;

  // const Mcity = [
  //   {
  //     name: 'تهران',
  //     value: 'تهران',
  //   },
  //   {
  //     name: 'تجریش',
  //     value: 'تجریش',
  //   },
  // ];

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;
  const router = useRouter();

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('country', shippingAddress.country);
  }, [setValue, shippingAddress]);

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, postalCode, country },
    });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          country,
        },
      })
    );

    router.push('/payment');
  };

  return (
    <Layout title="آدرس تحویل گیرنده">
      <CheckoutWizard activeStep={1} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">آدرس تحویل گیرنده</h1>
        <div className="mb-4">
          <label htmlFor="fullName" className=" text-blue-600">
            نام کامل
          </label>
          <input
            className="w-full  bg-blue-100  rounded-sm"
            id="fullName"
            autoFocus
            {...register('fullName', {
              required: 'لطفا نام کامل خود را وارد کنید',
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="address" className=" text-blue-600">
            آدرس
          </label>
          <input
            className="w-full   bg-blue-100  rounded-sm"
            id="address"
            {...register('address', {
              required: 'لطفا آدرس را وارد کنید',
              minLength: { value: 3, message: 'Address is more than 2 chars' },
            })}
          />
          {errors.address && (
            <div className="text-red-500">{errors.address.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor={city.value} className=" text-blue-600 ">
            شهر
          </label>
          <select
            {...register('city', {
              required: 'لطفا شهر را وارد کنید',
              minLength: { value: 3, message: 'Address is more than 2 chars' },
            })}
            className=" text-blue-600  rounded-md w-full"
          >
            {city.map((city) => (
              <option key={city.value} value={city.value}>
                {city.name}
              </option>
            ))}

            {/* <option value="تهران">تهران</option>
            <option value="شمبران">شمبران</option>
            <option value="کرج">کرج</option> */}
          </select>
          {/* <select className="w-full" value={Mcity.value}>
            {Mcity.map((Mcity) => (
              <option key={Mcity.value} value={Mcity.value}>
                {Mcity.name}
              </option>
            ))}
          </select> */}
          {/* <input
            className="w-full  bg-blue-100  rounded-sm"
            id="city"
            {...register('city', {
              required: 'لطفا شهر را وارد کنید',
            })}
          /> */}
          {errors.city && (
            <div className="text-red-500 ">{errors.city.message}</div>
          )}
        </div>
        <div className="mb-4 ">
          <label htmlFor="postalCode" className=" text-blue-600">
            کد پستی
          </label>
          <input
            className="w-full  bg-blue-100  rounded-sm"
            id="postalCode"
            {...register('postalCode', {
              required: 'لطفا کد پستی خود را وارد کنید',
            })}
          />
          {errors.postalCode && (
            <div className="text-red-500 ">{errors.postalCode.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="country" className=" text-blue-600">
            کشور
          </label>
          {/* <select className="w-full" value="country">
            <option value="country">ایران</option>
           
          </select> */}
          <input
            className="w-full   bg-blue-100  rounded-sm"
            id="country"
            {...register('country', {
              required: 'لطفا کشور خود را وارد کنید',
            })}
          />
          {errors.country && (
            <div className="text-red-500 ">{errors.country.message}</div>
          )}
        </div>
        <div className="mb-4 flex justify-between w-36">
          <button className="primary-button   text-white  bg-blue-500  rounded-md  h-10  w-28">
            بعدی
          </button>
        </div>
      </form>
    </Layout>
  );
}

ShippingScreen.auth = true;


export async function getServerSideProps() {
  await db.connect();
  const city = await City.find().lean();
  // const featuredProducts = await Product.find({ isFeatured: true }).lean();
  return {
    props: {
      city: city.map(db.convertDocToObj),
    },
  };
}