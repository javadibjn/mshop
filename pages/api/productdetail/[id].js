import Productdetail from '../../../models/Productdetail';
import db from '../../../utils/db';

const handler = async (req, res) => {
  await db.connect();
  const productdetail = await Productdetail.findById(req.query.id);
  await db.disconnect();
  res.send(productdetail);
};

export default handler;
