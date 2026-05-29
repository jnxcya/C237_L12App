// Import Express
const express = require('express');

// Create Express app
const app = express();

// Set EJS as view engine
app.set('view engine', 'ejs');

// Middleware to read form data
app.use(express.urlencoded({ extended: true }));


// =====================================================
// IN-MEMORY STORAGE
// =====================================================

let workouts = [];


// =====================================================
// HOME PAGE
// =====================================================

app.get('/', (req, res) => {

    res.render('index');

});


// =====================================================
// ADD WORKOUT PAGE
// =====================================================

app.get('/addworkout', (req, res) => {

    res.render('addworkout');

});


// =====================================================
// ADD WORKOUT
// =====================================================

app.post('/confirmworkout', (req, res) => {

    const {
        Day,
        Timing,
        MuscleGroups,
        Notes
    } = req.body;

    // Create workout object
    const newWorkout = {

        Day: Number(Day),
        Timing,
        MuscleGroups,
        Notes

    };

    // Save into array
    workouts.push(newWorkout);

    // Show confirmation page
    res.render('confirmworkout', {

        message: "Workout Added!",
        workout: newWorkout

    });

});


// =====================================================
// DISPLAY ALL WORKOUTS
// =====================================================

app.get('/workouts', (req, res) => {

    res.render('workouts', {

        workouts

    });

});


// =====================================================
// EDIT WORKOUT PAGE
// =====================================================

app.get('/editworkout/:id', (req, res) => {

    const id = req.params.id;

    // Check if workout exists
    if (!workouts[id]) {

        return res.send('Workout not found');

    }

    res.render('editworkout', {

        workout: workouts[id],
        id

    });

});


// =====================================================
// UPDATE WORKOUT
// =====================================================

app.post('/updateworkout/:id', (req, res) => {

    const id = req.params.id;

    // Update workout
    workouts[id] = {

        Day: Number(req.body.Day),
        Timing: req.body.Timing,
        MuscleGroups: req.body.MuscleGroups,
        Notes: req.body.Notes

    };

    // Render updated confirmation page
    res.render('updateworkout', {

        message: "Workout Updated!",
        workout: workouts[id]

    });

});


// =====================================================
// SEARCH WORKOUT TO EDIT
// =====================================================

app.get('/searchworkout', (req, res) => {

    const search = req.query.search || '';

    const workoutIndex = workouts.findIndex(workout =>

        workout.Day.toString().includes(search)

    );

    // If workout not found
    if (workoutIndex === -1) {

        return res.send('Workout not found');

    }

    // Redirect to edit page
    res.redirect('/editworkout/' + workoutIndex);

});


// =====================================================
// SERVER
// =====================================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server is running on http://localhost:${PORT}`);

});