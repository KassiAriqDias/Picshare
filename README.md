# PicShare

PicShare is a modern social media application inspired by Instagram. It empowers users to share, explore, and engage through an intuitive platform built with robust web technologies.

## 🚀 Features

- **User Registration & Authentication**
  - User sign-up and login.
  - Passwords are securely encrypted using **bcrypt**.
  - User authentication is managed via **JWT (JSON Web Tokens)**.
  - Admin dashboard to monitor user sign-in history.

- **Announcements Feature**
  - Admins can create, update and delete announcements.
  - Announcements support both English and Russian languages.

- **Dynamic Content Integration**
  - **News API Integration:** Provides the latest updates on entertainment, celebrities, and technology each time users visit the website.
    - News content is available in both English and Russian.
  - **Quote API Integration:** Motivational quotes greet users upon each visit to keep them inspired.
    - Quotes are available in both English and Russian.

- **Used APIs**
  - Unique usernames generated via the [Parser.name API](https://api.parser.name).
  - Stylish pixel-art profile pictures generated by [DiceBear API](https://www.dicebear.com/styles/pixel-art).
  - News fetched from [Mediastack API](https://mediastack.com/) to keep users updated.
  - Motivational quotes fetched from [FavQs API](https://favqs.com/) for daily inspiration.

- **Dynamic Frontend**
  - Built with **React** for fast, dynamic user experiences.
  - Clean and responsive UI components.

- **Scalable Backend**
  - Developed with **Node.js** and **Express**.
  - RESTful API architecture to handle user data and application logic.


### 📁 Frontend
- **`src/`**: Contains React components and logic for UI.
- **`public/`**: Static assets for the frontend.

### 📁 Backend
- **`controllers/`**: Request and response logic.
- **`models/`**: Data schemas and structures.
- **`routes/`**: API routes and middleware.

## 🌐 APIs Used

1. **Parser.name API**: Generate random usernames.
   ```javascript
   const response = await axios.get(
       'https://api.parser.name/?api_key=YOUR_API_KEY&endpoint=generate&results=1'
   );
   ```

2. **DiceBear API**: Generate pixel-art profile pictures.
   ```javascript
   const profilePictureUrl = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${randomSeed}`;
   ```

3. **Mediastack API**: Fetch the latest news about entertainment, celebrities, and technology.
   ```javascript
   const newsResponse = await axios.get('http://api.mediastack.com/v1/news?access_key=YOUR_API_KEY&categories=entertainment,technology');
   ```
   - News content is available in both English and Russian.

4. **FavQs API**: Fetch motivational quotes.
   ```javascript
   const quoteResponse = await axios.get('https://favqs.com/api/qotd');
   ```
   - Motivational quotes are displayed in English and Russian.

## 🔧 Prerequisites

Ensure the following tools are installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [React](https://reactjs.org/)

## 🛠️ Getting Started

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/picshare.git
   cd PicShare
   ```

2. **Install Dependencies**
   - **Frontend:**
     ```bash
     cd frontend
     npm install
     ```
   - **Backend:**
     ```bash
     cd server
     npm install
     ```

3. **Run the Application**
   - Start the backend server:
     ```bash
     cd server
     npm start
     ```
   - Start the frontend development server:
     ```bash
     cd frontend
     npm start
     ```

4. **Access the Application**
   Open your browser and navigate to `http://localhost:3000`.
   Server Location `http://localhost:3001`.

## 🌍 Live Version

[**Project Link**](https://picshare-20h0.onrender.com)

[**Server Side Link**](https://picshare-server.onrender.com)

## 🔑 Admin Login

**Username:** Dias  
**Password:** 12345678

---
Feel free to contribute or raise issues in the repository!

