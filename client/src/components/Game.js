import React , {useState, useEffect, useRef} from 'react';
import PopUp from './PopUp';
import Quote from './Quote'

function Game({shot, movieData, setMovieData, id}) {
  
  const [inputField, setInputField] = useState('')
  const [hint, setHint] = useState(-1);
  const score = [10,5,4,3,2,1]
  const answer = useRef()
  const submit = useRef()
  const giveHint = useRef()
  const [popUp, setPopup] = useState(false)
  const [text, setText] = useState("")
  const [clickedGenerate, setClickedGenerate] = useState(true)
  const [user, setUser] = useState({})
  const [freeHintVar, setFreeHintVar] = useState(0)
  const [doubleHintVar, setDoubleHintVar] = useState(0)
  const [doublePointVar, setDoublePointVar] = useState(false)
  const [twoLettersVar, setTwoLettersVar] = useState(false)
  const [freeWinVar, setFreeWinVar] = useState(false)
  const [quotesVar, setQuotesVar] = useState(false)
  const [quote, setQuote] = useState("")
  const [quotePopUp, setQuotePopUp] = useState(false)
  const handleHint = (e) => {
   if(Math.floor(Math.random() * 100+1) <= user.perks[0].level*5){
    console.log("szia uram0")
    setText("Congratulations! You got a free hint! :)")
    setPopup(true)
    setFreeHintVar(prev => prev+1)
   }
   if(Math.floor(Math.random() * 100+1) <= user.perks[2].level*5){
    console.log("szia uram2")
    setText("Congratulations! You got two hints instead of one! :)")
    setPopup(true)
    setDoubleHintVar(prev => prev+1)
   }
   setHint(prev => prev + 1)
  }
 
  useEffect(() => {
    if(hint+doubleHintVar >= 5){
      giveHint.current.disabled = true
    }
  },[hint])

  useEffect(() => {
    fetchUser()  
  }, [])

  useEffect(() => {
    if(user.perks){
      if(user.perks[4].level >= 1){
        console.log("szia uram4")
        setQuotesVar(true)
      }
    }
  })

  const fetchUser = () => {
    fetch('http://localhost:3001/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id })
      })
        .then(response => response.json())
        .then(response => {
          setUser(response)
        })
        .catch(error => {
          console.log(error)
        })
  }

  const isDoubled = () => {
    return Math.floor(Math.random() * 100+1) <= user.perks[1].level*5
  }
  useEffect(() => {
    console.log("szia uram1")
  }, [doublePointVar])

