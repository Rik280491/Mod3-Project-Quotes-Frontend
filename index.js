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
  debugger;
  quotes.forEach(quote => renderQuote(quote));
};

const singAuthor = authors => {
  authors.forEach(author => renderAuthor(author));
};

const renderAuthor = author => {
  const image = document.createElement("img");
  image.src = author.img_url;

  body.append(image);
};

const renderQuote = quote => {
  const quoteCard = document.createElement("div");
  quoteCard.className = "card";
  const quoteContent = document.createElement("p");
  quoteContent.innerText = quote.content;

  quoteCard.append(quoteContent);
  body.append(quoteCard);
};

const renderGame = () => {
  landingPage.innerHTML = "";
  API.getQuotes().then(quotes => singQuote(quotes));
  API.getAuthors().then(authors => singAuthor(authors));
};
renderLanding();
