require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Animal = require('./models/animals')
const methodOverride = require('method-override')

const app = express()


// add the middleware 
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(express.urlencoded()) // allows req.body to be read from the form.


app.get('/', (req, res) => {
    res.sendFile('/Users/marklalich/Desktop/Desktop - Mark’s MacBook Pro/kale/unit2/week9/animals/ani.html');
  });

  // route to the create page
app.get('/create', (req, res) => {
    res.render('./create.ejs')
})  
  
// create a new animal to the database and render the animal index page
app.post('/animalkingdom', async (req, res) => {
    req.body.extinct = req.body.extinct === 'on' ? true : false
    await Animal.create(req.body)
    console.log('Yo Dr. Big D', req.body)
    res.render('./animals.ejs')
})

app.get('/animalkingdom/id:', (req, res) => {
    const id = req.params.id
    res.render('./show.ejs')
})





process.on('SIGINT', async () => {
    try {
      // Delete all animals from the database
      await Animal.deleteMany({});
      console.log('All animals have been deleted.');
      process.exit(0);
    } catch (error) {
      console.error('Failed to delete animals:', error);
      process.exit(1);
    }
  });


app.listen(process.env.PORT, () => {
    console.log(`The animals are feasting on ${process.env.PORT}, do you dare distrurb?`)
})