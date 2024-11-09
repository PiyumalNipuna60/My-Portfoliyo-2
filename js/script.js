const stack = document.querySelector(".stack");
const cards = Array.from(stack.children)
  .reverse()
  .filter((child) => child.classList.contains("card1"));

cards.forEach((card1) => stack.appendChild(card1));

function moveCard() {
  const lastCard = stack.lastElementChild;
  if (lastCard.classList.contains("card1")) {
    lastCard.classList.add("swap");

    setTimeout(() => {
      lastCard.classList.remove("swap");
      stack.insertBefore(lastCard, stack.firstElementChild);
    }, 1200);
  }
}

let autoplayInterval = setInterval(moveCard, 4000);

stack.addEventListener("click", function (e) {
  const card = e.target.closest(".card1");
  if (card && card === stack.lastElementChild) {
    card.classList.add("swap");

    setTimeout(() => {
      card.classList.remove("swap");
      stack.insertBefore(card, stack.firstElementChild);
    }, 1200);
  }
});
