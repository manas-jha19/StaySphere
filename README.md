# StaySphere
StaySphere is a full-stack property listing web application inspired by platforms like Airbnb, built to simulate a real-world production environment.

I built this project to practice and apply real-world backend concepts like authentication, authorization, database relationships, image uploads, and location-based features — not just CRUD operations.

The goal was to create something close to a production-ready app while keeping the UI simple and functional.

---

## 🌐 Live Demo

🔗 https://staysphere-4ea7.onrender.com/listings

---

## Features

- User authentication (Register / Login / Logout)
- Create, Edit, and Delete property listings
- View detailed property pages
- RESTful routing structure
- Server-side rendering using EJS
- Flash messages for better UX
- Environment-based configuration using dotenv
- MongoDB Atlas database integration
- MVC folder structure for clean architecture

---

## Tech Stack

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- Joi (for validation)
- Passport.js (authentication)

**Frontend**
- EJS templates
- Bootstrap
- JavaScript

**Other Tools & Services**
- dotenv
- Cloudinary for image uploads
- Mapbox for maps and geocoding
- Express-session with MongoDB session store
- Flash messages for user feedback

---

## Project Structure

The project follows an MVC-style structure:
- Routes are separated
- Controllers handle business logic
- Models manage database schemas
- Middleware is used for validation and authorization

This makes the codebase easier to maintain and scale.

---

## Future Improvements

This project is continuously being improved with new features and refinements.

Upcoming plans:
- React frontend integration
- Role-based access (users vs property owners)
- Booking functionality
- UI improvements and performance optimizations

---

## Project Motivation

This project helped me understand how real applications handle:
- User sessions
- Secure data flow
- File uploads
- Third-party APIs
- Clean backend architecture

StaySphere represents my learning journey as a full-stack developer.

---

## ⚙️ Installation & Setup (Run Locally)

### 1️⃣ Clone the repository

```bash
git clone https://github.com/manas-jha19/StaySphere.git
cd StaySphere
```

### 2️⃣ Install dependencies

```bash
npm install
```
### 3️⃣ Create Environment Variables
- Create a .env file in the root directory and add:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
```
- Make sure your .env file is added to .gitignore to keep credentials secure.

### 4️⃣ Start the Server
```bash
npm start
```
-Now open your browser and visit:
```bash
http://localhost:5000
```

## 🧠 What I Learned From This Project

- Structuring scalable backend applications using MVC architecture
- Implementing authentication and session management
- Working with MongoDB Atlas in a production environment
- Securing environment variables and sensitive credentials
- Designing clean and maintainable Express routing logic

## 👨‍💻 Author

**Manas Jha**
Full-Stack Developer | Backend & MERN Stack Enthusiast
[LinkedIn Profile](https://www.linkedin.com/in/manas-jha-441a27253)
