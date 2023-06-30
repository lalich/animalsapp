require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Animals = require('./models/animals')
const methodOverride = require('method-override')
const app = express()

// add the middleware 
app.use(express.static('public', {'Content-Type': 'application/javascript'}))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true})) // allows req.body to be read from the form.

// app landing page not required but c'mon what a cute T-Rex
app.get('/', (req, res) => {
    res.sendFile('/Users/marklalich/Desktop/Desktop - Mark’s MacBook Pro/kale/unit2/week9/animals/ani.html');
  });

  // route to the create page
app.get('/create', (req, res) => {
    res.render('create.ejs')
})  
  
// create a new animal to the database and render the animal index page
app.post('/animals', async (req, res) => {
    req.body.extinct = req.body.extinct === 'on' ? true : false
        await Animals.create(req.body)
   
        console.log('Yo Dr. Big D', req.body)
            res.redirect('/animals')
})

// get all the animals from the db
app.get('/animals', async (req, res) => {
    const allAnimals = await Animals.find({})
            console.log(allAnimals)
        res.render('animals.ejs', { animals: allAnimals })
})

// animal pages for their own saft space
app.get('/animals/:id', async (req, res) => {
    const foundAnimal = await Animals.findById(req.params.id)
    res.render('show.ejs', { animals: foundAnimal })
})

// delete the animal route!
app.delete('/animals/:id', async (req, res) => {
    await Animals.findByIdAndDelete(req.params.id)
    const deletedAnimal = await Animals.findByIdAndDelete(req.params.id)
    res.redirect('/animals')
}) 

// edit function next will be a put route but need this to work first!
app.get('/animals/:id/edit', async (req, res) => {
    console.log('please try again')
    const animal = await Animals.findById(req.params.id)
    res.render('edit.ejs', { animal })
})

app.put('/animals/:id', async (req, res) => {
    req.body.extinct = req.body.extinct === 'on' ? true : false
    await Animals.findByIdAndUpdate(req.params.id, req.body)
    console.log(req.body, 'Hope your second swing was better!')
    res.redirect('/animals')
})


// clear out database when server is shut down.. this does not clear it on crashes though.
process.on('SIGINT', async () => {
    try {
      // Delete all animals from the database
      await Animals.deleteMany({});
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