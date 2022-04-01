import React from 'react';
import './index.css'
import Box from './Components/Box'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  
  const [dice,setDice] = React.useState(allNewDice())
  const [tenzies,setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const fv = dice[0].value
    const allSameValue = dice.every(die=> die.value === fv)
    if(allHeld && allSameValue) {
      setTenzies(true)
    }
    
  },[dice])

  function allNewDice(){
    const newDice = []
    for (let i = 0; i < 10; i++) {
        newDice.push({
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            key: nanoid()
        })
    }
    return newDice
  }

  function handleClick() {
    if(!tenzies)
{    setDice( oldDice =>oldDice.map( die =>{
      return die.isHeld ? die : {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        key: nanoid()
    }
    }))}
    else{
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  function handleBoxClick(key){
        setDice( oldDices => oldDices.map( die =>{
          return die.key === key ? 
          {...die, isHeld: !die.isHeld} : die
        }))
  }


  const boxes = dice.map( die => (
      <Box 
        key={die.key} 
        value = {die.value} 
        isHeld = {die.isHeld} 
        handleBoxClick={()=>handleBoxClick(die.key)}
      />
      ))
  return (
    <main >
      {tenzies && < Confetti width= {window.innerWidth} height = {window.innerHeight} />}
        <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="boxcontainer">
          {boxes}
        </div>
        <button className="btn" onClick={handleClick}>{tenzies? "Play Again":"Roll"}!</button>
    </main>
  )
}

export default App;
