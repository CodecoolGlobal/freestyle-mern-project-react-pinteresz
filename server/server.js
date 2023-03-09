const express = require("express");
const app = express();

app.use(express.json());


const mongoose = require("mongoose");
const Movie = require("./model/Movies");
const User = require("./model/User");
mongoose.connect('mongodb+srv://kovaDav:Netordfelpls321@cluster0.kqamisi.mongodb.net/freestyle')


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/movielist', async (req, res) => {
    const movies = await Movie.find({})
    res.json(movies)
})

app.post('/user', async (req,res) => {
    const id = req.body.id;
    const user = await User.findById(id);
    res.json(user);
})

app.post('/score', async (req,res) => {
    const id= req.body.id;
    const score = req.body.score;
    const updateScore = await User.findByIdAndUpdate(id, { $inc: {score: score}}, {new: true})
    res.json(updateScore.score)
})

app.post('/deleteUser', async (req, res) => {
    console.log(req.body.id);
    const idToDelete = req.body.id;
    const deletedUser = await User.findOneAndDelete({_id: idToDelete})
    console.log(deletedUser)
    res.json("Your account has been deleted! Why would you abandon us? Why?")
})

app.post('/register', async (req,res) => {
    const newUser = req.body;
    console.log(newUser);
    const name = newUser.name;
    const email = newUser.email;
    const password = newUser.password;
    const score = 0;
    const perks = '';
    const user = new User({
        name,
        email,
        password,
        score,
        perks
    }) 
    user.save()
    .then(user => res.json(["Thank you for your registration, enjoy your climb to the top of the leaderboard!", user]))
    .catch(err => res.status(400).json(["User is already registered with this e-mail address/ user name", '']));
})

app.post('/login', async (req, res) => {
    const info = req.body;
    const name = info.name;
    const password = info.password;
    const actual = await User.findOne({name: name})
    actual ?
    actual.password === password ? res.json(["Login was successful",actual._id]) :
    res.json(["Incorrect username or password", '']) :
    res.json(["Incorrect username or password", ''])
})

app.post('/api/data', (req, res) => {
    const movies = req.body 
    console.log("movies"+movies.title);
        const title = movies.title
        const id = movies.id
        const year = movies.year
        const directors = movies.directors
        const genres = movies.genres
        const stars = movies.stars
        const plot = movies.plot
        const movie = new Movie({
            id,
            title,
            year,
            directors,
            genres,
            stars,
            plot
        })
        movie.save()
         .then(movie => res.json(movie))
           .catch(err => res.status(400).json({ success: false }));
        

        // .then(res.json("The movies are stored in the database"))
})




app.listen(3001, () => console.log('Server started on port 3001'));