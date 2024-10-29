import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const form = document.forms[0];
const delayInput = form.elements.delay;
const radio = form.elements.state;
const notificaionBtn = form.querySelector("button[type='submit']");

function createPromise(delay, status) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (status) {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  })
    .then(res => {
      iziToast.success({
        message: res,
        position: 'topRight',
      });
    })
    .catch(err => {
      iziToast.error({
        message: err,
        position: 'topRight',
      });
    });
}

notificaionBtn.addEventListener('click', e => {
  e.preventDefault();
  if (!delayInput.value || !radio.value) {
    return;
  }
  if (radio.value === 'fulfilled') {
    createPromise(delayInput.value, true);
  } else {
    createPromise(delayInput.value, false);
  }
  form.reset();
});
