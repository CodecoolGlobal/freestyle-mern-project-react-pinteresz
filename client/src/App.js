import './App.css';
import React, {useEffect, useState} from "react"
import Game from './components/Game'

function App() {

  const [imdbId, setImdbId] = useState('');


  useEffect(() => {
      
      fetchMovieById()
    
  }, [imdbId])


  const handleShot = async () => {   
     const response = await fetch(`https://api.themoviedb.org/3/movie/${(Math.floor(Math.random() * 850000 )) + 1}?api_key=e1bb7abbe49641006c59edcdf0ca708f&language=en-US`)
     if (response.status === 404){
      console.log("bad bad API, no id has been found");
      handleShot()
     }  else {
      const parsedResponse = await response.json()
      if (parsedResponse.adult === true || parsedResponse.imdb_id === "" || parsedResponse.imdb_id === null){
        handleShot()
      } else {
        console.log("sima id"+parsedResponse.id);
        console.log("imdb_id: " + parsedResponse.imdb_id);
      setImdbId(parsedResponse.imdb_id)
      }
    }
    }
 
    
  const fetchMovieById = () => {
    console.log(imdbId);
    fetch(`http://www.omdbapi.com/?apikey=9c16d22a&i=${imdbId}`)
    .then(response=> response.json())
    .then(res => console.log(res))
  }


  
  return (
    <div className="App">
      <Game shot = {handleShot} />
    </div>
  );
}

export default App;
