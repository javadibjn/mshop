import Image from 'next/image';

const Safe = () => {
  return (
    <div>
      <div
        className=" grid grid-rows-2  grid-cols-4  h-20  
        text-sm  rounded-xl  border-2  border-gray-300
       text-center  mt-2  shadow-xl  shadow-blue-400"
      >
        <div>
          <div>هفت روز هفته</div>
          <Image
            src="/icons/safe/seven48.jpg"
            alt=""
            width={20}
            height={20}
            loading="lazy"
            className="w-[38px] h-[38px] border rounded-xl  mx-auto mt-1
            justify-center shadow-lg shadow-blue-400 
             hover:brightness-105
            hover:scale-110"
          ></Image>
        </div>
        <div>
          <div>
            <div>ضمانت کالا</div>
            <Image
              src="/icons/safe/asl1.png"
              alt=""
              width={20}
              height={20}
              loading="lazy"
              className=" w-10  h-10  border rounded-xl  mx-auto mt-1
            justify-center shadow-lg shadow-blue-400
             hover:brightness-105
            hover:scale-110"
            ></Image>
          </div>
        </div>
        <div>
          <div>
            <div>ارسال سریع</div>
            <Image
              src="/icons/safe/Delivery1.png"
              alt=""
              width={20}
              height={20}
              loading="lazy"
              className=" w-10  h-10  border rounded-xl  mx-auto mt-1
            justify-center shadow-lg shadow-blue-400
             hover:brightness-105
            hover:scale-110"
            ></Image>
          </div>
        </div>
        <div>
          <div>
            <div> پرداخت آنلاین</div>
            <Image
              src="/icons/safe/pay1.png"
              alt=""
              width={20}
              height={20}
              loading="lazy"
              className=" w-10  h-10  border rounded-xl  mx-auto mt-1
            justify-center shadow-lg shadow-blue-400 
            hover:brightness-105
            hover:scale-110"
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Safe;
