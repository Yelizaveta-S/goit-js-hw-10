import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const input = document.querySelector('#datetime-picker');
const startTimerBtn = document.querySelector('button[data-start]');
const daysOut = document.querySelector('[data-days]');
const hoursOut = document.querySelector('[data-hours]');
const minutesOut = document.querySelector('[data-minutes]');
const secondsOut = document.querySelector('[data-seconds]');

let userSelectedDate;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = calendar.selectedDates[0];
    if (userSelectedDate < options.defaultDate) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startTimerBtn.disabled = true;
    } else {
      startTimerBtn.disabled = false;
    }
    console.log(selectedDates[0]);
  },
};
const calendar = flatpickr(input, options);

function outputTimer(arr) {
  daysOut.textContent = arr[0];
  hoursOut.textContent = arr[1];
  minutesOut.textContent = arr[2];
  secondsOut.textContent = arr[3];
}
function addLeadingZero(valuesObj) {
  const valuesToValidate = Object.values(valuesObj);
  const validatedValuesArr = valuesToValidate.map(value =>
    value.toString().padStart(2, '0')
  );
  return validatedValuesArr;
}
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

function showTimer(someNumber) {
  const formatedTimeObj = convertMs(someNumber);
  const validTimeArr = addLeadingZero(formatedTimeObj);
  outputTimer(validTimeArr);
}

function setTimer(timeToConvert) {
  showTimer(timeToConvert);
  const newInterval = setInterval(() => {
    timeToConvert -= 1000;
    if (timeToConvert <= 0) {
      clearInterval(newInterval);
      input.disabled = false;
      startTimerBtn.disabled = false;
      return;
    }
    showTimer(timeToConvert);
  }, 1000);
}

startTimerBtn.addEventListener('click', () => {
  input.disabled = true;
  startTimerBtn.disabled = true;
  const timeToOut = userSelectedDate.getTime() - new Date().getTime();
  if (timeToOut <= 0) {
    startTimerBtn.disabled = true;
    return;
  }
  setTimer(timeToOut);
});
