const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require('cors');
const app = express();
const port = 3001;
const translate = require('google-translate-api-x');
const NEWS_API_KEY = "afe0596a0dbfcbc543cf16084bdc2d1d"

app.use(express.json());
// Log HTTP requests
app.use(morgan("dev"));
app.use(cors());

// MongoDB Atlas connection
const mongo_url = `mongodb+srv://Kassiyet:x8mWdUpxZoBOCdta@kassiyet.c2egr.mongodb.net/?retryWrites=true&w=majority&appName=Kassiyet`;
mongoose
  .connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB: ", err));

app.get("/", (req, res) => {
  res.status(200).json("This is the server side!");
});

app.get('/news', async (req, res) => {
  try {
    const response = await fetch(`https://api.mediastack.com/v1/news?access_key=${NEWS_API_KEY}&categories=entertainment,technology&languages=en&sort=popularity&limit=6`);
    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      return res.status(404).json({ error: 'No news found' });
    }

    // Select a random news article
    const randomIndex = Math.floor(Math.random() * data.data.length);
    const newsItem = data.data[randomIndex];

    // Translate title and description to Russian
    const translatedTitle = await translate(newsItem.title, { to: 'ru' });
    const translatedDescription = await translate(newsItem.description, { to: 'ru' });
    console.log(data);

    res.json({
      data: newsItem,
      data_ru: {
        title: translatedTitle.text,
        description: translatedDescription.text
      }
    });

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.get('/quote', async (req, res) => {
  try {
    const response = await fetch('https://favqs.com/api/qotd');
    const data = await response.json();

    if (!data || !data.quote || !data.quote.body || !data.quote.author) {
      return res.status(404).json({ error: 'No quote found' });
    }

    // Translate quote text and author to Russian
    const [translatedText, translatedAuthor] = await Promise.all([
      translate(data.quote.body, { to: 'ru' }),
      translate(data.quote.author, { to: 'ru' }),
    ]);

    res.json({
      quote: {
        body: data.quote.body,
        author: data.quote.author,
      },
      quote_ru: {
        body: translatedText.text,
        author: translatedAuthor.text,
      }
    });

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quote' });
  }
});

// Error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Routes for user-related operations
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

// Admin routes
const adminRoutes = require('./routes/adminRoutes');
app.use('/admin', adminRoutes);

const itemRoutes = require('./routes/itemRoutes');
app.use('/api/items', itemRoutes);