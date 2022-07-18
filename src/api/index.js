import axios from 'axios';

const URL = "https://random-words5.p.rapidapi.com/getRandom";
const dictionaryURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const options = {
    params: { wordLength: '5' },
    headers: {
        'X-RapidAPI-Key': process.env.REACT_WORD_API_KEY,
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
        const response = await axios.get(dictionaryURL + currentGuess);
        return response;
    } catch (error) {
        console.log(error.message);
        return error.response.status;
    }
};