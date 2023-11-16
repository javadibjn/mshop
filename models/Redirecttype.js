import mongoose from 'mongoose';

const redirecttypeSchema = new mongoose.Schema(
  {
    grpp: { type: Number, required: true, default: 0 },
    aoutor: { type: String, required: true },
    motarjem: { type: String, required: true },
    shabak: { type: String, required: true },
    ghata: { type: String, required: true },
    pagecount: { type: String, required: true },
    chapshamsi: { type: String, required: true },
    chapmiladi: { type: String, required: true },
    jeld: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Redirecttype =
  mongoose.models.Redirecttype ||
  mongoose.model('Redirecttype', redirecttypeSchema);
export default Redirecttype;
