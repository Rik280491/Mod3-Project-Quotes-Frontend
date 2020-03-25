const QUOTES_API = "http://localhost:3000/quotes";
const AUTHORS_API = "http://localhost:3000/authors";


const API = {
  getQuotes: () => fetch(QUOTES_API).then(resp => resp.json()),

  getAuthors: () => fetch(AUTHORS_API).then(response => response.json())
};

const body = document.querySelector("body");
const landingPage = document.querySelector("#landing-page");

const renderLanding = () => {
  const title = document.createElement("h1");
  title.innerText = "Who said it??";

  const gameBtn = document.createElement("button");
  gameBtn.innerText = "Start";

  gameBtn.addEventListener("click", () => {
    renderGame();
  });

  landingPage.append(title, gameBtn);
};

const singQuote = quotes => {

  (i = 0), i++; // needs to be random
  fetch(`${QUOTES_API}/${i}`)
    .then(resp => resp.json())
    .then(quote => renderQuote(quote))
   
};

const singAuthor = authors => {
  (i = 1), i++; //needs to be random. works(no duplicate photo) if counter starts at 1. Too hacky for my liking (would eventually fail when we do random numbers)
  fetch(`${AUTHORS_API}/${i}`)
    .then(resp => resp.json())
    .then(author => renderAuthor(author));
};

const renderAuthor = author => {

  const imageContainerA = document.querySelector("#image-container-a")
  const image = document.createElement("img");

  // same author, doesn't work, how can i call quote.author_id?
  
  // if (author.id === author.quotes.author_id) {             
  //     image.innerText = "Hello"
  // } else {
  //     image.src = author.img_url;
  // }

  image.src = author.img_url;

  imageContainerA.append(image);
};

const renderQuote = quote => {
  const quoteCard = document.createElement("div");
  quoteCard.className = "card";
  const quoteContent = document.createElement("p");
  quoteContent.innerText = quote.content;
  
  const authorImage = document.createElement("img")
  authorImage.src = quote.author.img_url


  const imageContainerB = document.querySelector("#image-container-b")
  const authorImage = document.createElement("img");
  authorImage.src = quote.author.img_url;

  imageContainerB.append(authorImage)
  quoteCard.append(quoteContent);
  
 body.append(quoteCard, imageContainerB);
};

const renderGame = () => {
  landingPage.innerHTML = "";
  API.getQuotes().then(quotes => singQuote(quotes));
  API.getAuthors().then(authors => singAuthor(authors));
};
renderLanding();
