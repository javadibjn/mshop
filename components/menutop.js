import { useState } from 'react';
// import { close, logo, menu } from "../assets";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Littleform from './littleform';
import Testbg from './Testbg';
// import Pushcomp from '/components/pushcomp';
// import Littleform from './littleform';
// import {
//   ShoppingCartIcon,
//   UserIcon,
//   XCircleIcon,
// } from '@heroicons/react/24/outline';

export const navLinks = [
  {
    id: 'home',
    title: 'خانه',
    linkthis: '/',
    image: '/icons/home.gif',
  },
  // {
  //   id: 'features',
  //   title: 'امکانات',
  //   linkthis: '/',
  //   image: '/icons/nongreen.png',
  // },
  {
    id: 'Events',
    title: 'راهنما ',
    linkthis: '/guid',
    image: '/icons/non1.png',
  },
];

const Menutop = () => {
  const [active, setActive] = useState('Home');
  const [toggle, setToggle] = useState(false);
  // const { article } = props;

  //  const [dynComp, setDynComp] = useState(<div />);

  // const loadcomp = (id) => {
  //   if (id === 'clients') return <Littleform />;
  // };

  return (
    <React.Fragment>
      <div
        className="flex    mt-2 md:mt-8
           bg-transparent
              sm:bg-transparent  sm:grid-cols-2  sm:grid-rows-1
              md:bg-transparent  md:grid-cols-2  md:grid-rows-1
              lg:bg-transparent
              xl:bg-transparent
              2xl:bg-violet-100
                    rounded-md   
                    items-center 
                    content-center  
                    place-content-center
                    place-items-between"
      >
        <div className="ml-3  h-10 w-16 md:h-16  md:w-20 place-items-start mt-0   ">
          <Link href="/" rel="">
            <Image
              src="/icons/afriz.jpg"
              alt=""
              width={65}
              height={65}
              sizes="(max-width: 80px) 80vw,
              (max-width: 100px) 50vw,50vw  "
              style={{ width: '100%', height: '100%' }} //The point is right there!
              //OR className='w-100 h-100'

              loading="lazy"
              className="   border rounded-xl  
               justify-center mx-0 shadow-lg  shadow-blue-400"
            ></Image>
          </Link>
        </div>
      </div>
      <nav
        className="w-full flex  h-15  justify-between
       items-center navbar   text-sm "
      >
        <ul
          className="list-none md:flex hidden
         justify-start items-center flex-1 mr-1 "
        >
          {navLinks.map((nav, index) => (
            <li
              // onMouseEnter={() => {
              //   if (nav.title === 'clients') {
              //     `${(<Littleform />)}`;
              //   }
              // }}
              key={nav.id}
              className={`font-poppins font-bold cursor-pointer text-[16px] ${
                active === nav.title ? 'text-white' : 'text-dimWhite'
              } ${index === navLinks.length - 1 ? 'mr-0' : 'mr-0'}`}
              onClick={() => setActive(nav.title)}
            >
              <div
                className=" mx-2  text-blue-900 hover:text-red-600  border-b-2
                 border-indigo-400
                hover:border-indigo-700  rounded-b-none
               rounded-md  w-24  text-center  mr-px  
                hover:bg-gray-100 shadow   shadow-blue-400 "
              >
                <Link href={`${nav.linkthis}`} rel="">
                  <div
                    className="grid  grid-rows-1  w-14 grid-cols-2 
                     content-start
                   items-center py-1 "
                  >
                    <div>
                      <Image
                        src={nav.image}
                        alt={nav.title}
                        width={20}
                        height={20}
                        loading="lazy"
                        className="w-[38px] h-[24px]    rounded-md 
              mt-0 mr-1 ml-1 justify-center bg-white shadow-lg  shadow-blue-400"
                      />
                    </div>
                    <div className="text-sm  mx-2  ">
                      {/* {loadcomp(nav.id)} */}

                      {nav.title}
                    </div>
                  </div>
                </Link>
              </div>
              {/* {loadcomp(nav.id)} */}
            </li>
          ))}
          <Littleform>
            <li
              className="font-poppins font-bold cursor-pointer text-[16px] 
              text-center transform items-center "
            >
              <div
                className=" mx-2  text-blue-900 hover:text-red-600  border-b-2
                 border-indigo-400
                hover:border-indigo-700  rounded-b-none
               rounded-md  w-24  text-center  mr-px  h-9
                hover:bg-gray-100 shadow   shadow-blue-400 "
              >
                <div
                  className="grid  grid-rows-1  w-14 grid-cols-2 
                     content-start   py-1 "
                >
                  <div>
                    <Image
                      src={'/icons/nonred.png'}
                      alt={'تماس با ما'}
                      width={20}
                      height={20}
                      loading="lazy"
                      className="w-[38px] h-[24px]    rounded-md  mt-0 mr-1 ml-1 
                      justify-center bg-white shadow-lg  shadow-blue-400"
                    />
                  </div>

                  <div className="text-sm mx-2">تماس </div>
                </div>
              </div>
              {/* {loadcomp(nav.id)} */}
            </li>
          </Littleform>
        </ul>
        <div
          className=" w-fit sm:w-full content-center  justify-center rounded-lg shadow-lg    
         shadow-blue-400 "
        >
          <Testbg />
          {/* <Pushcomp
            article={article}
            className="w-10  bg-red-500 h-12 rounded-md  "
          /> */}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex flex-1 justify-end items-center  w-5 h-5 shadow  mr-1 ">
          <Image
            width={24}
            height={24}
            src={
              toggle ? '/icons/icons8-close.svg' : '/icons/icons8-menu-48.png'
            }
            alt="menu"
            className="w-[38px] h-[38px] object-contain hover:bg-white"
            onClick={() => setToggle(!toggle)}
          />

          {/* Sidebar */}
          <div
            className={`${
              !toggle ? 'hidden' : 'flex'
            } p-4 bg-black-gradient absolute 
            top-0 left-20 mx-0 my-0 min-w-[240px]
             rounded-xl sidebar  mt-10   h-400  `}
          >
            <ul
              className="list-none flex mt-61  pt-1
               backdrop:justify-start
             items-center flex-1 flex-col rounded-xl  w-40 
              text-white bg-gray-200  h-400 z-50  "
            >
              {navLinks.map((nav, index) => (
                <li
                  key={nav.id}
                  className={`font-poppins  my-0.25  pt-1.5
                    cursor-pointer rounded-md w-36 h-10
                    bg-blue-900  hover:bg-white  hover:text-red-600
                   text-center  font-bold z-40 mb-5 shadow-xl  shadow-blue-400
                  text-[16px]   ${
                    active === nav.title ? 'text-white' : 'text-dimWhite'
                  } ${index === navLinks.length - 1 ? 'mb-0' : 'mb-4'}`}
                  onClick={() => setActive(nav.title)}
                >
                  <Link href={`${nav.linkthis}`} rel="">
                    <div
                      className="grid  grid-rows-1  w-14 grid-cols-2 
                     content-start items-center "
                    >
                      <div className="">
                        <Image
                          src={nav.image}
                          alt={nav.title}
                          width={20}
                          height={20}
                          loading="lazy"
                          className="w-[38px] h-[24px]    border rounded-md 
              mt-0 justify-center  mr-1 bg-white "
                        />
                      </div>
                      <div className="mx-2  text-sm "> {nav.title}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Menutop;

// function NavIcon({ children }) {
//   return (
//     <div
//       className="rounded-full h-6 w-6  items-center  flex flex-row
//       justify-center cursor-pointer  hover:bg-gray-100  transition-colors"
//     >
//       {children}
//     </div>
//   );
// }
