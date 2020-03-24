
const QUOTES_API = "http://localhost:3000/quotes";

const quoteCard = document.querySelector('#card')

let currentQuote = {};
let acceptingAnswer= true;
let score = 0;
let quotesCounter = 0;
let availableQuotes = [];
let quotes = [];
let tag = "" 


const API = {
    getQuotes: () => fetch(QUOTES_API).then(resp => resp.json()),
    getAuthors: () => fetch(AUTHORS_API).then(response => response.json())
}

API.getQuotes().then(quotes => renderQuotes(quotes))

const renderQuotes = quotes => {
    quotes.forEach(quote => {
        getNewQuote(quote)
    })
}


// if (author.tag === 'celebrity') {
//     author.quote.push(availableQuotes)
// }

startGame = () => {
    quotesCounter = 0;
    score = 0;
    availableQuotes = [...quotes]
    getNewQuote();
}

const getNewQuote = () => {
    quotesCounter++
    const quoteIndex = Math.floor(Math.random()*availableQuotes.length);
    currentQuote = availableQuotes[quoteIndex];
    quoteCard.innerText = currentQuote.content
    
}