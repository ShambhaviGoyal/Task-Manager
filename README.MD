# Task Manager

A full-stack Task Manager application built with Node.js, Express, MongoDB, and vanilla JavaScript. This app allows users to create, read, update, and delete tasks, with robust error handling and a clean, responsive UI.

---

## Overview

This Task Manager provides a RESTful API backend using Express and MongoDB, and a simple frontend for managing daily tasks. Users can add, edit, mark as completed, and delete tasks. The app features custom error handling, loading indicators, and form alerts for a smooth user experience.

---

## Project Structure

```
starter/
  .env
  .gitignore
  app.js
  package.json
  README.MD
  controllers/
    tasks.js
  db/
    connect.js
  errors/
    custom-error.js
  middleware/
    async.js
    error-handler.js
    not-found.js
  models/
    Task.js
  public/
    browser-app.js
    edit-task.js
    favicon.ico
    index.html
    main.css
    normalize.css
    task.html
  routes/
    tasks.js
```

- **controllers/**: Route handler logic for tasks
- **db/**: MongoDB connection logic
- **errors/**: Custom error classes and helpers
- **middleware/**: Express middleware for async, error handling, and 404s
- **models/**: Mongoose schema for tasks
- **public/**: Frontend assets (HTML, CSS, JS)
- **routes/**: Express route definitions

---

## Technologies Used

- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Frontend:** HTML, CSS, JavaScript (vanilla), Axios
- **Other:** dotenv (environment variables), Nodemon (development), Postman (API testing)

---

## Features

- Create new tasks with validation
- View all existing tasks
- Update task details (name and completion status)
- Delete tasks
- Custom error handling for invalid routes and database errors
- Responsive and user-friendly frontend interface
- Loading indicators and form alerts for better UX

---

## Installation & Usage

1. **Clone the repository**
   ```bash
   git clone https://github.com/ShambhaviGoyal/task-manager.git
   cd task-manager/starter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the `starter/` directory with the following:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**

   Visit [http://localhost:3000](http://localhost:3000) to use the Task Manager.

---

## License

This project is licensed under the ISC.