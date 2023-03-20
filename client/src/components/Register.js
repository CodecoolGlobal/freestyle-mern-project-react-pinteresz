import React , {useState, useTransition} from 'react';
import PopUp from './PopUp';

function Register ({setId, setLogin, setClickedRegister}){

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [popUp, setPopup] = useState(false)
    const [text, setText] = useState("")
    function handleSubmit(e){
        e.preventDefault()
        const data = {name, password, email}
        fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify(data)
          })
          .then(response => response.json())
          .then(response => {
            setText(response[0])
            setId(response[1]["_id"])
            setPopup(true)
          })
          .catch(error => {
            console.log(error)
          })
    }

const handleOk = () => {
    setLogin(true)
    setClickedRegister(false)
    setPopup(false)
}
    

    return(
        <div className='RegisterComponent'>
            {popUp ? <PopUp text={text} hasOk={true} handleOk={handleOk}/>:undefined}
            <div>    
            </div>
            <div className='RegisterDiv'>
                <h2 className="RegisterDiv__h2">Please provide your information!</h2>
                <form className='RegisterForm' onSubmit={handleSubmit}>
                    <input className='registerInput name' type='text' placeholder='Username' onChange={e => setName(e.target.value)}/>
                    <input className='registerInput email' type='email' placeholder='Email' onChange={e => setEmail(e.target.value)}/>
                    <input className='registerInput password' type='password' placeholder='Password' onChange={e => setPassword(e.target.value)}/>
                    <button type='submit' className='submitButton'>Submit</button>
                </form>
            </div>
        </div>
    )


}

export default Register;