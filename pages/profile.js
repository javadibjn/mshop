import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getError } from '../utils/error';
import axios from 'axios';
import Layout from '../components/Layout';

export default function ProfileScreen() {
  const { data: session } = useSession();

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue('name', session.user.name);
    setValue('email', session.user.email);
  }, [session.user, setValue]);

  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.put('/api/auth/update', {
        name,
        email,
        password,
      });
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      toast.success('پروفایل شما با موفقیت بروزرسانی شد');
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Profile">
      <form
        className="mx-auto max-w-screen-md  text-sm"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-md  text-red-600">ویرایش مشخصات </h1>

        <div className="mb-4">
          <label htmlFor="name">نام</label>
          <input
            type="text"
            className="w-full  bg-blue-100  rounded-md"
            id="name"
            autoFocus
            {...register('name', {
              required: 'لطفا نام را وارد کنید',
            })}
          />
          {errors.name && (
            <div className="text-red-500">{errors.name.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email">شماره تلفن</label>
          <input
            type="string"
            className="w-full  bg-blue-100  rounded-md"
            id="email"
            {...register('email', {
              required: 'لطفا شماره تلفن را وارد کنید',
              pattern: {
                // value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: ' شماره تلفن معتبر وارد نمایید',
              },
            })}
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password">کلمه عبور جدید</label>
          <input
            className="w-full  bg-blue-100  rounded-md"
            type="password"
            id="password"
            {...register('password', {
              required: 'لطفا کلمه عبور جدید را وارد کنید',
              minLength: { value: 6, message: 'password is more than 5 chars' },
            })}
          />
          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword">تکرار کلمه غبور</label>
          <input
            className="w-full   bg-blue-100  rounded-md"
            type="password"
            id="confirmPassword"
            {...register('confirmPassword', {
              required: 'لطفا کلمه عبور جدید را نکرار کنید',
              validate: (value) => value === getValues('password'),
              minLength: {
                value: 6,
                message: 'کلمه عبور با بیش از 5 حرف',
              },
            })}
          />
          {errors.confirmPassword && (
            <div className="text-red-500 ">
              {errors.confirmPassword.message}
            </div>
          )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === 'validate' && (
              <div className="text-red-500 ">با کلمه عبور بکسان نیست</div>
            )}
        </div>
        <div className="mb-4">
          <button
            className="primary-button  bg-red-600  rounded-md 
           text-white w-28  text-sm h-8"
          >
            وبرایش
          </button>
        </div>
      </form>
    </Layout>
  );
}

ProfileScreen.auth = true;
