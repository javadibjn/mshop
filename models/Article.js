import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    desc2: { type: String, required: true },
    desc3: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Article =
  mongoose.models.Article || mongoose.model('Article', articleSchema);
export default Article;
