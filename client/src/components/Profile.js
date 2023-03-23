import React, { useState, useEffect } from 'react';
import PopUp from './PopUp';
function Profile({ id, setClickedProfile, setLogin }) {

  const [userName, setUserName] = useState('')
  const [userScore, setUserScore] = useState('')
  const [popUp, setPopup] = useState(false)
  const [text, setText] = useState("")
  const [userPerks, setUserPerks] = useState([])

const fetchUser = () => {
  fetch('http://localhost:3001/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id })
    })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        setUserPerks(response.perks)
        setUserName(response.name)
        setUserScore(response.score)
      })
      .catch(error => {
        console.log(error)
      })
}

  useEffect(() => {
    fetchUser()
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

  const handleUpgrade = (e) => {
    console.log(e.target.dataset.perk)
    
    fetch(`http://localhost:3001/user/${id}`, { 
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({name : e.target.dataset.perk})
    })
      .then(response => response.json())
      .then((result) => fetchUser())
      .catch(error => {
        console.log(error)
      })
      
  }

  return (
    <div className='ProfileComponent'>
      {popUp ? <PopUp text={text} hasOk={false} handleYes={handleYes} handleNo={handleNo} /> : undefined}
      <div>
        <h2 className='ProfileTitle'>Profile</h2>
        {userPerks.length > 0 ?
      <div className='PerkContainer'>
          <section className='Perk'>
            <p className='PerkDescription'>There is a chance (5%/level) that when you get a hint, you won't get a point penalty for it. <br></br><br></br> Costs 5 points multiplied by the next level. </p>
            {userPerks[0].level >= 10 ? <p className='PerkLevel'>Maximum level has been reached!</p> : 
            <>
            <p className='PerkLevel'>Your current level: {userPerks[0].level}. </p>
            <button disabled={userScore < (userPerks[0].level+1)*5} data-perk={userPerks.length > 0 ? userPerks[0].name: ""} className='UpgradeButton' onClick={(e) => handleUpgrade(e)}>&#11014;</button>
            </>}
          </section>
          <section className='Perk'>
            <p className='PerkDescription'>There is a chance (5%/level) that you get double points for correct answer.<br></br><br></br> Costs 5 points multiplied by the next level.</p>
            {userPerks[1].level >= 10 ? <p className='PerkLevel'>Maximum level has been reached!</p> : 
            <>
            <p className='PerkLevel'>Your current level: {userPerks[1].level}. </p>
            <button disabled={userScore < (userPerks[1].level+1)*5} data-perk={userPerks[1].name} className='UpgradeButton' onClick={(e) => handleUpgrade(e)}>&#11014;</button>
            </>}
          </section>
          <section className='Perk'>
            <p className='PerkDescription'>There is a chance (5%/level) that when you get a hint, you get a second one for free.<br></br><br></br> Costs 5 points multiplied by the next level.</p>
            {userPerks[2].level >= 10 ? <p className='PerkLevel'>Maximum level has been reached!</p> : 
            <>
            <p className='PerkLevel'>Your current level: {userPerks[2].level}. </p>
            <button disabled={userScore <  (userPerks[2].level+1)*5} data-perk={userPerks[2].name} className='UpgradeButton' onClick={(e) => handleUpgrade(e)}>&#11014;</button>
            </>}
          </section>
          <section className='Perk'>
            <p className='PerkDescription'>There is a chance (5%/level) that you'll get 2 letters from every word of the title.<br></br> <br></br> Costs 5 points multiplied by the next level.</p>
            {userPerks[3].level >= 10 ? <p className='PerkLevel'>Maximum level has been reached!</p> : 
            <>
            <p className='PerkLevel'>Your current level: {userPerks[3].level}. </p>
            <button disabled={userScore <  (userPerks[3].level+1)*5} data-perk={userPerks[3].name} className='UpgradeButton' onClick={(e) => handleUpgrade(e)}>&#11014;</button>
            </>}
          </section>
          <section className='Perk'>
            <p className='PerkDescription'>To help you through the desperate times, there will be a motivational quote after you generate a movie. <br></br><br></br> Costs 1 point.</p>
            {userPerks[4].level >= 1 ? <p className='PerkLevel'>Maximum level has been reached!</p> : 
            <>
            <p className='PerkLevel'>Your current level: {userPerks[4].level}. </p>
            <button disabled={userScore < (userPerks[4].level+1)*1} data-perk={userPerks[4].name} className='UpgradeButton' onClick={(e) => handleUpgrade(e)}>&#11014;</button>
            </>}
          </section>
          <section className='Perk'>
            <p className='PerkDescription'>There is a chance (3%) that when you generate a new movie, you instantly get the whole title.<br></br><br></br> Costs 150 points.</p>
            {userPerks[5].level >= 1 ? <p className='PerkLevel'>Maximum level has been reached!</p> : 
            <>
            <p className='PerkLevel'>Your current level: {userPerks[5].level}. </p>
            <button disabled={userScore < (userPerks[5].level+1)*150} data-perk={userPerks[5].name} className='UpgradeButton' onClick={(e) => handleUpgrade(e)}>&#11014;</button>
            </>}
          </section>
        </div>
        : ""}
      </div>
      <div className='ProfileDiv'>
        <p className='Profile'>Username: {userName}</p>
        <p className='ProfileScore'>Your score: {userScore}</p>
       
        <button className='ProfileButton' onClick={handleDeleteClick}>Delete account</button>
      </div>
    </div>
  )
}




export default Profile;