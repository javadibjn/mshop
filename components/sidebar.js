// import Image from 'next/image';
// import Link from 'next/link';
import { useState } from 'react';
// import { Form } from 'react-hook-form';

export const navLinks = [
  {
    id: 'home',
    title: 'خانه',
    linkthis: '/',
    image: '/icons/home.gif',
  },
  {
    id: 'features',
    title: 'امکانات',
    linkthis: '/',
    image: '/icons/nongreen.png',
  },
  {
    id: 'Events',
    title: 'راهنما ',
    linkthis: '/',
    image: '/icons/non1.png',
  },
  {
    id: 'clients',
    title: 'تماس',
    linkthis: '/',
    image: '/icons/nonred.png',
  },
];

const Sidebar = () => {
  const [toggle, setToggle] = useState(false);
  // const [active, setActive] = useState('Home');

  //   const submitHandler = async ({ email }) => {
  //   // console.log('66666666666666666661111111111111111111111111111', { email });
  //   router.push({
  //     pathname: '/register',
  //     query: { name: email },
  //   });
  // };

  return (
    <div>
      {/* Sidebar */}
      <div
        className={`${
          !toggle ? 'flex' : 'flex'
        } p-4 bg-black-gradient absolute z-50 bg-green-500
            top-0 left-20 mx-0 my-0 min-w-[240px]
             rounded-xl   mt-10   h-400  `}
      >
        <div
          className="mx-auto   text-center  w-full
         text-base font-bold px-10   rounded-md 
         border-2  border-gray-400 shadow-lg shadow-slate-600 mb-10"
          onClick={() => setToggle(!toggle)}
        >
          <h1
            className="mb-4 text-base text-center text-red-600 mt-6
        py-3  rounded-md  bg-blue-200
        shadow-lg shadow-slate-600"
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
                جهت امنیت بیشتر
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
                // {...register('email', {
                //   required: 'لطفا شماره موبایل خود را وارد کنید',
                //   minLength: {
                //     value: 11,
                //     message: 'لطفا شماره موبایل معتبر  وارد کنید',
                //   },
                // })}
                className="w-full  text-center rounded-md 
            text-base font-bold my-5 py-2 px-5 first-letter 
            shadow-md shadow-slate-600  border-gray-100"
                id="tel"
                autoFocus
              ></input>
              {/* {errors.email && (
                  <div className=" text-red-900 ">{errors.email.message}</div>
                )} */}
            </div>
            <div className="mb-4  place-content-center flex content-center">
              <button
                className={`${
                  !toggle ? 'flex' : 'hidden'
                } p-4 bg-black-gradient absolute z-50 bg-red-500
             left-20 mx-0 my-0 min-w-[240px]
             rounded-xl   mt-10   h-400  `}
              >
                ادامه
              </button>
            </div>
          </div>
        </div>
        {/* </ul> */}
      </div>
    </div>
  );
};

export default Sidebar;
