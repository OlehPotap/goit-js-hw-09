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
    }, delay);
  });
  promise
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position + 1} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position + 1} in ${delay}ms`);
    });
}

submitFormEl.addEventListener('submit', event => {
  event.preventDefault();
  CreateSomeAmountOfPromises();
});

function CreateSomeAmountOfPromises() {
  let firstDelay = Number(firstDelayInputEl.value);
  for (let i = 0; i < Number(amountInputEl.value); i += 1) {
    createPromise(i, firstDelay);
    firstDelay += Number(delayStepInputEl.value);
  }
}
