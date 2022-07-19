import React, { useEffect, useState } from "react";
import { getWord } from "./api";
import './App.css';
import Wordle from "./components/Wordle";
import ModalContext from "./context/context";
import { FaGithub } from 'react-icons/fa';

const App = () => {

  const [word, setWord] = useState();
  const [playAgain, setPlayAgain] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getWord().then(({ data: word }) => {
      setWord(word);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    console.log(playAgain);
  }, [playAgain]);

  return (
    <ModalContext.Provider value={{ playAgain, setPlayAgain }}>
      <div className="App">
        <p>Wordle</p>
        {!isLoading && <div>
          {word && <Wordle solution={word} />}
          <a href="">
            <FaGithub style={{ fontSize: '25px', background: 'transparent', }}></FaGithub>
          </a>
        </div>}

        {isLoading &&
          <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
          </div>}


      </div>
    </ModalContext.Provider>
  );
}

export default App;
