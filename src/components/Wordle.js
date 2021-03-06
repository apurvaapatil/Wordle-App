import React, { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid';
import Keypad from './Keypad';
import Modal from './Modal';
import { RowContext } from '../context/context'

import './wordle.css';

export default function Wordle({ solution }) {
    const { turn, currentGuess, guesses, isCorrect, handleKeyup, usedKeys, pressedEnter, errorClassName } = useWordle(solution);

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup);  // will fireup everytime a user presses a key

        if (isCorrect) {
            window.removeEventListener('keyup', handleKeyup);

            setTimeout(() => {
                setShowModal(true);
            }, 2000);
        }

        if (turn > 5) {
            window.removeEventListener('keyup', handleKeyup);

            setTimeout(() => {
                setShowModal(true);
            }, 2000);
        }

        return (() => {
            window.removeEventListener('keyup', handleKeyup);   // will detach once the page reloads(useEffect is called)
        })
    }, [handleKeyup, isCorrect, turn]);

    return (
        <RowContext.Provider value={{ pressedEnter, isCorrect, errorClassName }}>
            <div>
                <h3 className={errorClassName}>Incorrect Word</h3>
                <Grid currentGuess={currentGuess} guesses={guesses} turn={turn}></Grid>
                <Keypad usedKeys={usedKeys}></Keypad>
                {showModal && <Modal isCorrect={isCorrect} solution={solution}></Modal>}
            </div>
        </RowContext.Provider>
    )
}
