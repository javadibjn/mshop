import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    grpp: { type: Number, required: true, default: 0 },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },

    aoutor: { type: String, required: true },
    motarjem: { type: String, required: true },
    shabak: { type: String, required: true },
    ghata: { type: String, required: true },
    pagecount: { type: String, required: true },
    chapshamsi: { type: String, required: true },
    chapmiladi: { type: String, required: true },
    jeld: { type: String, required: true },

    category2: { type: String, required: true },

    image: { type: String, required: true },
    price: { type: Number, required: true },

    rating: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    longdesc: { type: String, default: '--' },
    longdesc2: { type: String, default: '--' },
    longdesc3: { type: String, default: '--' },

    isFeatured: { type: Boolean, default: false },
    banner: String,
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
