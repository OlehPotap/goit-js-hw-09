'use strict';

import Notiflix from 'notiflix';

const firstDelayInputEl = document.querySelector('input[name="delay"]');
const delayStepInputEl = document.querySelector('input[name="step"]');
const amountInputEl = document.querySelector('input[name="amount"]');
const buttonSubmitEl = document.querySelector('button');
const submitFormEl = document.querySelector('.form');

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, Number(firstDelayInputEl.value) + delay);
  });
  promise
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}

submitFormEl.addEventListener('submit', event => {
  event.preventDefault();
  CreateSomeAmountOfPromises();
});

function CreateSomeAmountOfPromises() {
  for (let i = 1; i - 1 < Number(amountInputEl.value); i += 1) {
    createPromise(i, Number(delayStepInputEl.value * i));
  }
}
