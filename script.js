"use strict";

/* =========================
   VERACELABS CAROUSEL
   ========================= */

const carousel = document.querySelector(".agent-carousel");
const cards = document.querySelectorAll(".agent-card");

const previousButton = document.querySelector("#previous-agent");
const nextButton = document.querySelector("#next-agent");


let currentIndex = 0;


/* Move to a specific product */

function showAgent(index) {
  if (!carousel || cards.length === 0) {
    return;
  }

  currentIndex = Math.max(
    0,
    Math.min(index, cards.length - 1)
  );

  cards[currentIndex].scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "center"
  });
}


/* Next product */

function nextAgent() {
  if (currentIndex < cards.length - 1) {
    showAgent(currentIndex + 1);
  } else {
    showAgent(0);
  }
}


/* Previous product */

function previousAgent() {
  if (currentIndex > 0) {
    showAgent(currentIndex - 1);
  } else {
    showAgent(cards.length - 1);
  }
}


/* Button controls */

if (nextButton) {
  nextButton.addEventListener("click", nextAgent);
}

if (previousButton) {
  previousButton.addEventListener(
    "click",
    previousAgent
  );
}


/* =========================
   DETECT SWIPED / SCROLLED CARD
   ========================= */

if (carousel && cards.length > 0) {

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          const index =
            Array.from(cards).indexOf(entry.target);

          if (index !== -1) {
            currentIndex = index;
          }

        }

      });

    },
    {
      root: carousel,
      threshold: 0.7
    }
  );


  cards.forEach((card) => {
    observer.observe(card);
  });
}


/* =========================
   FOOTER REVEAL
   ========================= */

const footer = document.querySelector(".site-footer");

if (footer) {

  const footerObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {
            footer.classList.add("footer-visible");
          }

        });

      },
      {
        threshold: 0.15
      }
    );

  footerObserver.observe(footer);
}


/* =========================
   MENU BUTTON
   ========================= */

const menuButton =
  document.querySelector(".menu-button");

if (menuButton) {

  menuButton.addEventListener("click", () => {

    const isOpen =
      menuButton.getAttribute(
        "aria-expanded"
      ) === "true";

    menuButton.setAttribute(
      "aria-expanded",
      String(!isOpen)
    );

  });
}