import React , {useState} from 'react';

function Game({shot, movieData}) {

  const [hint, setHint] = useState(0);

const handleHint = (e) => {
  setHint(prev => prev + 1)
}

    return(
    <>
    <h2>Hit me with your best shot</h2>
    <input type="text"></input>
    <button onClick={shot}>Generate a movie</button>
    <button onClick={handleHint}>Give a hint</button>
    {hint === 1 ? 
    <div>
      {console.log(movieData)}
      <p>Year of release: {movieData.year}</p>
    </div> :
     hint === 2 ?
    <div>
      <p>Year of release: {movieData.year}</p>
      <p>Director: {movieData.directors}</p>
    </div> :
     hint === 3 ?
    <div>
      <p>Year of release: {movieData.year}</p>
      <p>Director: {movieData.directors}</p>
      <p>hint3</p>
    </div> :
      hint === 4 ?
    <div>
        <p>Year of release: {movieData.year}</p>
        <p>Director: {movieData.directors}</p>
        <p>hint3</p>
        <p>hint4</p>
    </div> :
      hint === 5 ?
    <div>
        <p>Year of release: {movieData.year}</p>
        <p>Director: {movieData.directors}</p>
        <p>hint3</p>
        <p>hint4</p>
        <p>hint5</p>
    </div> :
      hint > 5 ?
    <div>
        <p>Year of release: {movieData.year}</p>
        <p>Director: {movieData.directors}</p>
        <p>hint3</p>
        <p>hint4</p>
        <p>hint5</p>
        <p>No more hints, frick you!</p>
    </div> : undefined 
    }
    </>
    )
}


export default Game;