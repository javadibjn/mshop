import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Menu } from '@headlessui/react';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from '../utils/Store';
import DropdownLink from './DropdownLink';
import { useRouter } from 'next/router';
import SearchIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';
import Container from './Container';
import Menutop from './menutop';
import Image from 'next/image';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Footer from './footer';

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };

  const [query, setQuery] = useState('');

  const router = useRouter();
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  return (
    <>
      <Container className="">
        <Head>
          <title>{title ? title + ' - افریز کتاب' : 'افریز کتاب '}</title>
          <meta name="description" content="Ecommerce Website" />
          <link rel="icon" href="/icons/afriz.jpg" />
        </Head>

        <ToastContainer position="bottom-center" limit={1} />

        <div className="flex min-h-screen flex-col justify-between ">
          <header
            className="z-40  sticky top-0  bg-gray-100 rounded-xl 
           pb-0 shadow-lg shadow-blue-400"
          >
            <nav
              className="flex h-12 items-center px-4 justify-between
            rounded-lg rounded-b-none
             border-2  border-gray-300"
            >
              {/* <Link href="/" className="text-lg font-bold">
                انتشارات افریز
              </Link> */}

              <Menutop />

              <div className="flex items-center z-10 ">
                <Link
                  href="/cart"
                  className=" mx-4 px-2 text-blue-600 border-0 
                  shadow h-10 items-center rounded-md w-full "
                >
                  <div
                    className=" grid grid-rows-1 mt-0.5  grid-cols-2 rounded-md h-9 
                     border-t-1  border-gray-100 hover:bg-white
                  w-16  md:w-20 shadow-md shadow-blue-400 items-center"
                  >
                    <div className="justify-start z-50 px-1 ">
                      سبد
                      {cartItemsCount > 0 && (
                        <span
                          className="z-50  ml-4 rounded-full bg-red-600 
                    px-4 py-0 text-sm font-bold text-white "
                        >
                          {cartItemsCount}
                        </span>
                      )}
                    </div>
                    <div className="z-10   pl-2">
                      <svg
                        className="z-0"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-10 h-7"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>

                {status === 'loading' ? (
                  'Loading'
                ) : session?.user ? (
                  <Menu as="div" className="relative inline-block text-right ">
                    <div>
                      <Menu.Button
                        className="inline-flex w-full justify-center
                     rounded-md bg-blue-900 bg-opacity-70 px-4 py-2 text-sm
                      font-medium text-white hover:bg-opacity-90 focus:outline-none
                       focus-visible:ring-2 focus-visible:ring-black
                        focus-visible:ring-opacity-75 shadow-lg shadow-blue-400"
                      >
                        {session.user.name}
                        <ChevronDownIcon
                          className=" h-5 w-5 text-violet-200 hover:text-violet-100"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Menu.Items
                      className="absolute left-0 mt-2 w-32 origin-top-right 
                      divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1
                       ring-black ring-opacity-5 focus:outline-none 
                        "
                    >
                      {session.user.isAdmin && (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? 'bg-violet-500 text-white'
                                  : 'text-gray-900'
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              <DropdownLink
                                className="dropdown-link "
                                href="/profile"
                              >
                                مشخصات شما
                              </DropdownLink>
                            </button>
                          )}
                        </Menu.Item>
                      )}

                      {/* <Menu.Item className=" m-2 bg-red-500">
                        <DropdownLink
                          className="dropdown-link "
                          href="/order-history"
                        >
                          سفارش
                        </DropdownLink>
                      </Menu.Item> */}
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? 'bg-violet-500 text-white'
                                : 'text-gray-900'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            <DropdownLink
                              className="dropdown-link text-sm "
                              href="/order-history"
                            >
                              سفارش های شما
                            </DropdownLink>
                          </button>
                        )}
                      </Menu.Item>

                      <div className="">
                        {session.user.isAdmin && (
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active
                                    ? 'bg-violet-500 text-white'
                                    : 'text-gray-900'
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm `}
                              >
                                <DropdownLink
                                  className="dropdown-link "
                                  href="/admin/dashboard"
                                >
                                  داشبورد مدیریت
                                </DropdownLink>
                              </button>
                            )}
                          </Menu.Item>
                        )}
                      </div>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? 'bg-violet-500 text-white'
                                : 'text-gray-900'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            <a
                              className="dropdown-link  text-sm "
                              href="#"
                              onClick={logoutClickHandler}
                            >
                              خروج از حساب شما
                            </a>
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                ) : (
                  <Link
                    href="/login"
                    className="m-0 text-sm text-blue-600 hover:bg-white 
                    border-t-1  
                     shadow-md shadow-blue-400  rounded-md"
                  >
                    <div
                      className="grid  grid-rows-1  grid-cols-2 
                    justify-start   shadow  h-9 text-center
                     items-center  border-t-1 border-gray-400
                      rounded-md w-16 md:w-20
                    "
                    >
                      <div className="pr-1  ">ورود</div>
                      <div className="  ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.6}
                          stroke="currentColor"
                          className="w-10 h-7"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </nav>
            <div
              className=" mt-0 sticky top-0  rounded-lg rounded-t-none border-2 border-t-0
             border-gray-300 "
            >
              <div
                className="grid grid-rows-1  grid-cols-5 gap-x-20
                md:gap-x-44    lg:gap-x-80   xl:gap-x-96
                    content-end  
                    place-content-end
                    place-items-end justify-end pb-1"
              >
                <div className="col-span-4     mt-2">
                  <form
                    onSubmit={submitHandler}
                    className="mx-auto   justify-center  flex"
                  >
                    <input
                      onChange={(e) => setQuery(e.target.value)}
                      type="text"
                      className=" rounded-md items-center 
                     place-content-center 
                    text-sm  bg-slate-50  focus:ring-0 
                      px-2 w-52 sm:w-80 lg:w-96"
                      placeholder="جستجو"
                    />
                    <button
                      className=" rounded-md bg-amber-300   mr-0.5
                    p-1 text-sm dark:text-black shadow-md shadow-blue-400"
                      type="submit"
                      id="button-addon2"
                    >
                      <SearchIcon className=" w-7 h-5 rounded-lg"></SearchIcon>
                    </button>
                  </form>
                </div>
                <div className="ml-3 mr-10 mt-2  w-7   bg-violet-500  rounded-lg">
                  <Link
                    href="https://www.instagram.com/entesharat_afriz"
                    rel=""
                    className="00"
                  >
                    <Image
                      src="/icons/insta.png"
                      alt=""
                      width={30}
                      height={30}
                      loading="lazy"
                      className=" shadow-lg shadow-blue-400 rounded-lg"
                    ></Image>
                  </Link>
                </div>
                <div className="bg-red-500 "></div>
              </div>
            </div>
          </header>

          <main
            className="container m-auto mt-4 px-4 
            bg-gradient-to-r from-indigo-100
          "
          >
            {children}
          </main>
          <Footer />
        </div>
      </Container>
    </>
  );
}
