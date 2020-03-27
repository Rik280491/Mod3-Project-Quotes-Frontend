const GET_ROUNDS_API = "http://localhost:3000/get-rounds";
const GAMES_URL = "http://localhost:3000/games";

const API = {
  init: () => fetch(GET_ROUNDS_API).then(resp => resp.json()),

  getGames: () => fetch(GAMES_URL).then(response => response.json()),

  postGame: (newGame) => {
    fetch(GAMES_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({game: newGame})
  })
  .then(response => response.json())
}
};

const gameElements = document.querySelector("#game-elements");
const landingPage = document.querySelector("#landing-page");
const imageContainerB = document.querySelector("#image-container-b");
const imageContainerA = document.querySelector("#image-container-a");
const finalPage = document.querySelector('#final_page')

const table = document.createElement('table')
table.className = 'center'
const thScore = document.createElement('th')

let i = 0;
let score = 0;

const renderLanding = () => {
  
  const title = document.createElement("h1");
  title.class = "animated";
  title.innerText = "Who said it??";

  const gameBtn = document.createElement("button");
  gameBtn.className = "big-button"
  gameBtn.innerText = "Start";

  gameBtn.addEventListener("click", () => {
    renderGame(gameBtn, title);  
  });

  const leadTitle = document.createElement('h3')
  leadTitle.innerText = "leaderboard"

  landingPage.append(title, gameBtn, leadTitle, table);
};

const renderGame = () => {
  landingPage.remove()
  API.init().then(data => getNewRound(data));
};

const getNewRound = data => {
  
  console.log(data[0]);
  console.log(i);

  const quoteCard = document.createElement("div");
  quoteCard.className = "card";

  const quoteContent = document.createElement("p");
  quoteContent.innerText = data[i]["quote"]

  const imageA = document.createElement("img");
  imageA.className = 'piccy'
  imageA.src = data[i]["author"].img_url

  const imageB = document.createElement("img");
  imageB.className = 'piccy'
  imageB.src = data[i]["other_author"].img_url

  imageContainerA.append(imageA);
  quoteCard.append(quoteContent);
  imageContainerB.append(imageB);
  gameElements.append(imageContainerA, quoteCard, imageContainerB)

  const handleImageA = () => {
    // alert("Correct");
    score++
    nextRound(imageA, imageB, quoteCard, data, handleImageA, handleImageB, imageContainerA, imageContainerB);
  };

  imageContainerA.addEventListener("click", handleImageA)
  const handleImageB = () => {
    // alert("wrong");
    nextRound(imageA, imageB, quoteCard, data, handleImageA, handleImageB, imageContainerA, imageContainerB);
  };

  imageContainerB.addEventListener("click", handleImageB)
};

const nextRound = (imageA, imageB, quoteCard, data, handleImageA, handleImageB, imageContainerA, imageContainerB) => {
  console.log("next round", {imageA, imageB, quoteCard, data, handleImageA, handleImageB, imageContainerA, imageContainerB})
  i++;
  imageA.remove();
  imageB.remove();
  quoteCard.remove();
  imageContainerA.removeEventListener("click", handleImageA);
  imageContainerB.removeEventListener("click", handleImageB );
  //remove event listeners
  if (i <= (data.length - 1)) {
    getNewRound(data);
  // API.postGame("sam", 10, data.quotes.map(q => q.id))
    // return;
  } else {
    renderEndPage()
  }
};

const renderEndPage = (user) => {
  console.log("rendering")
  console.log(score)

  const gameOver = document.createElement('h1')
  gameOver.className = 'animated'
  gameOver.innerText = "Game Over!"

  const scoreCard = document.createElement('div')
  scoreCard.className = "card"

  const scoreContent = document.createElement('h3')
  scoreContent.innerText = `You got ${score}/10!`

  const submitScore = document.createElement('button')
  submitScore.innerText = "Submit Score"

  const createUser = document.createElement("form")
  const name = document.createElement("input")
  name.name = "name"
  name.placeholder = "name"

  // endMessge = document.createElement('h5')
  // endMessage.className = "animated"

  const finalImage = document.createElement('img')
  finalImage.className = 'finalPiccy'
  // finalImage.src = "https://images.mentalfloss.com/sites/default/files/styles/insert_main_wide_image/public/ice-cream-poop.png"
  if (score === 0 ) {
    finalImage.src = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2F3og0IJHMqlmPzy7sGs%2Fgiphy.gif&f=1&nofb=1"
  }
  if (score === 1 ) {
    finalImage.src = "https://images.mentalfloss.com/sites/default/files/styles/insert_main_wide_image/public/ice-cream-poop.png"
  }
  if (score === 2 ) {
    finalImage.src = "https://media.tenor.com/images/2a977f69d4adc7b6879b904763012cac/tenor.gif"
  }
  if (score === 3 ) {
    finalImage.src = "https://media.tenor.com/images/aa59ee31267aadab1fec222b537ace84/tenor.gif"
  }
  if (score === 4 ) {
    finalImage.src = "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn2.pu.nl%2Fmedia%2Fmisc2%2F7rjppjh.gif&f=1&nofb=1"
  }
  if (score === 5 ) {
    finalImage.src = ""
  }
  if (score === 6 ) {
    finalImage.src = "https://media.tenor.com/images/74c5d5848cfceb38323c79bdb0d078e2/tenor.gif"
  }
  if (score === 7 ) {
    finalImage.src = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2FZmdErsWqppgMo%2Fgiphy.gif&f=1&nofb=1"
  }
  if (score === 8 ) {
    finalImage.src = "https://media.tenor.com/images/f1cef839e5124661798cc567f5ca1aa3/tenor.gif"
  }
  if (score === 9 ) {
    finalImage.src = "https://media.tenor.com/images/1408360eeb8f880c1d9a2420dd34e492/tenor.gif"
  }
  if (score === 10 ) {
    finalImage.src = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2FTcdpZwYDPlWXC%2Fgiphy.gif&f=1&nofb=1"
    
  }

  const leadTitlee = document.createElement('h3')
  leadTitlee.innerText = "leaderboard"  

  const message = document.createElement('h4')
  message.className = 'animated'
  message.innerText = "Don't like you score? Take it up with Rick on 07536937420 "

  createUser.append(name, submitScore)
  scoreCard.append(scoreContent);
  gameElements.append(gameOver, scoreCard, createUser, finalImage, leadTitlee, table, message)

  createUser.addEventListener("submit", event => {
    newGame = {
      username: event.target.elements.name.value,
      score: score
    }
    API.postGame(newGame)
  });

  renderLeaderboard()
}

const renderLeaderboard = (user) => {
  
  const thUser = document.createElement('th')
  const tr = document.createElement('tr')

  thUser.innerText = `${user.user.name} - ${user.score}`

  tr.append(thUser)
  table.append(tr)

  return table
}

 

renderLanding();

API.getGames().then(users => singleGame(users))


const singleGame = users => {
  users.forEach(user => {
    renderLeaderboard(user)
  })
}

