calendar = {};

// Названия месяцев
calendar.monthName = [
  'Январь', 'Февраль', 'Март', 'Апрель',
  'Май', 'Июнь', 'Июль', 'Август',
  'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

// Названия дней недели
calendar.dayName = [
  'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'
];

// Выбранная дата
calendar.selectedDate = {
  'Day': null,
  'Month': null,
  'Year': null
};

// ID элемента для размещения календарика
calendar.element_id = null;

// Выбор даты
calendar.selectDate = function (day, month, year) {
  calendar.selectedDate = {
    'Day': day,
    'Month': month,
    'Year': year
  };
  calendar.drawCalendar(month, year);
}

// Отрисовка календарика на выбранный месяц и год
calendar.drawCalendar = function (month, year) {
  var tmp = '';
  tmp += '<table class="calendar" cellspacing="0" cellpadding="0">';

  // Месяц и навигация
  tmp += '<tr>';
  tmp += '<td class="navigation" ' +
    'onclick="calendar.drawCalendar(' + (month > 1 ? (month - 1) : 12) +
    ',' + (month > 1 ? year : (year - 1)) + ');">◄<\/td>';
  tmp += '<td colspan="5" class="navigation" ' +
    'onclick="calendar.drawCalendar(' +
    calendar.selectedDate.Month + ',' +
    calendar.selectedDate.Year + ');">' +
    calendar.monthName[(month - 1)] + ' - ' + year + '<\/td>';
  tmp += '<td class="navigation" ' +
    'onclick="calendar.drawCalendar(' + (month < 12 ? (month + 1) : 1) +
    ',' + (month < 12 ? year : (year + 1)) + ');">►<\/td>';
  tmp += '<\/tr>';

  // Шапка таблицы с днями недели
  tmp += '<tr>';
  tmp += '<th>' + calendar.dayName[0] + '<\/th>';
  tmp += '<th>' + calendar.dayName[1] + '<\/th>';
  tmp += '<th>' + calendar.dayName[2] + '<\/th>';
  tmp += '<th>' + calendar.dayName[3] + '<\/th>';
  tmp += '<th>' + calendar.dayName[4] + '<\/th>';
  tmp += '<th class="holiday">' + calendar.dayName[5] + '<\/th>';
  tmp += '<th class="holiday">' + calendar.dayName[6] + '<\/th>';
  tmp += '<\/tr>';

  // Количество дней в месяце
  var total_days = 32 - new Date(year, (month - 1), 32).getDate();
  // Начальный день месяца
  var start_day = new Date(year, (month - 1), 1).getDay();
  if (start_day == 0) {
    start_day = 7;
  }
  start_day--;
  // Количество ячеек в таблице
  var final_index = Math.ceil((total_days + start_day) / 7) * 7;

  var day = 1;
  var index = 0;
  do {
    // Начало строки таблицы
    if (index % 7 == 0) {
      tmp += '<tr>';
    }
    // Пустые ячейки до начала месяца или после окончания
    if ((index < start_day) || (index >= (total_days + start_day))) {
      tmp += '<td class="grayed"> <\/td>';
    } else {
      var class_name = '';
      // Выбранный день
      if (calendar.selectedDate.Day == day &&
        calendar.selectedDate.Month == month &&
        calendar.selectedDate.Year == year) {
        class_name = 'selected';
      }
      // Праздничный день
      else if (index % 7 == 6 || index % 7 == 5) {
        class_name = 'holiday';
      }
      // Ячейка с датой
      tmp += '<td class="' + class_name + '" ' +
        'onclick="calendar.selectDate(' +
        day + ',' + month + ',' + year + ');">' + day + '<\/td>';
      day++;
    }
    // Конец строки таблицы
    if (index % 7 == 6) {
      tmp += '<\/tr>';
    }
    index++;
  }
  while (index < final_index);

  tmp += '<\/table>';

  // Вставить таблицу календарика на страницу
  var el = document.getElementById(calendar.element_id);
  if (el) {
    el.innerHTML = tmp;
  }
}

// ID элемента для размещения календарика
calendar.element_id = 'calendar_table';

// По умолчанию используется текущая дата
calendar.selectedDate = {
  'Day': new Date().getDate(),
  'Month': parseInt(new Date().getMonth()) + 1,
  'Year': new Date().getFullYear()
};

// Нарисовать календарик
calendar.drawCalendar(
  calendar.selectedDate.Month,
  calendar.selectedDate.Year
);
var slideShow = (function () {
  return function (selector, config) {
    var
      _slider = document.querySelector(selector), // основный элемент блока
      _sliderContainer = _slider.querySelector('.slider__items'), // контейнер для .slider-item
      _sliderItems = _slider.querySelectorAll('.slider__item'), // коллекция .slider-item
      _sliderControls = _slider.querySelectorAll('.slider__control'), // элементы управления
      _currentPosition = 0, // позиция левого активного элемента
      _transformValue = 0, // значение транфсофрмации .slider_wrapper
      _transformStep = 100, // величина шага (для трансформации)
      _itemsArray = [], // массив элементов
      _timerId,
      _indicatorItems,
      _indicatorIndex = 0,
      _indicatorIndexMax = _sliderItems.length - 1,
      _config = {
        isAutoplay: false, // автоматическая смена слайдов
        directionAutoplay: 'next', // направление смены слайдов
        delayAutoplay: 5000, // интервал между автоматической сменой слайдов
        isPauseOnHover: true // устанавливать ли паузу при поднесении курсора к слайдеру
      };

    // настройка конфигурации слайдера в зависимости от полученных ключей
    for (var key in config) {
      if (key in _config) {
        _config[key] = config[key];
      }
    }

    // наполнение массива _itemsArray
    for (var i = 0; i < _sliderItems.length; i++) {
      _itemsArray.push({
        item: _sliderItems[i],
        position: i,
        transform: 0
      });
    }

    // переменная position содержит методы с помощью которой можно получить минимальный и максимальный индекс элемента, а также соответствующему этому индексу позицию
    var position = {
      getItemIndex: function (mode) {
        var index = 0;
        for (var i = 0; i < _itemsArray.length; i++) {
          if ((_itemsArray[i].position < _itemsArray[index].position && mode === 'min') || (_itemsArray[i].position > _itemsArray[index].position && mode === 'max')) {
            index = i;
          }
        }
        return index;
      },
      getItemPosition: function (mode) {
        return _itemsArray[position.getItemIndex(mode)].position;
      }
    };

    // функция, выполняющая смену слайда в указанном направлении
    var _move = function (direction) {
      var nextItem, currentIndicator = _indicatorIndex;;
      if (direction === 'next') {
        _currentPosition++;
        if (_currentPosition > position.getItemPosition('max')) {
          nextItem = position.getItemIndex('min');
          _itemsArray[nextItem].position = position.getItemPosition('max') + 1;
          _itemsArray[nextItem].transform += _itemsArray.length * 100;
          _itemsArray[nextItem].item.style.transform = 'translateX(' + _itemsArray[nextItem].transform + '%)';
        }
        _transformValue -= _transformStep;
        _indicatorIndex = _indicatorIndex + 1;
        if (_indicatorIndex > _indicatorIndexMax) {
          _indicatorIndex = 0;
        }
      } else {
        _currentPosition--;
        if (_currentPosition < position.getItemPosition('min')) {
          nextItem = position.getItemIndex('max');
          _itemsArray[nextItem].position = position.getItemPosition('min') - 1;
          _itemsArray[nextItem].transform -= _itemsArray.length * 100;
          _itemsArray[nextItem].item.style.transform = 'translateX(' + _itemsArray[nextItem].transform + '%)';
        }
        _transformValue += _transformStep;
        _indicatorIndex = _indicatorIndex - 1;
        if (_indicatorIndex < 0) {
          _indicatorIndex = _indicatorIndexMax;
        }
      }
      _sliderContainer.style.transform = 'translateX(' + _transformValue + '%)';
      _indicatorItems[currentIndicator].classList.remove('active');
      _indicatorItems[_indicatorIndex].classList.add('active');
    };

    // функция, осуществляющая переход к слайду по его порядковому номеру
    var _moveTo = function (index) {
      var i = 0,
        direction = (index > _indicatorIndex) ? 'next' : 'prev';
      while (index !== _indicatorIndex && i <= _indicatorIndexMax) {
        _move(direction);
        i++;
      }
    };

    // функция для запуска автоматической смены слайдов через промежутки времени
    var _startAutoplay = function () {
      if (!_config.isAutoplay) {
        return;
      }
      _stopAutoplay();
      _timerId = setInterval(function () {
        _move(_config.directionAutoplay);
      }, _config.delayAutoplay);
    };

    // функция, отключающая автоматическую смену слайдов
    var _stopAutoplay = function () {
      clearInterval(_timerId);
    };

    // функция, добавляющая индикаторы к слайдеру
    var _addIndicators = function () {
      var indicatorsContainer = document.createElement('ol');
      indicatorsContainer.classList.add('slider__indicators');
      for (var i = 0; i < _sliderItems.length; i++) {
        var sliderIndicatorsItem = document.createElement('li');
        if (i === 0) {
          sliderIndicatorsItem.classList.add('active');
        }
        sliderIndicatorsItem.setAttribute("data-slide-to", i);
        indicatorsContainer.appendChild(sliderIndicatorsItem);
      }
      _slider.appendChild(indicatorsContainer);
      _indicatorItems = _slider.querySelectorAll('.slider__indicators > li')
    };

    // функция, осуществляющая установку обработчиков для событий 
    var _setUpListeners = function () {
      _slider.addEventListener('click', function (e) {
        if (e.target.classList.contains('slider__control')) {
          e.preventDefault();
          _move(e.target.classList.contains('slider__control_next') ? 'next' : 'prev');
          _startAutoplay();
        } else if (e.target.getAttribute('data-slide-to')) {
          e.preventDefault();
          _moveTo(parseInt(e.target.getAttribute('data-slide-to')));
          _startAutoplay();
        }
      });
      document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === "hidden") {
          _stopAutoplay();
        } else {
          _startAutoplay();
        }
      }, false);
      if (_config.isPauseOnHover && _config.isAutoplay) {
        _slider.addEventListener('mouseenter', function () {
          _stopAutoplay();
        });
        _slider.addEventListener('mouseleave', function () {
          _startAutoplay();
        });
      }
    };

    // добавляем индикаторы к слайдеру
    _addIndicators();
    // установливаем обработчики для событий
    _setUpListeners();
    // запускаем автоматическую смену слайдов, если установлен соответствующий ключ
    _startAutoplay();

    return {
      // метод слайдера для перехода к следующему слайду
      next: function () {
        _move('next');
      },
      // метод слайдера для перехода к предыдущему слайду          
      left: function () {
        _move('prev');
      },
      // метод отключающий автоматическую смену слайдов
      stop: function () {
        _config.isAutoplay = false;
        _stopAutoplay();
      },
      // метод запускающий автоматическую смену слайдов
      cycle: function () {
        _config.isAutoplay = true;
        _startAutoplay();
      }
    }
  }
}());