'use strict';
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

// =============================Функция форматирования времени

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

// =============================Функция конвертации милисекунд в адекватную дату

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// ====================================================Обращаемся к елементам на странице

const startButtonEl = document.querySelector('button[data-start]');
const dateInputEl = document.querySelector('#datetime-picker');

// с помощью флетпикра позволяем пользователю выбрать любую дату в будущем, в противном случае кнопка начать отчет не активна

let now = new Date();
startButtonEl.setAttribute('disabled', 'disabled');

flatpickr(dateInputEl, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (Number(now) > Number(selectedDates[0])) {
      clearInterval(setIntervalForTimer);
      document.querySelector('span[data-days]').textContent = addLeadingZero('0');
      document.querySelector('span[data-hours]').textContent = addLeadingZero('0');
      document.querySelector('span[data-minutes]').textContent = addLeadingZero('0');
      document.querySelector('span[data-seconds]').textContent = addLeadingZero('0');
      startButtonEl.setAttribute('disabled', 'disabled');
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startButtonEl.removeAttribute('disabled');
    }
  },
});

// По клику на кнопкустарт если она активна записывает в переменную дедлайн значение даты выбранное пользователем

let deadline = null;
let setIntervalForTimer = null;

function checkTimer() {
  if (Number(document.querySelector('span[data-seconds]').textContent) <= 0) {
    clearInterval(setIntervalForTimer);
  }
}

startButtonEl.addEventListener('click', event => {
  setIntervalForTimer = setInterval(() => {
    deadline = new Date(dateInputEl.value);
    const convertedDate = convertMs(Number(deadline) - Number(new Date()));
    document.querySelector('span[data-days]').textContent = addLeadingZero(convertedDate.days);
    document.querySelector('span[data-hours]').textContent = addLeadingZero(convertedDate.hours);
    document.querySelector('span[data-minutes]').textContent = addLeadingZero(
      convertedDate.minutes,
    );
    document.querySelector('span[data-seconds]').textContent = addLeadingZero(
      convertedDate.seconds,
    );
    checkTimer();
  }, 1000);
});
