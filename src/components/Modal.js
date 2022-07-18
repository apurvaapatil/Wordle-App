import React, { useContext, useEffect, useState } from 'react';
import ModalContext from '../context/context';

import './modal.css';

export default function Modal({ isCorrect, turn, solution }) {

    const { playAgain, setPlayAgain } = useContext(ModalContext);
    // const [playAgain, setPlayAgain] = useState(false);

    const playAgainHandler = () => {
        // console.log("play again")
        setPlayAgain(true);
    }

    useEffect(() => {
        console.log(playAgain);
    }, [playAgain])

    return (
        <div className='modal'>
            {isCorrect && (
                <div>
                    <p className='header'>You Win! :)</p>
                    <p className='sol'>The solution is: <span className='solution'>{solution}</span></p>
                    <button className='button' onClick={() => playAgainHandler()}>Play Again</button>
                </div>
            )}
            {!isCorrect && (
                <div>
                    <p className='header'>Better luck next time! :)</p>
                    <p className='sol'>The solution is: <span className='solution'>{solution}</span></p>
                    <button className='button' onClick={() => playAgainHandler()}>Play Again</button>
                </div>
            )}
        </div>
    )
}
