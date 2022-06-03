//В HTML есть разметка формы, в поля которой пользователь будет вводить 
//первую задержку в миллисекундах, шаг увеличения задержки для каждого промиса 
//после первого и количество промисов которое необходимо создать.

//Напиши скрипт, который при сабмите формы вызывает функцию 
//createPromise(position, delay) столько раз, сколько ввели в поле amount.
//При каждом вызове передай ей номер создаваемого промиса(position) и 
//задержку учитывая введенную пользователем первую задержку(delay) и шаг(step).

//Дополни код функции createPromise так, чтобы она возвращала один промис, 
//который выполянется или отклоняется через delay времени.
//Значением промиса должен быть объект, в котором будут свойства position 
//и delay со значениями одноименных параметров.Используй начальный код 
//функции для выбора того, что нужно сделать с промисом - выполнить или отклонить.

//Библиотека уведомлений
//ВНИМАНИЕ
//Этот функционал не обязателен при сдаче задания, но будет хорошей 
//дополнительной практикой.

//Для отображения уведомлений пользователю вместо console.log() 
//используй библиотеку notiflix.



import { Notify } from 'notiflix/build/notiflix-notify-aio';

const delay = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');
const form = document.querySelector('.form');

form.addEventListener("submit", onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const data = {
    amount: parseInt(amount.value),
    step: parseInt(step.value),
    delay: parseInt(delay.value),
  };
  callPromiseCreation(data);
}


function callPromiseCreation({ amount, step, delay }) {
  let calculatedDelay = delay;
  for (let index = 1; index <= amount; index += 1) {
    createPromise(index, calculatedDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    calculatedDelay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position: position, delay: delay });
      } else {
        reject({ position: position, delay: delay });
      }
    }, delay);
  });
}
