import React, { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid';
import Keypad from './Keypad';
import Modal from './Modal';

export default function Wordle({ solution }) {
    const { turn, currentGuess, guesses, isCorrect, handleKeyup, usedKeys } = useWordle(solution);

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
        <div>
            <Grid currentGuess={currentGuess} guesses={guesses} turn={turn}></Grid>
            <Keypad usedKeys={usedKeys}></Keypad>
            {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution}></Modal>}
        </div>
    )
}
