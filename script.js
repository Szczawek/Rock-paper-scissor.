const score = document.getElementById("score");
const stageOne = document.querySelector("#stage-one");
const yourPick = document.querySelector("#your-pick");
const options = document.querySelector(".options");
const btn = document.getElementById("confirme");
const message = document.querySelector(".message");
const computerImg = document.getElementById("computerMove");
const rules = document.getElementById("rules");
const rulesOfGame = document.getElementById("rules-of-game");
const closeRules = document.getElementById("close-rules");
const caseGame = document.getElementById("case-of-game");

// button that opens the rules of the game
closeRules.addEventListener("click", () => {
  rulesOfGame.style.display = "none";
});
rules.addEventListener("click", () => {
  rulesOfGame.style.display = "grid";
});
let oneTime = true;
let swip = true;
let computer;
let eValue;

function random(max) {
  return Math.floor(Math.random() * max);
}

stageOne.addEventListener("click", () => {
  document.getElementById("segment-one").style.display = "none";
  document.querySelector(".game").style.display = "grid";
});
// game character
const playMove = {
  rock: {
    win: ["scissors", "lizard"],
    lost: ["paper", "spock"],
  },

  paper: {
    win: ["rock", "spock"],
    lost: ["scissors", "spock"],
  },

  scissors: {
    win: ["paper", "lizard"],
    lost: ["spock", "rock"],
  },
  lizard: {
    win: ["paper", "spock"],
    lost: ["scissors", "rock"],
  },
  spock: {
    win: ["rock", "scissors"],
    lost: ["paper", "lizard"],
  },
};
let history = 0;
class Game {
  constructor(myMove, score, computerMove) {
    this.myMove = myMove;
    this.computerMove = computerMove;
    this.score = score;
  }
  check() {
    if (this.myMove == this.computerMove) {
      message.textContent = "draw";
    } else if (playMove[this.myMove]["win"].includes(this.computerMove)) {
      message.textContent = "You win";
      this.score += 1;
    } else {
      this.score = 0;
      message.textContent = "You lose";
    }
    history = this.score;
    score.textContent = this.score;
  }
}
function value(element) {
  const item = ["rock", "paper", "scissors", "lizard", "spock"];
  const randomVallue = item[random(5)];
  computer = randomVallue;
  let ans = new Game(element, history, randomVallue);
  ans.check();
}

let numTwo = 0;
const item = document.querySelectorAll("#choice");
item.forEach((e) =>
  e.addEventListener("click", (e) => {
    addFigure(e.currentTarget.value, yourPick, "remove", numTwo);
    numTwo = 1;
    eValue = e.currentTarget.value;
  })
);

// adding computer choice
let num = 0;
btn.addEventListener("click", () => {
  value(eValue);
  addFigure(computer, computerImg, "trash", num);
  btn.textContent = "Play again";
  num = 1;
});

function addFigure(name, place, elementRemove, count) {
  if (count == 1) {
    place.removeChild(document.getElementById(`${elementRemove}`));
  }
  const conteinerDiv = document.createElement("div");
  conteinerDiv.setAttribute("class", `${name} circle`);
  const div = document.createElement("div");
  div.setAttribute("class", "item");
  conteinerDiv.setAttribute("id", `${elementRemove}`);
  const img = document.createElement("img");
  img.setAttribute(
    "src",
    `images/icon-${name}.svg`
  );
  div.appendChild(img);
  conteinerDiv.appendChild(div);
  place.appendChild(conteinerDiv);
}

document.getElementById("return").addEventListener("click", () => {
  location.reload();
});
