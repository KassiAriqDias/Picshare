const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema(
  {
    images: [{
      url: String,
      created_at: { type: Date, default: Date.now },
      updated_at: { type: Date, default: Date.now },
      deleted_at: { type: Date, default: null }
    }],
    title_en: { type: String, required: true },
    title_ru: { type: String, required: true },
    description_en: { type: String, required: true },
    description_ru: { type: String, required: true },
    deleted_at: { type: Date, default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Item', ItemSchema);
