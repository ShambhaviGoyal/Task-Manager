/*GET - api/tasks - Get all tasks
POST- api/tasks - Create Task
GET - api/tasks/:id - Get Task
PUT/PATCH- api/tasks/:id - Update Task
DELETE- api/tasks/:id - Delete Task*/

const express= require('express');
const app= express(); 
const path = require('path')

const tasks= require('./routes/tasks')
const connectDB=require('./db/connect')
require('dotenv').config()
const notFound=require('./middleware/not-found')
const errorHandlerMiddleware=require('./middleware/error-handler')


//middleware
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

//routes
app.use('/api/v1/tasks', tasks) //For any request starting with /api/v1/tasks, pass control to the tasks router we imported from ./routes/tasks.
app.use(notFound)
app.use(errorHandlerMiddleware)

// Serve frontend index.html for any other route (except /api routes)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})
const port= process.env.PORT || 3000

const start=async() =>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening on port ${port}...`))
    }
    catch(error){
        console.log(error)
    }
}

start()
