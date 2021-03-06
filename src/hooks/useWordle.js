import { useEffect, useState } from "react";
import { getIfValidWord } from "../api";

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState([...Array(6)]); // array of formatted guesses
    const [history, setHistory] = useState([]); // array of words
    const [isCorrect, setIsCorrect] = useState(false);
    const [usedKeys, setUsedKeys] = useState({});   // used for keypad => {a: 'green', b: 'grey'}

    const [pressedEnter, setPressedEnter] = useState(false);

    // for displaying incorrect word error
    const [errorClassName, setErrorClassName] = useState('no-error');

    useEffect(() => {
        if (pressedEnter) {
            getIfValidWord(currentGuess).then((res) => {
                let isDictionaryWord = false;

                if (res !== 404) {
                    isDictionaryWord = true;
                }

                if (validateGuess(isDictionaryWord)) {
                    setErrorClassName('no-error');
                    const formatted = formatGuess();
                    addNewGuess(formatted);
                }
                else {
                    setErrorClassName('error');
                }
            });
            setPressedEnter(false);
        }
        setErrorClassName('no-error');

    }, [pressedEnter]);

    // store the entered letter into array of objects: [{key: 'a', color: 'green'}]
    const formatGuess = () => {
        let solutionArray = [...solution];
        let formattedGuess = [...currentGuess].map((letter) => {
            return { key: letter, color: 'grey' }
        });

        formattedGuess.forEach((dict, i) => {
            if (solutionArray[i] === dict.key) {
                formattedGuess[i].color = 'green';
                solutionArray[i] = null;
            }

            else if (solutionArray.includes(dict.key)) {
                formattedGuess[i].color = 'yellow';
            }
        });
        return formattedGuess;
    }

    // add the entered letter to state
    const addNewGuess = (formattedWordDict) => {
        // check if current guess is correct
        if (currentGuess === solution) {
            setIsCorrect(true);
            console.log("You win!!!");
        }

        setGuesses((prev) => {
            let newGuesses = [...prev];
            newGuesses[turn] = formattedWordDict;
            return newGuesses;
        });

        setHistory((prev) => {
            // as the array is empty we can simply add the guess
            return [...prev, currentGuess];
        });

        setTurn((prev) => {
            return prev + 1;
        });

        // for keypad
        setUsedKeys((prevUsedKeys) => {
            formattedWordDict.forEach((l) => {
                const prevColor = prevUsedKeys[l.key];

                if (l.color === 'green') {
                    prevUsedKeys[l.key] = 'green';
                    return;
                }

                if (l.color === 'yellow' && prevColor !== 'green') {
                    prevUsedKeys[l.key] = 'yellow';
                    return;
                }

                if (l.color === 'grey' && (prevColor !== 'green' || prevColor !== 'yellow')) {
                    prevUsedKeys[l.key] = 'grey';
                    return;
                }
            });
            return prevUsedKeys;
        })

        setCurrentGuess('');
    }

    // track current guess word
    const handleKeyup = ({ key }) => {
        // keypress also outputs "shift", "enter", etc when pressed
        // Hence, to filter it out we us a regex

        if (key === "Enter") {
            setPressedEnter(true);
        }

        else {
            // setPressedEnter(false);
            if (key === "Delete" || key === "Backspace" || key === "???") {  // Delete character
                setCurrentGuess((prev) => prev.slice(0, -1));
                return;
            }

            else if (/^[a-zA-Z]$/.test(key)) {
                if (currentGuess.length < 5) {
                    setCurrentGuess((prev) => prev + key);
                }
            }
        }
    }

    const validateGuess = (isDictionaryWord) => {
        // word length should be 5            
        if (currentGuess.length < 5 || history.includes(currentGuess) || turn > 5 || !isDictionaryWord) {
            return false;
        }

        return true;
    }
    return { turn, currentGuess, guesses, isCorrect, handleKeyup, usedKeys, pressedEnter, errorClassName }
};

export default useWordle;