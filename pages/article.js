import Layout from '../components/Layout';
import db from '../utils/db';
import Article from '../models/Article';
// import Myswiper from '../components/Myswiper';
import Myswipernotitle from '../components/Myswipernotitle';
// import { useEffect, useState } from 'react';
// import Myswiper from '../components/Myswiper';
// import Image from 'next/image';
export const slide_img = [
  { id: 0 },
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
];
export default function ArticleHome({ article }) {
  //  const [randomArray, setRandomArray] = useState([]);

  //  useEffect(() => {
  //    const randomizeArray = [...slide_img].sort(() => 0.5 - Math.random());
  //    setRandomArray(randomizeArray.slice(0, 10));
  //  }, []);

  // console.log(
  //   '11111111111111111111111111111111111111111111111111',
  //  slide_img[randomArray]
  // );

  return (
    <Layout>
      <div
        className="grid grid-cols-1 md:grid-cols-[70%_30%] 
        text-base border-b-0 first-letter first-letter
        items-stretch  "
      >
        <div
          className=" py-auto   rounded-xl  border-2  border-gray-300  
           p-4 bg-gray-50 my-8 ml-3
       mx-auto   shadow-lg shadow-blue-400 h-auto "
        >
          <h1
            className=" text-blue-500  font-bold  bg-gray-100  rounded-xl px-6
          pb-5"
          >
            {/* {article ? article.title : ''} */}
            {article[0].title}
          </h1>
          <div
            className=" flex break-normal bg-gray-50 
           rounded-sm text-justify  font-bold px-10 "
          >
            {article[0] ? article[0].desc : ''}
          </div>
        </div>
        <div
          className=" flex   rounded-xl   
          my-0  md:my-8
       mx-auto   shadow-lg shadow-blue-400  h-fit  w-[100%] 
        transform   border-b-0  "
        >
          <Myswipernotitle />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[70%_30%]  border-b-0">
        <div
          className="    rounded-xl  border-2  border-gray-300  
           p-4 bg-gray-50 my-8 ml-3
       mx-auto   shadow-lg shadow-blue-400 h-auto "
        >
          <h1
            className=" text-blue-500  font-bold  bg-gray-100  rounded-xl px-6
           pb-5"
          >
            {/* {article ? article.title : ''} */}
            {article[1].title}
          </h1>
          <div
            className=" flex break-normal bg-gray-50 
           rounded-sm text-justify  font-bold px-10 "
          >
            {article[1] ? article[1].desc : ''}
          </div>
        </div>
        <div
          className=" flex   rounded-xl   
          my-0  md:my-8
       mx-auto   shadow-lg shadow-blue-400 h-auto w-[100%] 
        transform   border-b-0"
        >
          <Myswipernotitle />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[70%_30%]  border-b-0">
        <div
          className="    rounded-xl  border-2  border-gray-300  
           p-4 bg-gray-50 my-8 ml-3
       mx-auto   shadow-lg shadow-blue-400 h-auto "
        >
          <h1
            className=" text-blue-500  font-bold  bg-gray-100  rounded-xl px-6
           pb-5"
          >
            {/* {article ? article.title : ''} */}
            {article[2].title}
          </h1>
          <div
            className=" flex break-normal bg-gray-50 
           rounded-sm text-justify  font-bold px-10 "
          >
            {article[2] ? article[2].desc : ''}
          </div>
        </div>
        <div
          className=" flex   rounded-xl   
          my-0  md:my-8
       mx-auto   shadow-lg shadow-blue-400 h-auto w-[100%] 
        transform   border-b-0"
        >
          <Myswipernotitle />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[70%_30%]  border-b-0">
        <div
          className="    rounded-xl  border-2  border-gray-300  
           p-4 bg-gray-50 my-8 ml-3
       mx-auto   shadow-lg shadow-blue-400 h-auto "
        >
          <h1
            className=" text-blue-500  font-bold  bg-gray-100  rounded-xl px-6
                 pb-5"
          >
            {/* {article ? article.title : ''} */}
            {article[3].title}
          </h1>
          <div
            className=" flex break-normal bg-gray-50 
           rounded-sm text-justify  font-bold px-10 "
          >
            {article[3] ? article[3].desc : ''}
          </div>
        </div>
        <div
          className=" flex   rounded-xl   
          my-0  md:my-8
       mx-auto   shadow-lg shadow-blue-400 h-auto w-[100%] 
        transform   border-b-0"
        >
          <Myswipernotitle />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[70%_30%]  border-b-0">
        <div
          className="    rounded-xl  border-2  border-gray-300  
           p-4 bg-gray-50 my-8 ml-3
       mx-auto   shadow-lg shadow-blue-400 h-auto "
        >
          <h1
            className=" text-blue-500  font-bold  bg-gray-100  rounded-xl px-6
                 pb-5"
          >
            {/* {article ? article.title : ''} */}
            {article[4].title}
          </h1>
          <div
            className=" flex break-normal bg-gray-50 
           rounded-sm text-justify  font-bold px-10 "
          >
            {article[4] ? article[4].desc : ''}
          </div>
        </div>
        <div
          className=" flex   rounded-xl   
          my-0  md:my-8
       mx-auto   shadow-lg shadow-blue-400 h-auto w-[100%] 
        transform   border-b-0"
        >
          <Myswipernotitle />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[70%_30%]  border-b-0">
        <div
          className="    rounded-xl  border-2  border-gray-300  
           p-4 bg-gray-50 my-8 ml-3
       mx-auto   shadow-lg shadow-blue-400 h-auto "
        >
          <h1
            className=" text-blue-500  font-bold  bg-gray-100  rounded-xl px-6
                 pb-5"
          >
            {/* {article ? article.title : ''} */}
            {article[5].title}
          </h1>
          <div
            className=" flex break-normal bg-gray-50 
           rounded-sm text-justify  font-bold px-10 "
          >
            {article[5] ? article[5].desc : ''}
          </div>
        </div>
        <div
          className=" flex   rounded-xl   
          my-0  md:my-8
       mx-auto   shadow-lg shadow-blue-400 h-auto w-[100%] 
        transform   border-b-0"
        >
          <Myswipernotitle />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[70%_30%]  border-b-0">
        <div
          className="    rounded-xl  border-2  border-gray-300  
           p-4 bg-gray-50 my-8 ml-3
       mx-auto   shadow-lg shadow-blue-400 h-auto "
        >
          <h1
            className=" text-blue-500  font-bold  bg-gray-100  rounded-xl px-6
                 pb-5"
          >
            {/* {article ? article.title : ''} */}
            {article[6].title}
          </h1>
          <div
            className=" flex break-normal bg-gray-50 
           rounded-sm text-justify  font-bold  px-10 "
          >
            {article[6] ? article[6].desc : ''}
          </div>
        </div>
        <div
          className=" flex   rounded-xl   
          my-0  md:my-8
       mx-auto   shadow-lg shadow-blue-400 h-auto w-[100%] 
        transform   border-b-0"
        >
          <Myswipernotitle />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[70%_30%]  border-b-0">
        <div
          className="    rounded-xl  border-2  border-gray-300  
           p-4 bg-gray-50 my-8 ml-3
       mx-auto   shadow-lg shadow-blue-400 h-auto "
        >
          <h1
            className=" text-blue-500  font-bold  bg-gray-100  rounded-xl px-6
                 pb-5"
          >
            {/* {article ? article.title : ''} */}
            {article[7].title}
          </h1>
          <div
            className=" flex break-normal bg-gray-50 
           rounded-sm text-justify  font-bold  px-10 "
          >
            {article[7] ? article[7].desc : ''}
          </div>
        </div>
        <div
          className=" flex   rounded-xl   
          my-0  md:my-8
       mx-auto   shadow-lg shadow-blue-400 h-auto w-[100%] 
        transform   border-b-0"
        >
          <Myswipernotitle />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[70%_30%]  border-b-0">
        <div
          className="    rounded-xl  border-2  border-gray-300  
           p-4 bg-gray-50 my-8 ml-3
       mx-auto   shadow-lg shadow-blue-400 h-auto "
        >
          <h1
            className=" text-blue-500  font-bold  bg-gray-100  rounded-xl px-6
                 pb-5"
          >
            {/* {article ? article.title : ''} */}
            {article[8].title}
          </h1>
          <div
            className=" flex break-normal bg-gray-50 
           rounded-sm text-justify  font-bold  px-10 "
          >
            {article[8] ? article[8].desc : ''}
          </div>
        </div>
        <div
          className=" flex   rounded-xl   
          my-0  md:my-8
       mx-auto   shadow-lg shadow-blue-400 h-auto w-[100%] 
        transform   border-b-0"
        >
          <Myswipernotitle />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[70%_30%]  border-b-0">
        <div
          className="    rounded-xl  border-2  border-gray-300  
           p-4 bg-gray-50 my-8 ml-3
       mx-auto   shadow-lg shadow-blue-400 h-auto "
        >
          <h1
            className=" text-blue-500  font-bold  bg-gray-100  rounded-xl px-6
                 pb-5"
          >
            {/* {article ? article.title : ''} */}
            {article[9].title}
          </h1>
          <div
            className=" flex break-normal bg-gray-50 
           rounded-sm text-justify  font-bold  px-10 "
          >
            {article[9] ? article[9].desc : ''}
          </div>
        </div>
        <div
          className=" flex   rounded-xl   
          my-0  md:my-8
       mx-auto   shadow-lg shadow-blue-400 h-auto w-[100%] 
        transform   border-b-0"
        >
          <Myswipernotitle />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[70%_30%]  border-b-0">
        <div
          className="    rounded-xl  border-2  border-gray-300  
           p-4 bg-gray-50 my-8 ml-3
       mx-auto   shadow-lg shadow-blue-400 h-auto "
        >
          <h1
            className=" text-blue-500  font-bold  bg-gray-100  rounded-xl px-6
                 pb-5"
          >
            {/* {article ? article.title : ''} */}
            {article[10].title}
          </h1>
          <div
            className=" flex break-normal bg-gray-50 
           rounded-sm text-justify  font-bold  px-10 "
          >
            {article[10] ? article[10].desc : ''}
          </div>
        </div>
        <div
          className=" flex   rounded-xl   
          my-0  md:my-8
       mx-auto   shadow-lg shadow-blue-400 h-auto w-[100%] 
        transform   border-b-0"
        >
          <Myswipernotitle />
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const article = await Article.find().lean();
  console.log(article.title);
  return {
    props: {
      article: article.map(db.convertDocToObj),
    },
  };
}
