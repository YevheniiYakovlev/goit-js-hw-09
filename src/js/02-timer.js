//Выполняй это задание в файлах 02-timer.html и 02-timer.js. 
//Напиши скрипт таймера, который ведёт обратный отсчет до определенной даты.
//Такой таймер может использоваться в блогах и интернет - магазинах, 
//страницах регистрации событий, во время технического обслуживания и т.д.

//Элементы интефрейса
//В HTML есть готовая разметка таймера, поля выбора конечной даты и кнопки, 
//при клике по которой таймер должен запускаться.Добавь минимальное оформление 
//элементов интерфейса.

//Библиотека flatpickr
//Используй библиотеку flatpickr для того чтобы позволить пользователю 
//кроссбраузерно выбрать конечную дату и время в одном элементе интерфейса.
//Для того чтобы подключить CSS код библиотеки в проект, необходимо добавить 
//еще один импорт, кроме того который описан в документации.

//Библиотека ожидает что её инициализируют на элементе input[type="text"], 
//поэтому мы добавили в HTML документ поле input#datetime - picker.

//Вторым аргументом функции flatpickr(selector, options) можно передать 
//необязательный объект параметров.Мы подготовили для тебя объект который 
//нужен для выполнения задания.Разберись за что отвечает каждое свойство в 
//документации «Options» и используй его в своем коде.

//Выбор даты
//Метод onClose() из обьекта параметров вызывается каждый раз при закрытии 
//элемента интерфейса который создает flatpickr.Именно в нём стоит обрабатывать 
//дату выбранную пользователем.Параметр selectedDates это массив выбранных дат, 
//поэтому мы берем первый элемент.

//Если пользователь выбрал дату в прошлом, покажи window.alert() с текстом 
//"Please choose a date in the future".
//Если пользователь выбрал валидную дату (в будущем), кнопка «Start» становится 
//активной.

//Кнопка «Start» должа быть не активна до тех пор, пока пользователь не выбрал 
//дату в будущем.
//При нажатии на кнопку «Start» начинается отсчет времени до выбранной даты с 
//момента нажатия.
//Отсчет времени
//При нажатии на кнопку «Start» скрипт должен вычислять раз в секунду сколько 
//времени осталось до указанной даты и обновлять интерфейс таймера, показывая 
//четыре цифры: дни, часы, минуты и секунды в формате xx: xx: xx: xx.

//Количество дней может состоять из более чем двух цифр.
//Таймер должен останавливаться когда дошел до конечной даты, 
//то есть 00: 00: 00: 00.

//НЕ БУДЕМ УСЛОЖНЯТЬ
//Если таймер запущен, для того чтобы выбрать новую дату и перезапустить 
//его - необходимо перезагрузить страницу.

//Для подсчета значений используй готовую функцию convertMs, 
//где ms - разница между конечной и текущей датой в миллисекундах.



import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';

const refs = {
    input: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

console.log(refs);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose,
};
console.log(options);

const fp = flatpickr(refs.input, options);

refs.startBtn.setAttribute("disabled", "disabled");

let chosenDate = Date.now();

function onClose(selectedDates) {    
    if (selectedDates[0] < options.defaultDate) {
        refs.startBtn.setAttribute("disabled", "disabled");
        return Notiflix.Notify.failure('Please choose a date in the future');
    } else {
        refs.startBtn.removeAttribute("disabled", "disabled");
        chosenDate = selectedDates[0];
    }
}

let timerId = null;


const onStartBtn = () => {
    refs.startBtn.setAttribute("disabled", "disabled");
    refs.input.setAttribute("disabled", "disabled");
    timerId = setInterval(() => {
        const resultTime = convertMs(chosenDate - Date.now());
        
        const deltaTime = chosenDate - Date.now();
        if (deltaTime <= 0 ) {
            clearInterval(timerId);
            return;
    }
        markupChange(resultTime); 
    }, 1000);
    
}

refs.startBtn.addEventListener('click', onStartBtn);

    function markupChange({ days, hours, minutes, seconds }) {
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}


function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

