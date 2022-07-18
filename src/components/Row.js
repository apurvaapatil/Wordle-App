import React, { useEffect } from 'react';

import './row.css';

// useEffect(() => {

// }, [currentGuess]);

export default function Row({ guess, currentGuess, isDictionaryWord }) {

    // console.log(isDictionaryWord)

    // if guess is not undefined, i.e, this is the first turn
    if (guess) {
        return (
            <div className='row past'>
                {
                    guess.map((l, i) => (
                        <div key={i} className={l.color}>{l.key}</div>
                    ))
                }
            </div >
        )
    }

    // if current guess then display it as user types
    if (currentGuess) {

        let letters = [...currentGuess];

        // while (letters.length < 5) {
        //     letters.push('');
        // }

        return (
            <div className='row current'>
                {
                    letters.map((l, i) => (
                        <div key={i} className={'filled' + " " + (isDictionaryWord ? ' ' : 'error')}>{l}</div>
                    ))
                }
                {
                    [...Array(5 - letters.length)].map((_, i) => (
                        <div key={i}></div>
                    ))
                }
            </div>
        )
    }

    return (
        <div className='row'>
            <div>{ }</div>
            <div>{ }</div>
            <div>{ }</div>
            <div>{ }</div>
            <div>{ }</div>
        </div>
    )
}
