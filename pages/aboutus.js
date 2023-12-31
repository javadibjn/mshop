import Layout from '../components/Layout';

const Aboutus = () => {
  const mtex =
    'خدمات آنلاین  فروش که در سالهای اخیر بسیار مورد توجه عموم  قرار گرفته ، موجب شد که انتشارات افریز با استفاده از آخرین تکنولوژی های  موجود اقدام به تهیه فروشگاه اینترنتی خود با نام افریز کتاب نماید';

  return (
    <Layout title="درباره ما">
      <div className=" text-md  font-bold  text-red-600"> درباره ما </div>
      <div
        className="   rounded-md  p-4 bg-gray-100 my-10
       mx-auto   shadow-md h-auto "
      >
        <div
          className=" flex break-normal bg-gray-50 
       rounded-sm text-justify text-sm font-bold  "
        >
          {mtex ? mtex : ''}
        </div>
      </div>
      <span>----------------------------------------------</span>
      <span>----------------------------------------------</span>
      <span>----------------------------------------------</span>
      <span>----------------------------------------------</span>
      <span>----------------------------------------------</span>
      <span>----------------------------------------------</span>
      <span>----------------------------------------------</span>
      <span>----------------------------------------------</span>
      <span>----------------------------------------------</span>
      <span>----------------------------------------------</span>
      <span>----------------------------------------------</span>
      <span>------------------------------</span>

      <div className=" text-sm  font-bold">فیلم و عکس</div>
      <span>----------------------------------------------</span>
      <span>----------------------------------------------</span>
      <span>----------------------------------------------</span>
      <span>----------------------------------------------</span>
      <span>----------------------------------------------</span>
      <span>----------------------------------------------</span>
      <span>----------------------------------------------</span>
      <span>----------------------------------------------</span>
      <span>----------------------------------------------</span>
      <span>----------------------------------------------</span>
      <span>----------------------------------------------</span>
    </Layout>
  );
};

export default Aboutus;
