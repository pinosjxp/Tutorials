//General imports
const express = require('express')
const exphbs = require('express-handlebars')
const dotenv = require('dotenv')

//Load our custom environmental variables
dotenv.config()

//Create the application
const app = express()

//Set up express to use the handlebars engine for rendering webpages.
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

//Start the express server.
app.listen(PORT, ()=>{
    console.log(`The application is listening on port: ${PORT}`)
})