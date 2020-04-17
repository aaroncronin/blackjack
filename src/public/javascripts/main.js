document.addEventListener("DOMContentLoaded", main);

function main() {
  const f = document.querySelector(".playBtn");
  f.addEventListener("click", function handleClick(evt) {
    evt.preventDefault();
    this.parentElement.parentElement.classList.toggle("visibility");
    const values = document.querySelector("#startValues").value;
    loadCards(values);
  });

  // when user inputs values, change position of elements in input array
  // to be at beginning of card array
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

  Loop1: for (let i = 0; i < inputValues.length; i++) {
    Loop2: for (let j = 0; j < cards.length; j++) {
      if (cards[j].value === inputValues[i]) {
        arr.push(cards[j]);
        cards.splice(j, 1);
        break Loop2;
      }
    }
  }
  cards = shuffle(cards);
  const gameCards = arr.concat(cards);

  gamePlay(gameCards);
}

// FISHER YATES ALGORITHM
function shuffle(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

function gamePlay(cards) {
  let userScore = 0;
  let compScore = 0;
  const userScoreDiv = document.createElement("div");

  let compCards = document.createElement("div");
  let userCards = document.createElement("div");
  userCards.className = "userCards";
  compCards.className = "compCards";
  for (let i = 0; i < 4; i++) {
    let card = document.createElement("div");
    if (i === 0) {
      card.className = "backCard";
      compCards.appendChild(card);
    } else {
      card.className = "frontCard";
      card.innerText = cards[i].value + " " + cards[i].suit;
      if (i % 2 == 0) {
        compCards.appendChild(card);
      } else {
        userScore += getValue(cards[i].value, userScore);
        userCards.appendChild(card);
      }
    }
  }
  cards.splice(0, 4);
  userScoreDiv.innerText = userScore;
  document.body.appendChild(compCards);
  document.body.appendChild(userScoreDiv);
  document.body.appendChild(userCards);
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
