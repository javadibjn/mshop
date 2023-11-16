'use server';

import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from './error';
// import MelipayamakApi from 'melipayamak';


export async function OTP(phone) {
  //    MelipayamakApi = require('melipayamak-api');
  console.log("1111111111111111111111111111111111");
   try {
     const res = await axios.post(
       'https://console.melipayamak.com/api/send/otp/4dbcde06077648a3ad426014f73f0959',
       { to: phone }
     );
     if (res.error) {
       toast.error(res.error);
       return;
     }
     const { data, status, statusText } = res;

     return {
       data,
       status,
       statusText,
     };
   } catch (err) {
     toast.error(getError(err));
     return;
   }
}

// export async function simpleSms() {
//   const res = await axios.post(
//     'https://console.melipayamak.com/api/send/simple/8a0ad3e4276344c493ef1abc5c102d16',
//     {
//       from: '50004001753061',
//       to: '09384264057',
//       text: 'تلگرام',
//     }
//   );

//   const { data, status, statusText } = res;
//   return {
//     data,
//     status,
//     statusText,
//   };
// }

// export async function advanceSms() {
//   const res = await axios.post(
//     'https://console.melipayamak.com/api/send/advanced/8a0ad3e4276344c493ef1abc5c102d16',
//     {
//       from: '50004001753061',
//       to: ['09384264057', '09903776525'],
//       text: '',
//     }
//   );

//   const { data, status, statusText } = res;
//   return {
//     data,
//     status,
//     statusText,
//   };
// }