const handleSubmit = (e) => {
  inputField.toLowerCase() === movieData.title.toLowerCase() ?
  fetch('http://localhost:3001/score', {
            method: 'PUT',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify(
            {
              id: id,
              score: doublePointVar ? score[hint-freeHintVar]*2 : score[hint-freeHintVar]
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
            setText(`${doublePointVar ? "Congratulations! You got double points this round!": ""} You have gained ${doublePointVar ? score[hint-freeHintVar]*2 : score[hint-freeHintVar]} points, your current score is ${response}!`)
            setHint(-1)
          })
          .catch(error => {
            console.log(error)
          })

  :
        setPopup(true)
        setText(`Wrong answer, try again!`)
}
const getRandomQuote = () => {
  fetch("https://type.fit/api/quotes")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      setQuote(data[Math.floor(Math.random() * 1643)])
    });
}

    function handleGenerate() {
      getRandomQuote()
      if(quotesVar){
        console.log(quote)
          setQuotePopUp(true)
      }
      setTwoLettersVar(Math.floor(Math.random() * 100+1) <= user.perks[3].level*5)
      setFreeWinVar(Math.floor(Math.random() * 100+1) <= user.perks[5].level*30)
      setDoublePointVar(isDoubled())
      setFreeHintVar(0)
      setDoubleHintVar(0)
      setClickedGenerate(false)
      shot()
      setHint(0)
      answer.current.value = ""
      giveHint.current.disabled = false
      submit.current.disabled = false
    }

    const handleOk = () => {
      setPopup(false)
      setQuotePopUp(false)
      setQuote("")
    }

  return (
    <div className='GameComponent'>
      <div className='GameComponent__innerDiv'>
      {popUp ? <PopUp text={text} hasOk={true} handleOk={handleOk} /> : undefined}
      {quotePopUp ? <Quote text={quote.text} handleOk={handleOk} author={quote.author === null ? "" : quote.author}/> : undefined}
        <div className='GameCompnonent__innerDivDiv'>
          <h2>Hit me with your best shot</h2>
          <div className='GameCompnonent__inner3Div'>
              <input onChange={(e) => { setInputField(e.target.value) }} type="text" placeholder='Movie title' ref={answer}></input>
              <button onClick={handleSubmit} ref={submit} disabled={clickedGenerate}>Submit</button>
              <button onClick={handleGenerate}>Generate a movie</button>
              <button onClick={handleHint} ref={giveHint} disabled={clickedGenerate}>Give a hint</button>
              {
                hint+doubleHintVar === 0 ?
                  <div className="GameComponent__hintDiv">
                    <p>The starting letters of every word in the title: {freeWinVar ? movieData.title : twoLettersVar ? movieData.title && movieData.title.split(" ").map(word => word.charAt(0)+word.charAt(1) + " ") : movieData.title && movieData.title.split(" ").map(word => word.charAt(0) + " ")}</p>
                  </div> :
                  hint+doubleHintVar === 1 ?
                    <div className="GameComponent__hintDiv">
                      <p>The starting letters of every word in the title: {freeWinVar ? movieData.title : twoLettersVar ? movieData.title && movieData.title.split(" ").map(word => word.charAt(0)+word.charAt(1) + " ") : movieData.title && movieData.title.split(" ").map(word => word.charAt(0) + " ")}</p>
                      <p>Year of release: {movieData.year}</p>
                    </div> :
                    hint+doubleHintVar === 2 ?
                      <div className="GameComponent__hintDiv">
                        <p>The starting letters of every word in the title: {freeWinVar ? movieData.title : twoLettersVar ? movieData.title && movieData.title.split(" ").map(word => word.charAt(0)+word.charAt(1) + " ") : movieData.title && movieData.title.split(" ").map(word => word.charAt(0) + " ")}</p>
                        <p>Year of release: {movieData.year}</p>
                        <p>Director(s): {movieData.directors}</p>
                      </div> :
                      hint+doubleHintVar === 3 ?
                        <div className="GameComponent__hintDiv">
                          <p>The starting letters of every word in the title: {freeWinVar ? movieData.title : twoLettersVar ? movieData.title && movieData.title.split(" ").map(word => word.charAt(0)+word.charAt(1) + " ") : movieData.title && movieData.title.split(" ").map(word => word.charAt(0) + " ")}</p>
                          <p>Year of release: {movieData.year}</p>
                          <p>Director(s): {movieData.directors}</p>
                          <p>Genre(s): {movieData.genres}</p>
                        </div> :
                        hint+doubleHintVar === 4 ?
                          <div className="GameComponent__hintDiv">
                            <p>The starting letters of every word in the title: {freeWinVar ? movieData.title : twoLettersVar ? movieData.title && movieData.title.split(" ").map(word => word.charAt(0)+word.charAt(1) + " ") : movieData.title && movieData.title.split(" ").map(word => word.charAt(0) + " ")}</p>
                            <p>Year of release: {movieData.year}</p>
                            <p>Director(s): {movieData.directors}</p>
                            <p>Genre(s): {movieData.genres}</p>
                            <p>Stars: {movieData.stars}</p>
                          </div> :
                          hint+doubleHintVar >= 5 ?
                            <div className="GameComponent__hintDiv">
                              <p>The starting letters of every word in the title: {freeWinVar ? movieData.title : twoLettersVar ? movieData.title && movieData.title.split(" ").map(word => word.charAt(0)+word.charAt(1) + " ") : movieData.title && movieData.title.split(" ").map(word => word.charAt(0) + " ")}</p>
                              <p>Year of release: {movieData.year}</p>
                              <p>Director(s): {movieData.directors}</p>
                              <p>Genre(s): {movieData.genres}</p>
                              <p>Stars: {movieData.stars}</p>
                              <p>Plot: {movieData.plot}</p>
                            </div> :
                            hint > 5 ?
                              <div className="GameComponent__hintDiv">
                                <p>The starting letters of every word in the title: {freeWinVar ? movieData.title : twoLettersVar ? movieData.title && movieData.title.split(" ").map(word => word.charAt(0)+word.charAt(1) + " ") : movieData.title && movieData.title.split(" ").map(word => word.charAt(0) + " ")}</p>
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