import Image from "next/image";
import { ChangeEvent, MouseEvent, useState } from "react";



const SingleFileUploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const  afterclick = () => {
      setFile(file); // we will use the file state, to send it later to the server
    // setPreviewUrl(URL.createObjectURL(file)); // we will use this to show the preview of the image

    //  alert("hiiiiiiiiiiiiiiiiiiiiiiiiiii")
    
  };

  const onFileUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;

    if (!fileInput.files) {
      alert("No file was chosen");
      return;
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      alert("Files list is empty");
      return;
    }

    const file = fileInput.files[0];

    /** File validation */
    if (!file.type.startsWith("image")) {
      alert("Please select a valide image");
      return;
    }

    /** Setting file state */
    setFile(file); // we will use the file state, to send it later to the server
    setPreviewUrl(URL.createObjectURL(file)); // we will use this to show the preview of the image

    /** Reset file input */
    e.currentTarget.type = "text";
    e.currentTarget.type = "file";
  };





  const onCancelFile = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!previewUrl && !file) {
      return;
    }
    setFile(null);
    setPreviewUrl(null);
  };

  const onUploadFile = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!file) {
      return;
    }


    try {
      var formData = new FormData();
      formData.append("media", file);
      formData.append("text","bijan");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const {
        data,
        error,
      }: {
        data: {
          url: string | string[];
        } | null;
        error: string | null;
      } = await res.json();

      if (error || !data) {
        alert(error || "Sorry! something went wrong.");
        return;
      }

       alert("File was uploaded successfylly:");
        setFile(null);
        setPreviewUrl(null);
    } catch (error) {
      console.error(error);
      alert("Sorry! something went wrong.");
    }
  };

  return (
    <>
    <div>
    <p>som text</p>
      <button  className="w-36  text-white 
       bg-blue-900" onMouseLeave={afterclick} >
           click me
      </button> 
        {/* <select  >
          <option>apple</option>
          <option>Banana</option>
          <option>orange</option>
        </select> */}
        
      </div>
  
       
   
    <form  
      className="w-full p-3 border border-gray-500 border-dashed"
      onSubmit={(e) => e.preventDefault()}
    >
        <label
            htmlFor="email"
            className="my-10  text-gray-600 {
            
          } "
          >
            لطفانام فایل را وارد نمایید
          </label>
          <input
            type="string"
            // {...register('email', {
            //   required: 'لطفا شماره موبایل خود را وارد کنید',
            //   minLength: {
            //     value: 11,
            //     message: 'لطفا شماره موبایل معتبر  وارد کنید',
            //   },
            // })}
            className="w-full   rounded-md text-base font-bold my-5 py-2 px-5"
            id="upfilename"
            autoFocus
          ></input>
          {/* {errors.email && (
            <div className=" text-red-900 ">{errors.email.message}</div>
          )} */}
      <div className="flex flex-col md:flex-row gap-1.5 md:py-4  bg-red-600"
      >
        <div className="flex-grow">
          {previewUrl ? (
            <div className="mx-auto w-80">
              <Image
                alt="file uploader preview"
                // objectFit="cover"
                src={previewUrl}
                width={50}
                height={50}
                // layout="fixed"
              />
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center h-full py-3 transition-colors duration-150 cursor-pointer hover:text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-14 h-14"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                />
              </svg>
              <strong className="text-sm font-medium">Select an image</strong>

               <strong className="text-sm font-medium">Select images</strong>
          <input
            className="block w-20 h-20  bg-red-500"
            name="file"
            type="file"
            onChange={onFileUploadChange}

          />
            </label>
          )}
        </div>
        <div className="flex mt-4 md:mt-0 md:flex-col justify-center gap-1.5">
          <button   
            disabled={!previewUrl}
            onClick={onCancelFile}
            
            className="w-1/2 px-4 py-3 text-sm font-medium text-white transition-colors duration-300 bg-gray-700 rounded-sm md:w-auto md:text-base disabled:bg-gray-400 hover:bg-gray-600"
          >
            کنسل
          </button>
          <button
            disabled={!previewUrl}
            onClick={onUploadFile}
            className="w-1/2 px-4 py-3 text-sm font-medium text-white transition-colors duration-300 bg-gray-700 rounded-sm md:w-auto md:text-base disabled:bg-gray-400 hover:bg-gray-600"
          >
            آپلود 
          </button>
        </div>
        
      </div>



      
    </form>
     </>
  );
};

export default SingleFileUploadForm;
