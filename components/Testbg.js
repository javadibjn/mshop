import React, { Fragment } from 'react';

export default function Testbg() {
  return (
    <Fragment>
      <div className=" flex flex-grow  w-full  bg-blue-500 h-8 rounded-md ">
        <div classname=" ">
          <span
            class="px-0 md:px-10 md:text-lg  text-sm md:font-bold  animate-pulse
           bg-gradient-to-r from-white  to-white bg-clip-text text-transparent
           text-center"
          >
            چرا کتاب می‌خوانم؟
          </span>
        </div>
        <div classname="px-1 md:px-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="rebeccapurple"
            stroke-dasharray="--"
            className="w-10 h-10  stroke-white stroke-2  items-center"
          >
            <path
              className="animate-[move_35s_linear_infinite]"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
            {/* Let's center our SVG in the middle of the page by giving its container
        the below classes. */}
          </svg>
        </div>
      </div>
    </Fragment>
  );
}
