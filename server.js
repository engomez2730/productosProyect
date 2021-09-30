const app = require('./app');
const dotenv = require('dotenv')
const mongoose = require('mongoose')

//Setting DotEnv to the config file.
dotenv.config({ path: './config.env' })

const db = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD)
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connection')
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('La APP arranco')
})
