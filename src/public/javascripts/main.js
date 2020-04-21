document.addEventListener("DOMContentLoaded", main);

function main() {
  const f = document.querySelector(".playBtn");
  f.addEventListener("click", function handleClick(evt) {
    evt.preventDefault();
    this.parentElement.parentElement.classList.toggle("visibility");
    const values = document.querySelector("#startValues").value;
    loadCards(values);
  });
}
function loadCards(values) {
  let cards = [
    { suit: "❤️", value: "2" },
    { suit: "❤️", value: "3" },
    { suit: "❤️", value: "4" },
    { suit: "❤️", value: "5" },
    { suit: "❤️", value: "6" },
    { suit: "❤️", value: "7" },
    { suit: "❤️", value: "8" },
    { suit: "❤️", value: "9" },
    { suit: "❤️", value: "10" },
    { suit: "❤️", value: "J" },
    { suit: "❤️", value: "Q" },
    { suit: "❤️", value: "K" },
    { suit: "❤️", value: "A" },
    { suit: "♦️", value: "2" },
    { suit: "♦️", value: "3" },
    { suit: "♦️", value: "4" },
    { suit: "♦️", value: "5" },
    { suit: "♦️", value: "6" },
    { suit: "♦️", value: "7" },
    { suit: "♦️", value: "8" },
    { suit: "♦️", value: "9" },
    { suit: "♦️", value: "10" },
    { suit: "♦️", value: "J" },
    { suit: "♦️", value: "Q" },
    { suit: "♦️", value: "K" },
    { suit: "♦️", value: "A" },
    { suit: "♣️", value: "2" },
    { suit: "♣️", value: "3" },
    { suit: "♣️", value: "4" },
    { suit: "♣️", value: "5" },
    { suit: "♣️", value: "6" },
    { suit: "♣️", value: "7" },
    { suit: "♣️", value: "8" },
    { suit: "♣️", value: "9" },
    { suit: "♣️", value: "10" },
    { suit: "♣️", value: "J" },
    { suit: "♣️", value: "Q" },
    { suit: "♣️", value: "K" },
    { suit: "♣️", value: "A" },
    { suit: "♠️", value: "2" },
    { suit: "♠️", value: "3" },
    { suit: "♠️", value: "4" },
    { suit: "♠️", value: "5" },
    { suit: "♠️", value: "6" },
    { suit: "♠️", value: "7" },
    { suit: "♠️", value: "8" },
    { suit: "♠️", value: "9" },
    { suit: "♠️", value: "10" },
    { suit: "♠️", value: "J" },
    { suit: "♠️", value: "Q" },
    { suit: "♠️", value: "K" },
    { suit: "♠️", value: "A" },
  ];
  const inputValues = values.split(",");
  let arr = [];
  let gameCards = [];
  if (inputValues[0] !== "") {
    inputValues.forEach((i) => {
      let cardMatches = cards.filter((card) => card.value === i);
      const idx = Math.floor(Math.random() * cardMatches.length); //get random suit
      arr.push(cardMatches[idx]);
      cards.splice(cards.indexOf(cardMatches[idx]), 1);
    });
    cards = shuffle(cards);
    gameCards = arr.concat(cards);
  } else {
    gameCards = shuffle(cards);
  }
  initialGamePlay(gameCards);
}

