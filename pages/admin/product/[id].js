import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Layout from '../../../components/Layout';
import { getError } from '../../../utils/error';
import Image from 'next/image';
// import { revalidatePath } from 'next/cache';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true, errorUpdate: '' };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false, errorUpdate: '' };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };

    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
}
export default function AdminProductEditScreen() {
  const { query } = useRouter();
  const productId = query.id;
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ reValidateMode: 'onBluruploadHandler' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/products/${productId}`);
        dispatch({ type: 'FETCH_SUCCESS' });
        setValue('name', data.name);
        setValue('slug', data.slug);
        setValue('description', data.description);
        setValue('aoutor', data.aoutor);
        setValue('motarjem', data.motarjem);
        setValue('price', data.price);
        setValue('image', data.image);
        setValue('category', data.category);
        setValue('category2', data.category2);
        setValue('brand', data.brand);
        setValue('shabak', data.shabak);
        setValue('ghata', data.ghata);
        setValue('pagecount', data.pagecount);
        setValue('chapshamsi', data.chapshamsi);
        setValue('chapmiladi', data.chapmiladi);
        setValue('jeld', data.jeld);

        setValue('countInStock', data.countInStock);
        setValue('description', data.description);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, [productId, setValue]);

  const router = useRouter();

  const submitHandler = async ({
    name,
    slug,
    price,
    category,
    category2,
    image,
    brand,
    countInStock,
    description,
    aoutor,
    motarjem,
    shabak,
    ghata,
    pagecount,
    chapshamsi,
    chapmiladi,
    jeld,
  }) => {
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(`/api/admin/products/${productId}`, {
        name,
        slug,
        price,
        category,
        category2,
        image,
        brand,
        countInStock,
        description,
        aoutor,
        motarjem,
        shabak,
        ghata,
        pagecount,
        chapshamsi,
        chapmiladi,
        jeld,
      });
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('Product updated successfully');
      router.push('/admin/products');
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  };

  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedFile, setSelectedFile] = useState('');

  const handleUpload = async () => {
    setUploading(true);
    try {
      if (!selectedFile) {
        setUploading(false);
        return;
      }
      const formData = new FormData();
      formData.append('myImage', selectedFile);
      const { data } = await axios.post('/api/next_fileupload_api', formData);
      console.log(data);
      // revalidatePath('/');
      alert('آپلود با موفقیت انجام شد:');
    } catch (error) {
      console.log(error.response?.data);
      alert('متاسفانه مشکلی وجود دارد.');
    }
    setSelectedImage('');
    setSelectedFile('');
    setUploading(false);
  };

  return (
    <Layout title={`Edit Product ${productId}`}>
      <div className="">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="alert-error">{error}</div>
        ) : (
          <form
            className="mx-auto    text-sm"
            onSubmit={handleSubmit(submitHandler)}
          >
            <div className="grid md:grid-cols-3 md:gap-3">
              <div className="w-full">
                <h1 className="mb-2 text-sm  text-blue-600">{`ویرایش ${productId}`}</h1>
                <div className="mb-2">
                  <label htmlFor="name" className="text-blue-600">
                    نام
                  </label>
                  <input
                    type="text"
                    className="w-full  text-sm"
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
                  <label htmlFor="description" className="text-blue-600">
                    شرح
                  </label>
                  <input
                    type="text"
                    className="w-full  text-sm"
                    id="description"
                    {...register('description', {
                      required: 'Please enter description',
                    })}
                  />
                  {errors.description && (
                    <div className="text-red-500">
                      {errors.description.message}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="aoutor" className="text-blue-600">
                    نویسنده
                  </label>
                  <input
                    type="text"
                    className="w-full  text-sm"
                    id="aoutor"
                    {...register('aoutor', {
                      required: 'Please enter aoutor',
                    })}
                  />
                  {errors.aoutor && (
                    <div className="text-red-500">{errors.aoutor.message}</div>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="motarjem" className="text-blue-600">
                    مترجم
                  </label>
                  <input
                    type="text"
                    className="w-full  text-sm"
                    id="motarjem"
                    {...register('motarjem', {
                      required: 'Please enter description',
                    })}
                  />
                  {errors.description && (
                    <div className="text-red-500">
                      {errors.description.message}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="brand" className="text-blue-600">
                    برند
                  </label>
                  <input
                    type="text"
                    className="w-full  text-sm"
                    id="brand"
                    {...register('brand', {
                      required: 'Please enter brand',
                    })}
                  />
                  {errors.brand && (
                    <div className="text-red-500">{errors.brand.message}</div>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="shabak" className="text-blue-600">
                    شابک
                  </label>
                  <input
                    type="text"
                    className="w-full  text-sm"
                    id="shabak"
                    {...register('shabak', {
                      required: 'Please enter brand',
                    })}
                  />
                  {errors.brand && (
                    <div className="text-red-500">{errors.brand.message}</div>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="ghata" className="text-blue-600">
                    قطع
                  </label>
                  <input
                    type="text"
                    className="w-full  text-sm"
                    id="ghata"
                    {...register('ghata', {
                      required: 'Please enter brand',
                    })}
                  />
                  {errors.brand && (
                    <div className="text-red-500">{errors.brand.message}</div>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="pagecount" className="text-blue-600">
                    تعداد صفحه
                  </label>
                  <input
                    type="text"
                    className="w-full  text-sm"
                    id="pagecount"
                    {...register('pagecount', {
                      required: 'Please enter brand',
                    })}
                  />
                  {errors.brand && (
                    <div className="text-red-500">{errors.brand.message}</div>
                  )}
                </div>
              </div>
              <div>
                <div className="mb-4 ">
                  <label htmlFor="chapshamsi" className="text-blue-600">
                    تاریخ انتشارو سری چاپ
                  </label>
                  <input
                    type="text"
                    className="w-full  text-sm"
                    id="chapshamsi"
                    {...register('chapshamsi', {
                      required: 'Please enter slug',
                    })}
                  />
                  {errors.slug && (
                    <div className="text-red-500">{errors.slug.message}</div>
                  )}
                </div>
                <div className="mb-4 ">
                  <label htmlFor="chapmiladi" className="text-blue-600">
                    تاریخ انتشارو میلادی
                  </label>
                  <input
                    type="text"
                    className="w-full  text-sm"
                    id="chapmiladi"
                    {...register('chapmiladi', {
                      required: 'Please enter slug',
                    })}
                  />
                  {errors.slug && (
                    <div className="text-red-500">{errors.slug.message}</div>
                  )}
                </div>
                <div className="mb-4 ">
                  <label htmlFor="jeld" className="text-blue-600">
                    نوع جلد
                  </label>
                  <input
                    type="text"
                    className="w-full  text-sm"
                    id="jeld"
                    {...register('jeld', {
                      required: 'Please enter slug',
                    })}
                  />
                  {errors.slug && (
                    <div className="text-red-500">{errors.slug.message}</div>
                  )}
                </div>
                <div className="mb-4 ">
                  <label htmlFor="slug" className="text-blue-600">
                    اسلاگ
                  </label>
                  <input
                    type="text"
                    className="w-full  text-sm"
                    id="slug"
                    {...register('slug', {
                      required: 'Please enter slug',
                    })}
                  />
                  {errors.slug && (
                    <div className="text-red-500">{errors.slug.message}</div>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="price" className="text-blue-600">
                    قیمت - تومان
                  </label>
                  <input
                    type="text"
                    className="w-full  text-sm"
                    id="price"
                    {...register('price', {
                      required: 'Please enter price',
                    })}
                  />
                  {errors.price && (
                    <div className="text-red-500">{errors.price.message}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="category" className="text-blue-600">
                    دسته بندی
                  </label>
                  <input
                    type="text"
                    className="w-full  text-sm"
                    id="category"
                    {...register('category', {
                      required: 'Please enter category',
                    })}
                  />
                  {errors.category && (
                    <div className="text-red-500">
                      {errors.category.message}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="category2" className="text-blue-600">
                    2 دسته بندی
                  </label>
                  <input
                    type="text"
                    className="w-full  text-sm"
                    id="category2"
                    {...register('category2', {
                      required: 'Please enter category2',
                    })}
                  />
                  {errors.category2 && (
                    <div className="text-red-500">
                      {errors.category2.message}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="countInStock" className="text-blue-600">
                    تعداد در انبار
                  </label>
                  <input
                    type="text"
                    className="w-full  text-sm"
                    id="countInStock"
                    {...register('countInStock', {
                      required: 'Please enter countInStock',
                    })}
                  />
                  {errors.countInStock && (
                    <div className="text-red-500">
                      {errors.countInStock.message}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <label htmlFor="image" className="text-blue-600">
                    تصویر
                  </label>
                  <input
                    type="text"
                    className="w-full  text-sm"
                    id="image"
                    {...register('image', {
                      required: 'Please enter image',
                    })}
                  />
                  {errors.image && (
                    <div className="text-red-500">{errors.image.message}</div>
                  )}
                </div>
                <div className="mb-4   h-56 ">
                  <label>
                    <input
                      className="block w-40 h-28 text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4  
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-transparent file:text-transparent text-transparent
                    hover:file:bg-violet-100  border-dashed border-x-4 
                    border-y-4 animate-bounce "
                      type="file"
                      onChange={({ target }) => {
                        if (target.files && target.files.length > 0) {
                          const file = target.files[0];
                          setSelectedImage(URL.createObjectURL(file));
                          setSelectedFile(file);
                        }
                      }}
                    />

                    <div
                      className="w-40 h-5 aspect-video rounded flex items-center
                          justify-center  cursor-pointer pb-0"
                    >
                      {selectedImage ? (
                        <Image
                          className="  text-black   pb-28"
                          src={selectedImage}
                          alt={selectedImage}
                          width={150}
                          height={150}
                        ></Image>
                      ) : (
                        <span className="text-sm">تصوبر را به اینجا بکشید</span>
                      )}
                    </div>
                  </label>
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    style={{ opacity: uploading ? '.5' : '1' }}
                    className="bg-red-600  hover:bg-red-800 p-3 w-40  text-center rounded-md text-white"
                  >
                    {' '}
                    {uploading ? 'Uploading..' : 'آپلود'}
                  </button>
                </div>
                <div>
                  <div className="mb-4 bg-blue-700 hover:bg-blue-900 p-3 rounded-lg text-center w-40 ">
                    <button
                      disabled={loadingUpdate}
                      className="primary-button text-white"
                    >
                      {loadingUpdate ? 'Loading' : 'ثبت'}
                    </button>
                  </div>
                  <div
                    className="text-white bg-blue-700 hover:bg-blue-900 focus:ring-4
                  focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                   text-sm p-2.5 text-center inline-flex items-center mr-2
                 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 
                  shadow-lg shadow-slate-600  w-10 h-10  mt-5"
                  >
                    <Link href={`/admin/products`} rel="" className="00">
                      <svg
                        class="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                      <span class="sr-only">Icon description</span>
                    </Link>
                    {/* <Link href={`/admin/products`}>Back</Link> */}
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
}

AdminProductEditScreen.auth = { adminOnly: true };
