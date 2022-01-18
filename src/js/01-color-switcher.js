'use ctrict';

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// ==================================Способ 1================================================

const buttonEls = document.querySelectorAll('button');

let bgChangerInterval = null;

buttonEls.forEach(el => {
  el.addEventListener('click', () => {
    if (el.hasAttribute('data-start')) {
      bgChangerInterval = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
      }, 1000);
      el.setAttribute('disabled', 'disabled');
      [...buttonEls][1].removeAttribute('disabled');
    } else {
      clearInterval(bgChangerInterval);
      el.setAttribute('disabled', 'disabled');
      [...buttonEls][0].removeAttribute('disabled');
    }
  });
});

// ==================================Способ 2================================================

// const buttonStartEl = document.querySelector('button[data-start]');
// const buttonStoptEl = document.querySelector('button[data-stop]');

// let bgChangerInterval = null;

// buttonStartEl.addEventListener('click', () => {
//   bgChangerInterval = setInterval(() => {
//     document.body.style.backgroundColor = getRandomHexColor();
//   }, 1000);
//   buttonStartEl.setAttribute('disabled', 'disabled');
//   buttonStoptEl.removeAttribute('disabled');
// });

// buttonStoptEl.addEventListener('click', () => {
//   clearInterval(bgChangerInterval);
//   buttonStoptEl.setAttribute('disabled', 'disabled');
//   buttonStartEl.removeAttribute('disabled');
// });
