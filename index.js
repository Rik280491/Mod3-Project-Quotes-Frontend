const START_GAME_API = "http://localhost:3000/start-game";

const API = {
  init: () => fetch(START_GAME_API).then(resp => resp.json())
};

const gameElements = document.querySelector("#game-elements");
const landingPage = document.querySelector("#landing-page");
const imageContainerB = document.querySelector("#image-container-b");
const imageContainerA = document.querySelector("#image-container-a");

let i = 0;

const renderLanding = () => {
  const title = document.createElement("h1");
  title.class = "animated";
  title.innerText = "Who said it??";

  const gameBtn = document.createElement("button");
  gameBtn.innerText = "Start";

  gameBtn.addEventListener("click", () => {
    renderGame();
  });

  landingPage.append(title, gameBtn);
};

const renderGame = () => {
  landingPage.innerHTML = "";
  API.init().then(data => getNewRound(data));
};

const getNewRound = data => {
  console.log(data[0]);
  console.log(i);
  debugger;

  const matchID = data => {
    return data[0].quotes.map(quote => quote.author_id);
  } 

  const quoteCard = document.createElement("div");
  quoteCard.className = "card";

  const quoteContent = document.createElement("p");
  // quoteContent.innerText = data[0].quotes.find(quote => quote.author_id)[i].content;
  quoteContent.innerText = data[0].quotes.find(quote => quote.author_id === matchID(data)[i]).content

  const imageA = document.createElement("img");
  imageA.src = data[0].authors.find(author => author.id === matchID(data)[i]).img_url;

  const imageB = document.createElement("img");
  imageB.src = data[0].authors.find(
    author =>
      author.id === Math.floor(Math.random() * data[0].authors.length + 1)
  ).img_url;

  imageContainerA.append(imageA);
  quoteCard.append(quoteContent);
  imageContainerB.append(imageB);
  gameElements.append(imageContainerA, quoteCard, imageContainerB);

  imageContainerA.addEventListener("click", () => {
    alert("Correct");
    nextRound(imageA, imageB, quoteCard, imageContainerA, imageContainerB, data);
  });

  imageContainerB.addEventListener("click", () => {
    alert("wrong");
    nextRound(imageA, imageB, quoteCard, imageContainerA, imageContainerB, data);
  });
};

const nextRound = (imageA, imageB, quoteCard, imageContainerA, imageContainerB, data) => {
  i++;
  imageA.remove();
  imageB.remove();
  quoteCard.remove();
  imageContainerA.removeEventListener("click", )
  // imageContainerB.removeEventListener("click",  )
  //remove event listeners
  getNewRound(data);
};

renderLanding();
