import bcryptjs from 'bcryptjs';
import User from '../../../models/User';
import db from '../../../utils/db';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }
  const { email, password } = req.body;
  // console.log('111111111222555111111111', password);
  if (
    // !name ||
    !email ||
    // !email.includes('@') ||
    !password ||
    password.trim().length < 5
  ) {
    res.status(422).json({
      message: 'Validation error',
    });
    return;
  }

  await db.connect();

  const existingUser = await User.findOne({ email: email });
  // console.log('111111111222555111111111', existingUser);
  // console.log('111111111666666666666666111111111', existingUser.email);
  // console.log('1111111117777777777711111111', password);
  if (existingUser) {
    const user = await existingUser.updateOne(
      { email: existingUser.email },
      { password: password }
    );
    await db.disconnect();
    res.status(201).send({
      message: 'Created user!',
      _id: user._id,
      // name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
    return;
  }
  // const existingUser = await User.findOne({ email: email });
  // if (existingUser) {
  //   res.status(201).send({
  //     message: ' user!',
  //     _id: user._id,
  //     name: user.name,
  //     email: user.email,
  //     isAdmin: user.isAdmin,
  //   });
  //   await db.disconnect();
  //   return;
  // }

  const newUser = new User({
    // name,
    email,
    password: bcryptjs.hashSync(password),
    isAdmin: false,
  });

  const user = await newUser.save();
  await db.disconnect();
  res.status(201).send({
    message: 'Created user!',
    _id: user._id,
    // name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
}

export default handler;
