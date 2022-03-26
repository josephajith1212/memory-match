import './App.css'
import { useEffect, useState } from 'react'
import SingleCard from './components/SingleCard'


const cardImages = [
  {"src": "/img/helmet-1.png", matched: false},
  {"src": "/img/potion-1.png", matched: false},
  {"src": "/img/ring-1.png", matched: false},
  {"src": "/img/scroll-1.png", matched: false},
  {"src": "/img/shield-1.png", matched: false},
  {"src": "/img/sword-1.png", matched: false},
]

function App() {
  const [cards, setCards] = useState([])
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [isDisabled, setIsDisabled] = useState(false)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - .5)
      .map((card) => ({...card, id: Math.random()}))

    setCards(shuffledCards)
    setChoiceOne(null)
    setChoiceTwo(null)
  }

  const handleChoice = (card) => {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  useEffect(()=>{
    // choiceOne.src === choiceTwo.src && console.log("cards match");
    // choiceOne.src !== choiceTwo.src && console.log("not a  match");
    if (choiceTwo){
      setIsDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceTwo.src){
              return {...card, matched: true}
            }else {
              return card
            }
          })
        })
        resetTurn()
      }else{
        setTimeout(()=>resetTurn(),700)
      }
    }
  },[choiceTwo])

  console.log(cards)
  //reset the chices and plus one
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setIsDisabled(false)
  }

  return (
    <div className="App">
      <div className="top">
        <h1>Memory - Match</h1>
        <button onClick={shuffleCards}>New Game</button>
      </div>
      <div className='card-grid'>
        {cards.map((card) => (
          <SingleCard 
          key={card.id} 
          card={card} 
          handleChoice={handleChoice} 
          flipped={choiceOne === card || choiceTwo === card || card.matched}
          isDisabled={isDisabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App