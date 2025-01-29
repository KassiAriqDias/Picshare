PicShare

PicShare is a social media application inspired by Instagram. It allows users to share, interact, and explore a platform built with modern web technologies. The project consists of a React-based frontend and a Node.js backend with the use of various APIs for added functionalities.

Features

User Registration and Authentication

Users can sign up and log in to their accounts.

Admin page for tracking the history of users who signed in.

Random Profile Generation

Usernames are generated using the Parser.name API.

Profile pictures are generated using the DiceBear API.

Frontend

Built with React and styled using JavaScript and CSS.

Components for user interaction and dynamic content rendering.

Backend

Developed with Node.js and Express.

RESTful API endpoints for handling user data and application logic.

Folder Structure

PicShareDesktop/
|-- frontend/
|   |-- node_modules/
|   |-- public/
|   |-- src/
|   |-- .gitignore
|   |-- package-lock.json
|   |-- package.json
|
|-- server/
|   |-- controllers/
|   |-- models/
|   |-- node_modules/
|   |-- routes/
|   |-- .gitignore
|   |-- package-lock.json
|   |-- package.json
|   |-- server.js
|
|-- README.md

Frontend

src/: Contains React components and logic for the user interface.

public/: Houses static assets for the frontend.

Backend

controllers/: Contains logic for handling requests and responses.

models/: Defines data schemas and structures.

routes/: Contains route definitions and middleware.

APIs Used

Parser.name API: Used to generate random usernames.

const response = await axios.get(
    'https://api.parser.name/?api_key=YOUR_API_KEY&endpoint=generate&results=1'
);

DiceBear API: Generates random profile pictures in pixel-art style.

const profilePictureUrl = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${randomSeed}`;

Prerequisites

Before running the project, ensure you have the following installed:

Node.js

npm

React

Getting Started

Clone the Repository

git clone https://github.com/your-username/picshare.git
cd PicShareDesktop

Install Dependencies

Frontend:

cd frontend
npm install

Backend:

cd server
npm install

Run the Application

Start the backend server:

cd server
npm start

Start the frontend development server:

cd frontend
npm start

Access the Application
Open your browser and navigate to http://localhost:3000.

Future Enhancements

Add support for user posts (images, captions, likes, and comments).

Implement a search feature to find other users and content.

Enhance the admin dashboard with more detailed analytics.

Optimize performance and scalability.

License

This project is licensed under the MIT License.

Feel free to contribute or raise issues in the repository!

