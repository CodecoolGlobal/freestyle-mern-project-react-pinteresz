import './App.css';
import React, { useEffect, useState } from "react"
import Game from './components/Game'
import Register from './components/Register';
import Hero from './components/Hero';
import Login from './components/Login';
import Profile from './components/Profile';
import Leaderboard from './components/Leaderboard'

function App() {
  const david = 'k_v4m9qw29';
  const zsocc = 'k_8b26635f';
  const bence = 'k_06bwdtm3';
  const [imdbId, setImdbId] = useState('');
  const [movieData, setMovieData] = useState({})
  const [clickedRegister, setClickedRegister] = useState(false);
  const [clickedLogin, setClickedLogin] = useState(false);
  const [actualId, setActualId] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [clickedProfile, setClickedProfile] = useState(false)
  const [clickedPlay, setClickedPlay] = useState(false)
  const [clickedHome, setClickedHome] = useState(false)
  const [clickedLeaderboard, setClickedLeaderboard] = useState(false)

  const handleShot = async () => {
    const response = await fetch(`http://localhost:3001/movielist`)
    const parsedResponse = await response.json()
    setMovieData(parsedResponse[Math.floor(Math.random()*250)])
  }

useEffect(() => {
  console.log(movieData);
}, [movieData])

const handleLogOut = () => {
  setIsLoggedIn(false)
  setClickedRegister(false)
  setClickedLogin(false)
  setClickedPlay(false)
  setClickedProfile(false)
  setMovieData({})
  setActualId('')
}
// build the database

  // const handleShot = async () => {
  //   const response = await fetch(`https://imdb-api.com/en/API/Top250Movies/${david}`)
  //   const parsedResponse = await response.json()
  //   console.log(parsedResponse);
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
      <section className='toolbar'>

   
      {!isLoggedIn &&
      <>
      <button className='toolbarButton' onClick={() => (setClickedRegister(false), setClickedLogin(false), setClickedProfile(false), setClickedHome(true),setClickedLeaderboard(false))}>Home</button>
      <button className='toolbarButton' onClick={() => (setClickedLogin(true), setClickedRegister(false), setClickedProfile(false),setClickedHome(false),setClickedLeaderboard(false))}>Login</button>
      <button className='toolbarButton' onClick={() => (setClickedRegister(true), setClickedLogin(false), setClickedProfile(false), setClickedHome(false),setClickedLeaderboard(false))}>Register</button>
      <button className='toolbarButton' onClick={() => (setClickedLeaderboard(true),setClickedRegister(false), setClickedLogin(false), setClickedProfile(false), setClickedHome(false))}>Leaderboard</button>
      </>
      }
      {isLoggedIn &&
      <>
      <button className='toolbarButton' onClick={() => (setClickedPlay(true), setClickedRegister(false), setClickedLogin(false), setClickedProfile(false),setClickedLeaderboard(false), setClickedHome(false))}>Play</button>
      <button className='toolbarButton' onClick={() => (setClickedRegister(false), setClickedLogin(false), setClickedProfile(false),setClickedPlay(false),setMovieData({}), setClickedHome(false),setClickedHome(true),setClickedLeaderboard(false))}>Home</button>
      <button className='toolbarButton' onClick={() => (setMovieData({}),setClickedRegister(false), setClickedLogin(false), setClickedPlay(false),setClickedProfile(true),setClickedLeaderboard(false), setClickedHome(false))}>Profile</button>
      <button className='toolbarButton' onClick={() => (setClickedLeaderboard(true),setMovieData({}),setClickedRegister(false), setClickedLogin(false), setClickedPlay(false),setClickedProfile(false), setClickedHome(false))}>Leaderboard</button>
      <button className='toolbarButton' onClick={handleLogOut}>Log out</button>
      </>
      }
      
      </section>
      
      {clickedRegister ? 
      <Register setId={setActualId} setLogin={setIsLoggedIn} setClickedRegister={setClickedRegister}/> :
      clickedLogin ?
      <Login setId={setActualId} setLogin={setIsLoggedIn} setClickedLogin={setClickedLogin}/> :
      clickedProfile ?
      <Profile id={actualId} setClickedProfile={setClickedProfile} setLogin={setIsLoggedIn}/> :
      clickedHome ?
      <Hero/> :
      clickedLeaderboard ? 
      <Leaderboard id={actualId}/> :
      clickedPlay ?
      <Game shot={handleShot} setMovieData={setMovieData} movieData={movieData} id={actualId}/> :
      isLoggedIn ?
      <Hero/> :
      <Hero/>
  }
    </div>
  );
}
export default App;
