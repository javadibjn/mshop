// import { GetServerSideProps, NextPage } from "next";
import { useState } from 'react';
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
// import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../components/Layout';

// interface Props {
//   dirs: string[];
// }

const Nextupload = ({ dirs }) => {
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
    <Layout>
      <div className=" grid grid-rows-2 grid-cols-1   ">
        <div className=" absolut   max-h-72 mt-10">
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
            className="bg-red-600 p-3 w-40 text-center rounded-md text-white"
          >
            {uploading ? 'Uploading..' : 'آپلود'}
          </button>
        </div>
        <div className="absolut max-h-5 text-base  font-bold mt-10 mb-0">
          {'  لیست تصویر ها '}
        </div>

        <div className="  snap-x align-top      ">
          <div className="overflow-x-auto flex flex-row    ">
            {dirs.map((item) => (
              <Image
                key={item.name}
                className="px-2  text-black"
                src={'/images/' + item}
                alt={item.name}
                width={150}
                height={150}
              >
                {item.name}
              </Image>
            ))}

            {/* {dirs.map((item) => (
              <Link key={item} href={'/images/' + item}>
                {item}
              </Link>
            ))} */}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export const getServerSideProps = async () => {
  const props = { dirs: [] };
  try {
    const dirs = await fs.readdir(path.join(process.cwd(), '/public/images'));
    props.dirs = dirs;
    return { props };
  } catch (error) {
    return { props };
  }
};
Nextupload.auth = { adminOnly: true };
export default Nextupload;
