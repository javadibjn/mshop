import mongoose from 'mongoose';

const productdetailSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },

    motarjem: { type: String, required: false },
    shabak: { type: String, required: true, unique: true },
    ghata: { type: String, required: true },
    pagecount: { type: Number, required: true },
    chapshamsi: { type: Number, required: true },
    chapmojadi: { type: Number, required: true },
    jeld: { type: String, required: true },
    serichap: { type: Number, required: true, default: 1 },
    longdesc: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Productdetail =
  mongoose.models.Productdetail ||
  mongoose.model('Productdetail', productdetailSchema);
export default Productdetail;
