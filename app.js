// Import required modules
const express = require('express');

// Create an Express application
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));

// Declare any necessary variables or in-memory data structures here


// TASK: Define appropriate routes below
// ---------------------------------------------------

//Define a route to render the index page
app.get('/', (req, res) => {
    res.render('index');
});

// ---------------------------------------------------

let workouts = []; // In-memory array to store workouts

app.get('/addworkout', (req, res) => {
    // Render the add workout page (you need to create this view)
    res.render('addworkout');
});

app.post('/confirmworkout', (req, res) => {

    const {
        Day,
        Timing,
        MuscleGroups,
        Notes
    } = req.body;

    const newWorkout = {
        Day,
        Timing,
        MuscleGroups,
        Notes
    };

    workouts.push(newWorkout);

    res.render('confirmworkout', {
        workout: newWorkout
    });
});

app.get('/workout', (req, res) => {

    res.render('workout', {
        workouts
    });

});

app.get('/editworkout/:id', (req, res) => {

    const id = req.params.id;

    res.render('editworkout', {
        workout: workouts[id],
        id
    });

});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});