import React, { useState, useEffect } from 'react';

function Profile( {id, setClickedProfile, setLogin} ) {

    const [userName, setUserName] = useState('')
    const [userScore, setUserScore] = useState('')

useEffect(() => {
    fetch('http://localhost:3001/user', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json'},
        body: JSON.stringify({id: id})
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

const handleDelete = (e) =>{

        const data = id;
        console.log(data);
        fetch('http://localhost:3001/deleteUser', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify({id: data})
          })
          .then(response => response.json())
          .then(response => {
            alert(response)
            setLogin(false)
            setClickedProfile(false)
          })
          .catch(error => {
            console.log(error)
          })
        }


    return (
        <div className='ProfileComponent'>
            <div></div>
            <div className='ProfileDiv'>
                <h2 className='ProfileTitle'>Profile</h2>
                <p className='Profile'>Username: {userName}</p>
                <p className='ProfileScore'>Your score: {userScore}</p>
                <button className='ProfileButton' onClick={handleDelete}>Delete account</button> 
            </div>
        </div>
    )
}




export default Profile;