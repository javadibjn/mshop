// import Link from 'next/link';
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
// import Link from 'next/link';
// import { getError } from '../utils/error';
// import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
// import { useTransitions } from 'react-class-transition';

export default function LoginScreen() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email }) => {
    // console.log('66666666666666666661111111111111111111111111111', { email });
    router.push({
      pathname: '/register',
      query: { name: email },
    });
  };

  // const [bind, run] = useTransitions({
  //   myElement: {
  //     // Apply the visible class wait 15 miliseonds and apply opacity-100
  //     fadeIn: ['visible', 15, 'opacity-100'],
  //     // Apply opacity-0 wait 200 miliseconds and apply the invisible class
  //     fadeOut: ['opacity-0', 150, 'invisible'],
  //   },
  // });

  ////////////////////////

  return (
    <Layout title="ورود به حساب کاربری">
      <form
        className="mx-auto max-w-screen-sm text-center  w-96
         text-base font-bold px-10 bg-blue-100  rounded-md 
         border-2  border-gray-400 shadow-lg shadow-blue-400 mb-10"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1
          className="mb-4 text-base text-center text-red-600 mt-6
        py-3  rounded-md  bg-blue-200
        shadow-lg shadow-blue-400"
        >
          ورود به حساب کاربری
        </h1>
        <div className="my-4 ">
          <div className="my-10  text-red-700  ">
            <label
              htmlFor="email"
              className="my-10 font-thin text-red-700 text-sm mb-5 
            "
            >
              جهت احراز هویت
            </label>
            <div> </div>
            <label
              htmlFor="email"
              className="my-10 font-thin text-red-700 text-sm mb-5 
            "
            >
              کد یکبار مصرف برای شماره شما ارسال می گردد
            </label>
          </div>
          <div className="mt-20">
            <label
              htmlFor="email"
              className="my-10    rounded-md bg-blue-200
             px-7 py-2 text-gray-600 {
            
          } "
            >
              لطفا شماره تلفن همراه خود را وارد نمایید
            </label>
            <input
              type="string"
              {...register('email', {
                required: 'لطفا شماره موبایل خود را وارد کنید',
                minLength: {
                  value: 11,
                  message: 'لطفا شماره موبایل معتبر  وارد کنید',
                },
              })}
              className="w-full  text-center rounded-md 
            text-base font-bold my-5 py-2 px-5 first-letter 
            shadow-md shadow-blue-400  border-gray-100"
              id="tel"
              autoFocus
            ></input>
            {errors.email && (
              <div className=" text-red-900 ">{errors.email.message}</div>
            )}
          </div>
          <div className="mb-4  place-content-center flex content-center">
            <button
              className=" primary-button bg-blue-600  hover:bg-blue-800 rounded-md 
           text-white  w-24 text-sm h-10 mb-5 shadow-md shadow-blue-400"
            >
              ادامه
            </button>
          </div>
        </div>
      </form>
    </Layout>
  );
}
