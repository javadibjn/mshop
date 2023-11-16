// import Layout from './Layout';
// import db from '../utils/db';
// import Article from '../models/Article';
// import Myswiper from '../components/Myswiper';
import { useEffect, useState } from 'react';
import Myswipernotitle from './Myswipernotitle';

export default function Pushcomp({ article }) {
  const [randomindex, setRandomindex] = useState([0]);

  useEffect(() => {
    if (article) setRandomindex(Math.floor(Math.random() * article.length));
  }, [article]);

  //   console.log('222222222222222222222222222222', article);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-[80%_20%]  border-b-0">
        <div
          className=" rounded-xl  border-2  border-gray-300  
           p-4   my-8  bg-gradient-to-r from-indigo-200
              shadow-lg shadow-blue-400 h-auto mx-2"
        >
          <h1
            className=" text-blue-500 text-sm font-bold 
           bg-gradient-to-r from-indigo-100  rounded-xl  px-6 pb-5"
          >
            {/* {randomindex} */}
            {article ? article[randomindex].title : ''}
          </h1>
          <div
            className=" flex break-normal bg-gray-50 
           rounded-xl text-justify text-sm font-bold px-10 "
          >
            {article ? article[randomindex].desc : ''}
          </div>
        </div>
        <div
          className=" flex   rounded-xl   mb-8
          my-0  md:my-8
          mx-auto   shadow-lg shadow-blue-400 h-auto w-[100%] 
          transform "
        >
          <Myswipernotitle />
        </div>
      </div>
    </div>
  );
}
