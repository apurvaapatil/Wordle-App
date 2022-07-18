import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle';

import './keypad.css';

export default function Keypad({ usedKeys }) {

    const [letters, setLetters] = useState(null);

    useEffect(() => {
        const keyboard = axios.get('/data/keypad.json', {})
            .then((res) => {
                setLetters(res.data.letters);
            })
            .catch((e) => {
                console.log(e);
            })
    }, [])

    // to link the onscreen keyboard to actual keyboard events
    const keyboardClick = (key) => {
        var event = new KeyboardEvent('keyup', key);
        window.dispatchEvent(event);
    }

    return (
        <div className='keypad'>
            {letters && letters.map((l) => {
                const color = usedKeys[l.key];
                return (<div id="key" className={color + ' letter'} onClick={() => keyboardClick(l)} key={l.key}>{l.key}</div>
                );
            })}
        </div>
    )
}
