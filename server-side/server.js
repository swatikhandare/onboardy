require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const blogsRoutes = require('./routes/routesBlog.js')
const tagsRoutes = require('./routes/routesTag.js')
const staffRoutes = require('./routes/routesStaff.js')
const taskRoutes = require('./routes/routesTask.js')
const attachmentRoutes = require('./routes/routesAttachment.js')
const studentRoutes = require('./routes/routesStudent.js')
const assignedTaskRoutes = require('./routes/routesAssignedTask.js')
const faqroutes = require('./routes/routesFaq.js')
const messageRoutes = require('./routes/routesMessage.js')
const cors = require('cors')

// express app
const app = express()

app.use(cors());

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})


// routes
app.use('/api/', blogsRoutes)
app.use('/api/', tagsRoutes)
app.use('/api/', staffRoutes)
app.use('/api/', taskRoutes)
app.use('/api/', attachmentRoutes)
app.use('/api/', studentRoutes)
app.use('/api/', assignedTaskRoutes)
app.use('/api/', faqroutes)
app.use('/api/', messageRoutes)


mongoose.set('strictQuery', false);

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 
