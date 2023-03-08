import './App.css';
import React, { useEffect, useState } from "react"
import Game from './components/Game'

function App() {
  const david = 'k_v4m9qw29';
  const zsocc = 'k_8b26635f';
  const bence = 'k_06bwdtm3';
  const [imdbId, setImdbId] = useState('');
  const [movieData, setMovieData] = useState({})






  const handleShot = async () => {
    const response = await fetch(`http://localhost:3001/movielist`)
    const parsedResponse = await response.json()
    setMovieData(parsedResponse[Math.floor(Math.random()*250)])
  }

useEffect(() => {
  console.log(movieData);
}, [movieData])






// build the database

  // const handleShot = async () => {
  //   const response = await fetch(`https://imdb-api.com/en/API/Top250Movies/${david}`)
  //   const parsedResponse = await response.json()
  //   console.log(parsedResponse);
  //   // parsedResponse.items.map(movie => {

  //   // })
  //   setImdbId(parsedResponse)
  //   fetchMovieById(parsedResponse)
  // }


  //   const fetchMovieById = (asd) => {
  //     console.log(asd);

  //     for (let i = 200; i <= 249; i++) {
  //       fetch(`https://imdb-api.com/en/API/Title/${david}/${asd.items[i].id}`)
  //         .then(response => response.json())
  //         .then(res => {
  //           const newData = res
  //           setMovieData(newData)
  //           console.log(newData);
  //           fetch("http://localhost:3001/api/data", {
  //             method: "POST",
  //             headers: {
  //               'Content-Type': 'application/json',
  //             },
  //             body: JSON.stringify(newData)
  //           })
  //             .then(response => response.json())
  //             .then(response => {
  //               console.log(response);
  //             })
  //             .catch(error => {
  //               console.log(error);
  //             });
  //         })
  //     }
  //   }
  



  return (
    <div className="App">
      <Game
        shot={handleShot}
        movieData={movieData}
      />
    </div>
  );
  }

export default App;
