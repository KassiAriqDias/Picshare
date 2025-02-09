const Item = require('../models/Item');
const cloudinary = require('../config/cloudinaryConfig');

exports.createItem = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    const imageUploads = await Promise.all(req.files.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.path);
      return result.secure_url;
    }));

    const newItem = new Item({ title, description, images: imageUploads });
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

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};