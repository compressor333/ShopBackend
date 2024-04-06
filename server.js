const PORT = 3000
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const morgan = require('morgan')
const userRoutes = require('./modules/user/config/user.server.rotes')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

const app = express()
dotenv.config()

const corsOptions = {
    origin: 'http://localhost:3001', // Specify the allowed origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Include cookies in the CORS request, if applicable
    optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(userRoutes)
app.get('/api/health',function (req, res){
    res.send('running');
});
console.log('connect')
app.use(morgan('dev'))

connectDB()

app.listen(PORT, function(){
    console.log(`server running on port: ${PORT}`);
});
