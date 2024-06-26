
const express = require('express');
const weblinkRoutes = require('./routes/weblink')

const cors = require('cors');

require('dotenv').config();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT
const mongodbconn = process.env.MONGODB

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.get('/', (req, res) => {
    res.json({message: `Express App is running on port ${port}`});
})

app.use('/api/weblink', weblinkRoutes) 
require('./routes/auth')(app);

mongoose.connect(mongodbconn)
.then(() => {
    console.log(`✅️ database connected`)
})
.catch((error) => {
    console.error(error)
})

app.listen(port, () => {
    console.log(`✅️ listening on port: ${port}`);
});