// FISHER YATES ALGORITHM
function shuffle(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

function initialGamePlay(cards) {
  let userScore = 0;
  let compScore = 0;
  const userScoreDiv = document.createElement("div");
  userScoreDiv.className = "userScoreBlock";
  const compScoreDiv = document.createElement("div");
  compScoreDiv.className = "compScoreBlock";
  let compCards = document.createElement("div");
  let userCards = document.createElement("div");
  userCards.className = "userCards";
  compCards.className = "compCards";

  for (let i = 0; i < 4; i++) {
    let card = document.createElement("div");
    if (i === 0) {
      card.className = "backCard";
      card.innerHTML = newCard(cards[i]);
      compCards.appendChild(card);
      compScore += getValue(cards[i].value, compScore);
    } else {
      card.className = "frontCard";
      card.innerHTML = newCard(cards[i]);
      if (i % 2 == 0) {
        compCards.appendChild(card);
        compScore += getValue(cards[i].value, compScore);
      } else {
        userScore += getValue(cards[i].value, userScore);
        userCards.appendChild(card);
      }
    }
  }
  cards.splice(0, 4); // remove first 4 cards from deck

  const hitButton = document.createElement("button");
  hitButton.textContent = "Hit";
  const standButton = document.createElement("button");
  standButton.className = "standButton";
  standButton.textContent = "Stand";

  let bjLabel;
  let blackjack = false;
  if (userScore === 21) {
    bjLabel = document.createElement("div");
    bjLabel.className = "blackjack";
    bjLabel.textContent =
      "Player Has Blackjack! Hit Stand to See Dealer's Hand.";
    blackjack = true;
    document.body.appendChild(bjLabel);
  }

  const result = document.createElement("div");
  result.className = "result";

  hitButton.addEventListener("click", function handleHit(evt) {
    evt.preventDefault();
    const hitCard = document.createElement("div");
    const hitData = cards.shift(0);
    hitCard.className = "frontCard";
    hitCard.innerHTML = newCard(hitData);
    userScore += getValue(hitData.value, userScore);

    userScoreDiv.textContent = "Player Hand - Total: " + userScore;
    userCards.appendChild(hitCard);

    if (userScore > 21) {
      hitButton.classList.toggle("visibility");
      standButton.classList.toggle("visibility");

      result.innerText = "Player Lost - Busted :(";
      document.body.appendChild(result);

      document
        .querySelector(".compCards")
        .querySelector(".backCard").className = "frontCard";

      compScoreDiv.textContent = "Computer Hand - Total: " + compScore;
    }
  });

  standButton.addEventListener("click", function handleStand(evt) {
    evt.preventDefault();
    if (bjLabel) {
      bjLabel.classList.toggle("visibility");
    }

    document.querySelector(".compCards").querySelector(".backCard").className =
      "frontCard";

    if (!blackjack) {
      while (compScore < 17) {
        // dealer hits until they have 17 or more
        const card = document.createElement("div");
        const cardData = cards.shift(0);
        card.className = "frontCard";
        card.innerHTML = newCard(cardData);

        compScore += getValue(cardData.value, compScore);
        compCards.appendChild(card);
      }
    }

    hitButton.classList.toggle("visibility");
    standButton.classList.toggle("visibility");
    if (compScore === userScore) {
      result.innerText = "Tied!";
      document.body.appendChild(result);
    } else if (compScore === 21) {
      result.innerText = "Computer Has 21. Player Lost. :(";
      document.body.appendChild(result);
    } else if (compScore > 21) {
      result.innerText = "Computer Busted. Player Won! :)";
      document.body.appendChild(result);
    } else if (21 - userScore > 21 - compScore) {
      result.innerText = "Computer Closer to 21. Player Lost. :(";
      document.body.appendChild(result);
    } else {
      result.innerText = "Player Won! :)";
      document.body.appendChild(result);
    }
    compScoreDiv.textContent = "Computer Hand - Total: " + compScore;
  });

  userScoreDiv.textContent = "Player Hand - Total: " + userScore;
  compScoreDiv.textContent = "Computer Hand - Total: ?";

  document.body.appendChild(compScoreDiv);
  document.body.appendChild(compCards);
  document.body.appendChild(userScoreDiv);
  document.body.appendChild(userCards);
  document.body.appendChild(hitButton);
  document.body.appendChild(standButton);
}

function getValue(value, score) {
  let numVal;
  const faceCards = ["J", "Q", "K"];
  if (faceCards.includes(value)) {
    numVal = 10;
  } else if (value === "A") {
    score + 11 <= 21 ? (numVal = 11) : (numVal = 1);
  } else {
    numVal = parseInt(value);
  }
  return numVal;
}

function newCard(cardData) {
  return (
    "<span id='top'>" +
    cardData.value +
    cardData.suit +
    "</span>" +
    "<span id='bottom'>" +
    cardData.value +
    cardData.suit +
    "</span>"
  );
}
