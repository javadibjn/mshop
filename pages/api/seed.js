// import City from '../../models/City';
import Product from '../../models/Product';
// import Redirecttype from '../../models/Redirecttype';
// import User from '../../models/User';
import data from '../../utils/data';
import db from '../../utils/db';
// import Article from '../../models/Article';

const handler = async (req, res) => {
  await db.connect();

  // await Productdetail.deleteMany();
  // await Productdetail.insertMany(data.productdetail);
  // await City.deleteMany();
  // await City.insertMany(data.citys);
  // await User.deleteMany();
  // await User.insertMany(data.users);
  await Product.deleteMany();
  await Product.insertMany(data.products);
  // await Article.deleteMany();
  // await Article.insertMany(data.article);
  // await Redirecttype.deleteMany();
  // await Redirecttype.insertMany(data.redirecttype);

  await db.disconnect();
  res.send({ message: 'seeded successfully' });
};
export default handler;
