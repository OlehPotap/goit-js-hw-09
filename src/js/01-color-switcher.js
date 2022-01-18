'use ctrict';

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// ==================================Способ 1================================================

const buttonEls = document.querySelectorAll('button');

let bgChangerInterval = null;

buttonEls.forEach(el => {
  el.addEventListener('click', () => {
    el.setAttribute('disabled', 'disabled');
    if (el.hasAttribute('data-start')) {
      bgChangerInterval = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
      }, 1000);
      document.querySelector('button[data-stop]').removeAttribute('disabled');
    } else {
      clearInterval(bgChangerInterval);
      document.querySelector('button[data-start]').removeAttribute('disabled');
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
