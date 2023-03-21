import React, { useState } from 'react';
import PopUp from './PopUp';

function Login({ setId, setLogin, setClickedLogin }) {

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [popUp, setPopup] = useState(false)
    const [text, setText] = useState("")
    const [loggedIn, setLoggedIn] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()
        const data = { name, password }
        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(response => {
                setText(response[0])
                setPopup(true)
                setLoggedIn(false)
                console.log(response[1])
                if (response[1].length > 1) {
                    setLoggedIn(true)
                    setId(response[1])
                    setPopup(true)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
    const handleOk = () => {
        if(loggedIn){
            setClickedLogin(false)
            setLogin(true)
        }
        setPopup(false)
    }

    return (
        <div className='LoginComponent'>
            {popUp ? <PopUp text={text} hasOk={true} handleOk={handleOk} /> : undefined}
            <div>
            </div>
            <div className='LoginDiv'>
                <h2 className="LoginDiv__h2">Please provide your information!</h2>
                <form className='LoginForm' onSubmit={handleSubmit}>
                    <input className='LoginInput name' type='text' placeholder='Username' onChange={e => setName(e.target.value)} />
                    <input className='LoginInput password' type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} />
                    <button type='submit' className='submitButton'>Log in</button>
                </form>
            </div>
        </div>
    )


}

export default Login;