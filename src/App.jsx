// react, componentes, estáticos
import { useContext, useEffect } from 'react';
import { QuizContext } from './context/quiz';

import './App.css';

import Welcome from './components/Welcome'
import Question from './components/Question';
import GameOver from './components/GameOver';
import PickCategory from './components/Category';

function App() {
  const [ quizState ] = useContext(QuizContext);

  return (
    <div className="App">
      <h1>Quiz de Programação</h1>
      {quizState.gameStage === "Start" && <Welcome />} {/*Se estiver no estado Start será exibido o componente Welcome */}
      {quizState.gameStage === "Category" && <PickCategory />}
      {quizState.gameStage === "Playing" && <Question />} {/*Se estiver no estado Playing será exibido o componente Question */}
      {quizState.gameStage === "End" && <GameOver />} 
    </div>
  )
}

export default App
