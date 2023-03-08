import React , {useState} from 'react';

function Game({shot, movieData}) {
  
  const [inputField, setInputField] = useState('')
  const [hint, setHint] = useState(0);

const handleHint = (e) => {
  setHint(prev => prev + 1)
}
 
const handleSubmit = () => {
  inputField.toLowerCase() === movieData.title.toLowerCase() ? console.log("szép volt") : console.log("rossz válasz");
}
    return(
      <>
    <h2>Hit me with your best shot</h2>
    <input onChange={(e) =>{setInputField(e.target.value)}} type="text"></input>
    <button onClick={handleSubmit}>Submit</button>
    <button onClick={shot}>Generate a movie</button>
    <button onClick={handleHint}>Give a hint</button>
    {
    hint === 0 ?
    <div>
      <p>The first letters of every word in the title: {movieData.title && movieData.title.split(" ").map(word => word.charAt(0)+" ")}</p>
    </div> :
    hint === 1 ? 
    <div>
      <p>The first letters of every word in the title: {movieData.title && movieData.title.split(" ").map(word => word.charAt(0)+" ")}</p>
      <p>Year of release: {movieData.year}</p>
    </div> :
     hint === 2 ?
    <div>
      <p>The first letters of every word in the title: {movieData.title && movieData.title.split(" ").map(word => word.charAt(0)+" ")}</p>
      <p>Year of release: {movieData.year}</p>
      <p>Director(s): {movieData.directors}</p>
    </div> :
     hint === 3 ?
    <div>
      <p>The first letters of every word in the title: {movieData.title && movieData.title.split(" ").map(word => word.charAt(0)+" ")}</p>
      <p>Year of release: {movieData.year}</p>
      <p>Director(s): {movieData.directors}</p>
      <p>Genre(s): {movieData.genres}</p>
    </div> :
      hint === 4 ?
    <div>
        <p>The first letters of every word in the title: {movieData.title && movieData.title.split(" ").map(word => word.charAt(0)+" ")}</p>
        <p>Year of release: {movieData.year}</p>
        <p>Director(s): {movieData.directors}</p>
        <p>Genre(s): {movieData.genres}</p>
        <p>Stars: {movieData.stars}</p>
    </div> :
      hint === 5 ?
    <div>
        <p>The first letters of every word in the title: {movieData.title && movieData.title.split(" ").map(word => word.charAt(0)+" ")}</p>
        <p>Year of release: {movieData.year}</p>
        <p>Director(s): {movieData.directors}</p>
        <p>Genre(s): {movieData.genres}</p>
        <p>Stars: {movieData.stars}</p>
        <p>Plot: {movieData.plot}</p>
    </div> :
      hint > 5 ?
    <div>
        <p>The first letters of every word in the title: {movieData.title && movieData.title.split(" ").map(word => word.charAt(0)+" ")}</p>
        <p>Year of release: {movieData.year}</p>
        <p>Director(s): {movieData.directors}</p>
        <p>Genre(s): {movieData.genres}</p>
        <p>Stars: {movieData.stars}</p>
        <p>Plot: {movieData.plot}</p>
        <p>No more hints, frick you!</p>
    </div> : undefined 
    }
    </>
    )
}


export default Game;