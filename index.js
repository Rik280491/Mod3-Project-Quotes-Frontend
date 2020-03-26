const GET_ROUNDS_API = "http://localhost:3000/get-rounds";

const GAMES_URL = "http://localhost:3000/games";

const API = {
  init: () => fetch(GET_ROUNDS_API).then(resp => resp.json()),
  postGame: (username, score, quote_ids) => fetch(GAMES_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ username, score, quote_ids })
  })
};

const gameElements = document.querySelector("#game-elements");
const landingPage = document.querySelector("#landing-page");
const imageContainerB = document.querySelector("#image-container-b");
const imageContainerA = document.querySelector("#image-container-a");
const timer = document.querySelector('#timer')

let i = 0;
let score = 1;

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
  

  // const matchID = data => {
  //   return data[0].quotes.map(quote => quote.author_id);
  // } 

  const timer = document.createElement('div')
  timer.id = 'timer'
  createTimer();

  const quoteCard = document.createElement("div");
  quoteCard.className = "card";

  const quoteContent = document.createElement("p");
  
  quoteContent.innerText = data[i]["quote"]
  
  const imageA = document.createElement("img");
  imageA.className = 'piccy'
  imageA.src = data[i]["author"].img_url
  
  const imageB = document.createElement("img");
  imageA.className = 'piccy'
  imageB.src = data[i]["other_author"].img_url

  imageContainerA.append(imageA);
  quoteCard.append(quoteContent);
  imageContainerB.append(imageB);
  gameElements.append(timer, imageContainerA, quoteCard, imageContainerB)
  
  //  debugger
  const handleImageA = () => {
    // alert("Correct");
    nextRound(imageA, imageB, quoteCard, data, handleImageA, handleImageB, imageContainerA, imageContainerB);
    score++
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
  }  else {
    renderEndPage()
  }
};

const renderEndPage = () => {
  console.log("rendering")
  console.log(score)
  // score has to be 0+
  // if score = 1, then score = 0
  if (score === 1 ) {
    score = 0
    // scoreContent.innerText = "you thick piece oif shit"
  }

  const scoreCard = document.createElement('div')
  scoreCard.className = "card"

  const scoreContent = document.createElement('h3')
  scoreContent.innerText = `You got ${score}/10!`

  const submitScore = document.createElement('button')
  submitScore.innerText = "Submit Score"
  const createUser = document.createElement("form")
  const username = document.createElement("input")
  username.placeholder = "Enter Your Name"

  createUser.append(username, submitScore)
  scoreCard.append(scoreContent);
  gameElements.append(scoreCard, createUser)
  
  createUser.addEventListener("submit", event => {
    event.preventDefault(); 
    API.postGame(username, score)
  });
}


const createTimer = () => {
  const FULL_DASH_ARRAY = 283;
  const WARNING_THRESHOLD = 10;
  const ALERT_THRESHOLD = 5;

  const COLOR_CODES = {
    info: {
      color: "green"
    },
    warning: {
      color: "orange",
      threshold: WARNING_THRESHOLD
    },
    alert: {
      color: "red",
      threshold: ALERT_THRESHOLD
    }
  };

  const TIME_LIMIT = 10;
  let timePassed = 0;
  let timeLeft = TIME_LIMIT;
  let timerInterval = null;
  let remainingPathColor = COLOR_CODES.info.color;

  document.getElementById("timer").innerHTML = `
  <div class="base-timer">
    <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
        <path
          id="base-timer-path-remaining"
          stroke-dasharray="283"
          class="base-timer__path-remaining ${remainingPathColor}"
          d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
        ></path>
      </g>
    </svg>
    <span id="base-timer-label" class="base-timer__label">${formatTime(
      timeLeft
    )}</span>
  </div>
  `;

  startTimer();

  function onTimesUp() {
    clearInterval(timerInterval);
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      timePassed = timePassed += 1;
      timeLeft = TIME_LIMIT - timePassed;
      document.getElementById("base-timer-label").innerHTML = formatTime(
        timeLeft
      );
      setCircleDasharray();
      setRemainingPathColor(timeLeft);

      if (timeLeft === 0) {
        onTimesUp();
      }
    }, 1000);
  }

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 5) {
      seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
  }

  function setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(warning.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(info.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(warning.color);
    }
  }

  function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
  }

  function setCircleDasharray() {
    const circleDasharray = `${(
      calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
      .getElementById("base-timer-path-remaining")
      .setAttribute("stroke-dasharray", circleDasharray);
  }
}

renderLanding();
