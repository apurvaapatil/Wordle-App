import React, { useEffect, useState } from 'react';
import useWordle from '../hooks/useWordle';

import './row.css';

export default function Row({ guess, currentGuess }) {

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

    // if current guess then display it as the user is typing
    if (currentGuess) {
        let letters = [...currentGuess];

        return (
            <div className={'row current '}>
                {
                    letters.map((l, i) => (
                        <div key={i} className={'filled '}>{l}</div>
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

    // if (pressedEnter && !isDictionaryWord) {
    //     // setErrorClassName('error');
    // }

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
