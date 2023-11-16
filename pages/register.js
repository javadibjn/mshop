// import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';
// import { OTP } from '/utils/sms';

// async function OPT(phone) {
//   console.log('111111111111111111111111', phone);
//   const res = await axios.post(
//     'https://console.melipayamak.com/api/send/otp/4dbcde06077648a3ad426014f73f0959',
//     { to: phone }
//   );
//   const { data, status, statusText } = res;

//   console.log('2222222222222222222222', res);
//   return {
//     data,
//     status,
//     statusText,
//   };
// }

export default function LoginScreen() {
  //
  // console.log('55555555555555555555555555555', phonenumber);
  // useEffect(() => {
  //   setNum(opt.data);
  // }, []);

  //   const otp = await OTP(phoneNumber);
  //   setIsVCode(otp.data.code);

  const [counter, setCounter] = useState(0);

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
    // getValues,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    if (counter > 4) {
      router.push('./login');
    }
    setCounter(counter + 1);

    if (password != "num123") {
      toast.error('اطلاعات وارد شده صحیح نیست');
      return;
    }
    try {
      await axios.post('/api/auth/signup', {
        email,
        password,
      });

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  // console.log('12345655555555555555555');
  // const [num, setNum] = useState(0);

  //   useEffect(() => {
  //     async function sendOTP(phonenumber) {
  //       const opt = await OTP(phonenumber);
  //       if (opt) return opt;
  //     }

  //     const phonenumber = router.query.name;
  //     const mm = sendOTP(phonenumber);
  //        setNum(mm.code);
  //   }, []);


  // console.log('99999999999999999999999999999', mm);
  // useEffect(() => {
  //   setNum(mm.code);
  // }, []);

  return (
    <Layout title="Create Account">
      <form
        className="mx-auto max-w-screen-sm  text-base font-bold px-10
         bg-blue-100  rounded-lg  w-96  border-2  border-gray-400
          shadow-lg shadow-blue-400  mb-10"
        onSubmit={handleSubmit(submitHandler)}
      >
        <label htmlFor="email">{"num"}</label>
        <h1
          className="mb-4 text-base text-center text-red-600 
        py-3  rounded-md  bg-blue-200
        shadow-lg shadow-blue-400"
        >
          ورود با رمز یکبار مصرف
        </h1>

        <div className="mb-5  text-sm font-extralight text-gray-700 text-center ">
          <label htmlFor="email">
            کد شناسایی به شماره تلفن زیر ارسال گردید{' '}
          </label>
          <input
            Value={router.query.name}
            type="string"
            {...register('email', {
              required: 'لطغا شماره خودرا وارد کنید',
              minLength: {
                value: 5,
                // value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'لطغا شماره معتبر وارد کنید',
              },
            })}
            className="w-full text-center mt-3 bg-transparent  rounded-md"
            id="email"
          ></input>
          {errors.email && (
            <div className="text-red-500 ">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4  text-sm text-center  w-full  text-red-700 mt-20">
          <label htmlFor="password">
            {' لطفا کد شناسایی ارسال شده به تلفن همراه خود را وارد نمایید'}
          </label>
          <input
            type="password"
            {...register('password', {
              required:
                'لطفا کد شناسایی ارسال شده به تلفن  همراه خود را وارد نمایید',
              minLength: {
                value: 5,
                message: 'کد شناسایی بیشتر از 4 حرف است',
              },
            })}
            className="w-full px-5 my-2 py-3 bg-white rounded-md 
            shadow-lg shadow-blue-400
            text-center border-2 border-slate-400"
            id="password"
            autoFocus
          ></input>
          {errors.password && (
            <div className="text-red-500 px-5">{errors.password.message}</div>
          )}
        </div>

        <div className="mb-4  place-content-center flex content-center">
          <button
            className=" primary-button bg-blue-600  hover:bg-blue-800 rounded-md 
           text-white  w-24 text-sm h-10 mb-5 shadow-lg shadow-blue-400"
          >
            ورود
          </button>
        </div>
        {/* <div className="mb-4 ">
          Don&apos;t have an account? &nbsp;
          <Link href={`/register?redirect=${redirect || '/'}`}>Register</Link>
        </div> */}
      </form>
    </Layout>
  );
}
