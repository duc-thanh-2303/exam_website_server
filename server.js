const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const port = process.env.PORT || 2303


const accountRoutes = require('./routes/accountRouter')
const detailsRoutes = require('./routes/detailsProject')
const examRoutes = require('./routes/examRouter')
const exportRoutes = require('./routes/exportRouter')
const overviewRoutes = require('./routes/overviewRouter')
const projectRoutes = require('./routes/projectRouter')
const resetRoutes = require('./routes/resetRouter')
const signinRoutes = require('./routes/signInRouter')

app.use(cors(
    {
        origin: ["https://exam-website-client.vercel.app"],
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials: true,
    }

))
app.use(bodyParser.json())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'src')));
app.use('/images', express.static(path.join(__dirname, 'src', 'images')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Cái này hình như là cho phép nối đến build này
// Chjay ko lỗi

// Connect Database
mongoose.connect('mongodb+srv://admin123:admin123@vdas.2nktapq.mongodb.net/')
.then(() => {
    console.log("Database connected")
})
.catch(error => {
    console.log('Error connection', error)
})


app.use('/', signinRoutes)
app.use('/', accountRoutes)
app.use('/', resetRoutes)
app.use('/', projectRoutes)
app.use('/', overviewRoutes)
app.use('/', exportRoutes)
app.use('/', detailsRoutes)
app.use('/', examRoutes)

app.post('/logout', (req, res) => {
    res.clearCookie('accessToken')
    res.status(200).send({ message: 'Logout thành công' });
  });

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
})
