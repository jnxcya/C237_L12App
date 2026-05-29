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

app.get('/workouts', (req, res) => {

    res.render('workouts', {
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

app.post('/updateworkout/:id', (req, res) => {

    const id = req.params.id;

    workouts[id] = {

        Day: req.body.Day,
        Timing: req.body.Timing,
        MuscleGroups: req.body.MuscleGroups,
        Notes: req.body.Notes

    };

    res.render('updateworkout', {
        message: "Workout updated!",
        workout: workouts[id]
    });

});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});