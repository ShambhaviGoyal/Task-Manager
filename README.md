# Productivity Bundle Task Manager

A full-stack productivity web application that seamlessly integrates a Task Manager, Notes & Journaling, and a Pomodoro Timer—designed to help users stay organized, focused, and motivated. Built using Node.js, Express, MongoDB, and vanilla JavaScript, the app delivers a minimalist yet responsive user experience with practical features and clean UI enhancements.

This is part of an evolving Productivity Bundle specifically tailored for students. I plan to continuously expand it with tools and enhancements to support effective study habits and time management.

---

## ✨ Key Features

### ✅ Task Manager

- Perform full CRUD operations on tasks  
- Set **due dates** and toggle **completion status**  
- Filter tasks by status: _All_, _Pending_, or _Completed_  
- Unlock a fun **“Mystery Task”** when all tasks are completed  

### 📝 Notes & Journaling

- Add and delete lightweight notes  
- Persistent note-saving using localStorage  
- Ideal for quick thoughts or journaling sessions  

### ⏱️ Pomodoro Timer

- Select a task and start focus sessions  
- Control the timer with **start**, **pause**, and **reset**  
- Enhance focus with built-in **ambient sounds** like _Lofi_ and _Rain_  

---

## Tech Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Frontend:** HTML, Tailwind CSS, vanilla JavaScript, Axios
- **Other:** dotenv, Nodemon

---

## 🎥 Demo
![Demo](https://i.imgur.com/QGAPprG.gif)




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
    audio/
      lofi.mp3
      rain.wav
  routes/
    tasks.js
```

---

## Getting Started

1. **Clone the repository**
   ```sh
   git clone https://github.com/ShambhaviGoyal/Task-Manager.git
   cd starter
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Set up environment variables**  
   Create a `.env` file in the `starter/` directory:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
   ```

4. **Start the development server**
   ```sh
   npm start
   ```
---

## API Endpoints

- `GET /api/v1/tasks` — Get all tasks
- `POST /api/v1/tasks` — Create a new task
- `GET /api/v1/tasks/:id` — Get a single task
- `PATCH /api/v1/tasks/:id` — Update a task
- `DELETE /api/v1/tasks/:id` — Delete a task

---

## 📌 Roadmap & Future Plans

This app is part of an ongoing **Productivity Bundle** project. Planned features include:

- Daily habit tracker  
- Calendar/schedule view  
- Study session analytics  
- Customizable productivity themes  
- More ambient sound options  

The goal is to build a single go-to platform to help students manage their academic life efficiently.


## License

This project is licensed under the ISC License.
