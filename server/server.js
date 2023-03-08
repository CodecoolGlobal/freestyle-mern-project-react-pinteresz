const express = require("express");
const app = express();
app.use(express.json())


const mongoose = require("mongoose");
const Movie = require("./model/Movies");
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