import axios from 'axios';

const URL = "https://random-words5.p.rapidapi.com/getRandom";

const wordnikURL = "https://api.wordnik.com/v4/word.json/";

const options = {
    params: { wordLength: '5' },
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_WORD_API_KEY,
        'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
    }
};

export const getWord = async () => {
    try {
        const response = await axios.get(URL, options);
        return response;
    } catch (error) {
        console.log(error.message);
    }
};

export const getIfValidWord = async (currentGuess) => {
    try {
        const response = await axios.get(wordnikURL + currentGuess + "/scrabbleScore?api_key=" + process.env.REACT_APP_WORDNIK_API_KEY);
        return response;
    } catch (error) {
        return error.response.status;
    }
};