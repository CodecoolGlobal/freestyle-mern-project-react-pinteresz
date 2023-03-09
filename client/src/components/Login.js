import React , {useState} from 'react';


function Login ({setId, setLogin, setClickedLogin}){

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    


    function handleSubmit(e){
        e.preventDefault()
        const data = {name, password}
        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify(data)
          })
          .then(response => response.json())
          .then(response => {
            alert(response[0])
            if(response[1].length > 1){
                setId(response[1])
                setClickedLogin(false)
                setLogin(true)
            }
          })
          .catch(error => {
            console.log(error)
          })
    }


    return(
        <div className='LoginComponent'>
            <div>
                
            </div>
            <div className='LoginDiv'>
                <h2 className="LoginDiv__h2">Please provide your information!</h2>
                <form className='LoginForm' onSubmit={handleSubmit}>
                    <input className='LoginInput name' type='text' placeholder='Username' onChange={e => setName(e.target.value)}/>
                    <input className='LoginInput password' type='password' placeholder='Password' onChange={e => setPassword(e.target.value)}/>
                    <button type='submit' className='submitButton'>Log in</button>
                </form>
            </div>
        </div>
    )


}

export default Login;