const Item = require('../models/Item');
const cloudinary = require('../config/cloudinaryConfig');

exports.createItem = async (req, res) => {
  try {
    const { title_en, title_ru, description_en, description_ru } = req.body;
    
    const imageUploads = await Promise.all(req.files.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.path);
      return { url: result.secure_url, created_at: new Date() };
    }));

    const newItem = new Item({ title_en, title_ru, description_en, description_ru, images: imageUploads });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { title_en, title_ru, description_en, description_ru } = req.body;
    const updatedFields = { title_en, title_ru, description_en, description_ru, updatedAt: new Date() };

    if (req.files.length > 0) {
      const imageUploads = await Promise.all(req.files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path);
        return { url: result.secure_url, created_at: new Date(), updated_at: new Date() };
      }));
      updatedFields.images = imageUploads;
    }

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
    if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
