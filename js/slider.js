const multiItemSlider = (selector) => {
    const _mainElement = document.querySelector(selector); // основный элемент блока
    const _sliderWrapper = _mainElement.querySelector('.slider__list'); // обертка для .slider-item
    const _sliderItems = _mainElement.querySelectorAll('.slider__element'); // элементы (.slider-item)
    const _sliderControls = _mainElement.querySelectorAll('.slider__control'); // элементы управления
    const _sliderControlLeft = _mainElement.querySelector('.slider__button-prev'); // кнопка "LEFT"
    const _sliderControlRight = _mainElement.querySelector('.slider__button-next'); // кнопка "RIGHT"
    const _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width); // ширина обёртки
    const _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width); // ширина одного элемента    
    let _positionLeftItem = 0; // позиция левого активного элемента
    let _transform = 0; // значение транфсофрмации .slider_wrapper
    const _step = _itemWidth / _wrapperWidth * 100; // величина шага (для трансформации)
    const _items = []; // массив элементов

      // наполнение массива _items
    _sliderItems.forEach((item, index) => _items.push({ item: item, position: index, transform: 0 }));

      const position = {
        getMin: 0,
        getMax: _items.length - 1,
      }

      const _transformItem = (direction) => {
        if (direction === 'right') {
          if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) >= position.getMax) {
            return;
          }
          if (!_sliderControlLeft.classList.contains('slider__button_show')) {
            _sliderControlLeft.classList.add('slider__button_show');
          }
          if (_sliderControlRight.classList.contains('slider__button_show') && (_positionLeftItem + _wrapperWidth / _itemWidth) >= position.getMax) {
            _sliderControlRight.classList.remove('slider__button_show');
          }
          _positionLeftItem++;
          _transform -= _step;
        }

        if (direction === 'left') {
          if (_positionLeftItem <= position.getMin) {
            return;
          }
          if (!_sliderControlRight.classList.contains('slider__button_show')) {
            _sliderControlRight.classList.add('slider__button_show');
          }
          if (_sliderControlLeft.classList.contains('slider__button_show') && _positionLeftItem - 1 <= position.getMin) {
            _sliderControlLeft.classList.remove('slider__button_show');
          }
          _positionLeftItem--;
          _transform += _step;
        }
        _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
      }

      // обработчик события click для кнопок "назад" и "вперед"
      const _controlClick = (e) => {
        if (e.currentTarget.classList.contains('slider__control')) {
          e.preventDefault();
          const direction = e.currentTarget.classList.contains('slider__button-next') ? 'right' : 'left';
          _transformItem(direction);
        }
      };

      const _setUpListeners = () => {
        // добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для событя click
        _sliderControls.forEach((item) => item.addEventListener('click', _controlClick));
      }

      // инициализация
      _setUpListeners();
  };

  export {multiItemSlider};