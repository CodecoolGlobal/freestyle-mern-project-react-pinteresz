import React , {useState, useEffect, useRef} from 'react';
import PopUp from './PopUp';
function Game({shot, movieData, setMovieData, id}) {
  
  const [inputField, setInputField] = useState('')
  const [hint, setHint] = useState(0);
  const score = [10,5,4,3,2,1]
  const answer = useRef()
  const submit = useRef()
  const giveHint = useRef()
  const [popUp, setPopup] = useState(false)
  const [text, setText] = useState("")


  const handleHint = (e) => {
    setHint(prev => prev + 1)
  }
 
  useEffect(() => {
    if(hint === 5){
      giveHint.current.disabled = true
    }
  },[hint])

const handleSubmit = (e) => {
  inputField.toLowerCase() === movieData.title.toLowerCase() ?
  fetch('http://localhost:3001/score', {
            method: 'PUT',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify(
            {
              id: id,
              score: score[hint]
            }
            )
          })
          .then(response => response.json())
          .then(response => {
            console.log(response); 
            answer.current.value = ""
            giveHint.current.disabled = true
            submit.current.disabled = true
            setMovieData({})
            setPopup(true)
            setText(`You have gained ${score[hint]} points, your current score is ${response}!`)
          })
          .catch(error => {
            console.log(error)
          })

  :
        setPopup(true)
        setText(`Wrong answer, try again!`)
}

    function handleGenerate() {
      shot()
      setHint(0)
      answer.current.value = ""
      giveHint.current.disabled = false
      submit.current.disabled = false
    }

    const handleOk = () => {
      setPopup(false)
    }

  return (
    <div className='GameComponent'>
      <div className='GameComponent__innerDiv'>
      {popUp ? <PopUp text={text} hasOk={true} handleOk={handleOk} /> : undefined}
        <div className='GameCompnonent__innerDivDiv'>
          <h2>Hit me with your best shot</h2>
          <div className='GameCompnonent__inner3Div'>
              <input onChange={(e) => { setInputField(e.target.value) }} type="text" placeholder='Movie title' ref={answer}></input>
              <button onClick={handleSubmit} ref={submit}>Submit</button>
              <button onClick={handleGenerate}>Generate a movie</button>
              <button onClick={handleHint} ref={giveHint}>Give a hint</button>
              {
                hint === 0 ?
                  <div className="GameComponent__hintDiv">
                    <p>The first letters of every word in the title: {movieData.title && movieData.title.split(" ").map(word => word.charAt(0) + " ")}</p>
                  </div> :
                  hint === 1 ?
                    <div className="GameComponent__hintDiv">
                      <p>The first letters of every word in the title: {movieData.title && movieData.title.split(" ").map(word => word.charAt(0) + " ")}</p>
                      <p>Year of release: {movieData.year}</p>
                    </div> :
                    hint === 2 ?
                      <div className="GameComponent__hintDiv">
                        <p>The first letters of every word in the title: {movieData.title && movieData.title.split(" ").map(word => word.charAt(0) + " ")}</p>
                        <p>Year of release: {movieData.year}</p>
                        <p>Director(s): {movieData.directors}</p>
                      </div> :
                      hint === 3 ?
                        <div className="GameComponent__hintDiv">
                          <p>The first letters of every word in the title: {movieData.title && movieData.title.split(" ").map(word => word.charAt(0) + " ")}</p>
                          <p>Year of release: {movieData.year}</p>
                          <p>Director(s): {movieData.directors}</p>
                          <p>Genre(s): {movieData.genres}</p>
                        </div> :
                        hint === 4 ?
                          <div className="GameComponent__hintDiv">
                            <p>The first letters of every word in the title: {movieData.title && movieData.title.split(" ").map(word => word.charAt(0) + " ")}</p>
                            <p>Year of release: {movieData.year}</p>
                            <p>Director(s): {movieData.directors}</p>
                            <p>Genre(s): {movieData.genres}</p>
                            <p>Stars: {movieData.stars}</p>
                          </div> :
                          hint === 5 ?
                            <div className="GameComponent__hintDiv">
                              <p>The first letters of every word in the title: {movieData.title && movieData.title.split(" ").map(word => word.charAt(0) + " ")}</p>
                              <p>Year of release: {movieData.year}</p>
                              <p>Director(s): {movieData.directors}</p>
                              <p>Genre(s): {movieData.genres}</p>
                              <p>Stars: {movieData.stars}</p>
                              <p>Plot: {movieData.plot}</p>
                            </div> :
                            hint > 5 ?
                              <div className="GameComponent__hintDiv">
                                <p>The first letters of every word in the title: {movieData.title && movieData.title.split(" ").map(word => word.charAt(0) + " ")}</p>
                                <p>Year of release: {movieData.year}</p>
                                <p>Director(s): {movieData.directors}</p>
                                <p>Genre(s): {movieData.genres}</p>
                                <p>Stars: {movieData.stars}</p>
                                <p>Plot: {movieData.plot}</p>
                                <p>No more hints, frick you!</p>
                              </div> : undefined
              }
        </div>
          
          </div>
          
      </div>
      
    </div>
  )
}


export default Game;