// import Image from "next/image";
// import Link from "next/link";
import { useState } from "react";



const Littleform = ({  children }) => {
  const [toggle, setToggle] = useState(false);
  // const [active, setActive] = useState('Home');

  return (
    <div
      className=""
      onMouseMove={() => {
        if (!toggle) {
          setToggle(!toggle);
        }
      }}
    >
      <div className=" flex flex-1 justify-center items-center  w-1 h-1  -z-50 ">
        <div
          className={`${
            !toggle ? 'hidden' : 'flex'
          } p-4 bg-black-gradient  top-16 mr-40 relative 
            mx-0 my-0 min-w-[240px]
             rounded-xl   mt-10   h-400  `}
        >
          <ul
            className="list-none flex mt-61  pt-1
               backdrop:justify-center  text-center
             items-center flex-1 flex-col rounded-xl  w-40 
              text-blue-500   h-400 z-50  bg-slate-200 shadow-lg shadow-slate-600"
            onMouseLeave={() => {
              if (toggle) {
                setToggle(!toggle);
              }
            }}
          >
            <li className="font-bold  text-center  my-5 h-10
             text-red-600">تماس با ما</li>
            <li className="font-bold  text-blue-600 mb-3"> انتشارات افریز </li>
            <li

            // onClick={() => setActive(nav.title)}
            >
              <div
                className="   text-blue-700 hover:text-red-600  border-b-2
                 border-indigo-400
                hover:border-indigo-700  rounded-b-none
               rounded-md  w-24  text-center  mr-px  
                hover:bg-white font-bold  mb-6"
              >
                <div className="text-sm  mx-2  text-center"> {'021'}</div>
                <div className="text-sm  mx-2  text-center"> {'77460030'}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <main className="container m-auto mt-0 px-4">{children}</main>
    </div>
  );
};

export default Littleform;