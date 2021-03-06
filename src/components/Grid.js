import React from 'react'
import Row from './Row'

export default function Grid({ currentGuess, guesses, turn }) {
    return (
        <div className='grid'>
            {
                // show current guess according to turn (turn row number)
                guesses.map((guess, i) => {
                    if (turn === i) {
                        return <Row key={i} currentGuess={currentGuess}></Row>

                    }
                    // previous guesses
                    return (<Row key={i} guess={guess} ></Row>)
                })}
        </div>
    )
}
