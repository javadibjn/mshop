import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

export default function ProductItem({ product, addToCartHandler }) {
  return (
    <div>
      {/* <div class="bg-gray-50  flex items-center justify-center  ">
        <div class="relative   ">
          // <div class="absolute top-0 -left-4 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-100 animate-spin"></div>
          <div class="absolute top-0 -right-4 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-100 animate-blob animation-delay-200"></div>
          <div class="absolute -bottom-8 left-20 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-100 animate-blob animation-delay-4000"></div> */}
      {/* <div class="m-8 relative space-y-4"> */}

      <div class="absolute top-0 -left-4 h-72 bg-purple-800 rounded-full mix-blend-multiply filter blur-xl opacity-100 "></div>
      <div
        className="flex rounded-lg mx-auto md:mx-0 xl:mx-auto 
        "
      >
        <div
          className="grid grid-cols-1 grid-row-2  p-0.5 
          text-sm  rounded-xl  group md:mx-5 
            cursor-pointer space-y-2 
           
            border-gray-200 hover:border-2
            hover:border-gray-500 transition-all 
            items-center 
            content-center  
            place-content-center
            place-items-between  
            shadow-lg shadow-blue-400 mb-4 w-full "
        >
          <Link href={`/product/${product.slug}`}>
            <div
              className="h-72  
           items-center rounded-lg
           place-items-between content-center
           place-content-center place-items-between
           px-0.5 pt-0.5 mx-auto   lg:pl-1.5  xl:pl-0 transition-all w-full"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={110}
                height={140}
                sizes="(max-width: 450px) 100vw,
              (max-width: 1200px) 50vw,33vw"
                style={{ width: '100%', height: '100%' }} //The point is right there!
                //OR className='w-100 h-100'
                placeholder="data:image/..." // "empty" | "blur" | "data:image/..."
                loading="lazy"
                className="w-60 h-60    rounded-lg 
             mx-auto mt-0 justify-center  border-0  hover:scale-105
              border-gray-400 hover:border-2 
              transition duration-300 ease-in-out  
               hover:brightness-110  shadow-lg  shadow-blue-400 contrast-125
              "
              />
            </div>
          </Link>
          <div className="flex items-center justify-between content-center space-x-4 text-sm font-bold">
            <div
              className="h-40  w-full  px-10 md:px-4
           items-center 
           place-items-between content-center
           place-content-center place-items-between
             pt-0.5 mx-auto 
          "
            >
              <Link href={`/product/${product.slug}`}>
                <h2 className="text-sm font-bold w-96 h-9 text-red-700 pt-2 ">
                  {product.name}
                </h2>
                <h2 className="text-sm font-bold w-auto h-9 text-blue-700 pt-0 ">
                  {product.description}
                </h2>

                <p className="mb-1 text-sm font-bold pt-1">{product.brand}</p>
                <div
                  className="grid  grid-rows-1 grid-cols-2  
                         content-center items-center "
                >
                  <div>
                    <div className="grid  grid-rows-1 grid-cols-2 pb-3">
                      <div className="text-sm  font-bold text-blue-700 text-left px-3">
                        {product.price}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-right text-gray-500">
                          تومان
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className=" flex items-center   content-center   place-content-center
                      place-items-between   mx-auto    "
                  >
                    <div
                      className="grid grid-col-1   content-center  align-middle 
                justify-center rounded-md bg-transparent text-transparent
                 hover:text-blue-900  hover:bg-red-50 "
                    >
                      <div>
                        <button
                          type="button"
                          onClick={() => addToCartHandler(product)}
                          class="text-white bg-blue-900 hover:bg-red-600 focus:ring-4 
              focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
              text-sm px-5 py-2.5 text-center inline-flex items-center mr-2
               dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-auto
               shadow-lg shadow-blue-400 "
                        >
                          {' '}
                          <svg
                            class="w-10 h-4     "
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 18 21"
                          >
                            <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                          </svg>
                        </button>
                      </div>
                      <div className=" rounded-3xl text-sm font-bold  text-center ">
                        اضافه به سبد
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
    //   </div>
    // </div>
  );
}
