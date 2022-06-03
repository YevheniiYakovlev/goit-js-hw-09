//Выполняй это задание в файлах 01-color-switcher.html и 01-color-switcher.js.
//В HTML есть кнопки «Start» и «Stop».


//Напиши скрипт, который после нажатия кнопки «Start», раз в секунду меняет цвет фона <body> на случайное значение используя инлайн стиль. При нажатии на кнопку «Stop», изменение цвета фона должно останавливаться.

//ВНИМАНИЕ
//Учти, на кнопку «Start» можно нажать бесконечное количество раз. 
//Сделай так, чтобы пока изменение темы запушено, кнопка «Start» была 
//не активна(disabled).

//Для генерации случайного цвета используй функцию getRandomHexColor.

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const refs = {
    buttonStart: document.querySelector("[data-start]"),
    buttonStop: document.querySelector("[data-stop]"),
    body: document.querySelector('body'),
};
let timerId = null;

refs.buttonStart.addEventListener("click", onButtonStart);
refs.buttonStop.addEventListener("click", onButtonStop);

function onButtonStart(event) {
    refs.buttonStart.setAttribute('disabled', 'disabled', console.log('click'));
    refs.buttonStop.removeAttribute('disabled', 'disabled');
timerId = setInterval(StartChangeBackgroundColor, 1000);

}


function StartChangeBackgroundColor() {
    refs.body.style.backgroundColor = getRandomHexColor();
};
function onButtonStop(event) {
    refs.buttonStop.setAttribute('disabled', 'disabled', console.log('stop'));
    refs.buttonStart.removeAttribute('disabled', 'disabled');
    StopChangeBackgroundColor();
}
function StopChangeBackgroundColor() {
    clearInterval(timerId);
    console.log('not color');
};





