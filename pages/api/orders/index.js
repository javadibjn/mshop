import { getToken } from 'next-auth/jwt';

import Order from '../../../models/Order';
import db from '../../../utils/db';

const handler = async (req, res) => {

  const user = await getToken({ req });

  if (!user) {
      // console.log('3333333333333333333333333333333333', user);
    return res.status(401).send('signin required');
  }
  //  console.log('5555555555555555555555555', user);
  //    console.log('777777777777777', req.body);
  await db.connect();
  const newOrder = new Order({
    ...req.body,
    user: user._id,
  });

  const order = await newOrder.save();
  res.status(201).send(order);
};
export default handler;

// import nc from 'next-connect';
// import Order from '../../../models/Order';
// import { isAuth } from '../../../utils/auth';
// import db from '../../../utils/db';
// import { onError } from '../../../utils/error';

// const handler = nc({
//   onError,
// });
// handler.use(isAuth);

// handler.post(async (req, res) => {
//   await db.connect();
//   const newOrder = new Order({
//     ...req.body,
//     user: req.user._id,
//   });
//   const order = await newOrder.save();
//   res.status(201).send(order);
// });

// export default handler;
