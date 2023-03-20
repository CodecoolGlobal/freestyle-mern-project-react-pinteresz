import React, { useState, useEffect } from 'react';
import PopUp from './PopUp';
function Profile({ id, setClickedProfile, setLogin }) {

  const [userName, setUserName] = useState('')
  const [userScore, setUserScore] = useState('')
  const [popUp, setPopup] = useState(false)
  const [text, setText] = useState("")

  useEffect(() => {
    fetch('http://localhost:3001/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id })
    })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        setUserName(response.name)
        setUserScore(response.score)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const handleDelete = (e) => {

    const data = id;
    console.log(data);
    fetch('http://localhost:3001/deleteUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: data })
    })
      .then(response => response.json())
      .catch(error => {
        console.log(error)
      })
  }

  const handleYes = () => {
    handleDelete()
    setLogin(false)
    setClickedProfile(false)
    setPopup(false)
  }

  const handleNo = () => {
    setPopup(false)
  }

  const handleDeleteClick = () => {
    setPopup(true)
    setText("Are you sure you want to delete your account?")
  }

  return (
    <div className='ProfileComponent'>
      {popUp ? <PopUp text={text} hasOk={false} handleYes={handleYes} handleNo={handleNo} /> : undefined}
      <div></div>
      <div className='ProfileDiv'>
        <h2 className='ProfileTitle'>Profile</h2>
        <p className='Profile'>Username: {userName}</p>
        <p className='ProfileScore'>Your score: {userScore}</p>
        <button className='ProfileButton' onClick={handleDeleteClick}>Delete account</button>
      </div>
    </div>
  )
}




export default Profile;