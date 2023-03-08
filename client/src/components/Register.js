import React , {useState} from 'react';


function Register (){

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")


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
            alert(response)
          })
          .catch(error => {
            console.log(error)
          })
    }


    return(
        <div className='RegisterComponent'>
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