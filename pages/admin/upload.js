// import type { NextPage } from 'next';
import Head from 'next/head';
// import MultipleFileUploadForm from '../../components/MultipleFileUploadForm';
import SingleFileUploadForm from '../../components/SingleUploadForm';
// import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
// import { useState } from 'react';
// import Link from 'next/link';
import Image from 'next/image';

// import Image from 'next/image';
// import useSWR from 'swr';

const Upload = ({ dirs }) => {
  return (
    <div>
      <Head>
        <title>File uploader</title>
        <meta name="description" content="File uploader" />
      </Head>
      <div className="flex flex-row">
        <div className="basis-3/4  rounded-2xl">
          <div className=" my-2 h-80">
            <div className=" grid grid-rows-1 grid-cols-2 sm:grid-cols-3  lg:grid-cols-4">
              {dirs.map((item) => (
                <Image
                  key={item.name}
                  className="  text-black"
                  src={'/images/' + item}
                  alt={item.name}
                  width={150}
                  height={150}
                >
                  {item.name}
                </Image>
              ))}
              <div>222</div>
            </div>
          </div>
        </div>
        <main className="basis-1/4">
          <div className="w-full max-w-3xl px-3 mx-auto">
            <h1 className="mb-10 text-3xl font-bold text-gray-900">
              آپلود فایل
            </h1>

            <div className="space-y-10">
              <div>
                <h2 className="mb-3 text-xl font-bold text-gray-900">
                  آپلودیک فایل
                </h2>
                <SingleFileUploadForm />
              </div>
              {/* <div>
                <h2 className="mb-3 text-xl font-bold text-gray-900">
                  آپلود چند فایل
                </h2>
                <MultipleFileUploadForm />
              </div> */}
            </div>
          </div>
        </main>
      </div>
    </div>
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
Upload.auth = { adminOnly: true };

export default Upload;
