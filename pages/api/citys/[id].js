import City from '../../../models/City';
import db from '../../../utils/db';

const handler = async (req, res) => {
  await db.connect();
  const citys = await City.find();
  await db.disconnect();
  res.send(citys);
};

export default handler;
