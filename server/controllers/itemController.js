const Item = require('../models/Item');
const cloudinary = require('../config/cloudinaryConfig');

const translate = require('google-translate-api-x');

exports.createItem = async (req, res) => {
  try {
    const { title_en, description_en } = req.body;


    const translatedTitle = await translate(title_en, { to: 'ru' });
    const translatedDescription = await translate(description_en, { to: 'ru' });


    const imageUploads = await Promise.all(req.files.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.path);
      return { url: result.secure_url, created_at: new Date() };
    }));


    const newItem = new Item({
      title_en,
      title_ru: translatedTitle.text, 
      description_en,
      description_ru: translatedDescription.text, 
      images: imageUploads,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.log(error)
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
    const { id } = req.params; 
    const { title_en, description_en } = req.body;


    const translatedTitle = await translate(title_en, { to: 'ru' });
    const translatedDescription = await translate(description_en, { to: 'ru' });


    const updatedItem = await Item.findByIdAndUpdate(
      id,
      {
        title_en,
        title_ru: translatedTitle.text, 
        description_en,
        description_ru: translatedDescription.text, 
      },
      { new: true } 
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

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
