import { PixabyAPI } from './fetchPhotos';
import { renderPhotos } from './renderPhotos';
import throttle from 'lodash.debounce';

const userForm = document.querySelector('form#search-form');
const mainSection = document.querySelector('main');

const pixabyApi = new PixabyAPI();

let page = 1;

userForm.addEventListener('submit', event => {
  event.preventDefault();

  mainSection.innerHTML = '';
  renderPhotos();
});

window.addEventListener(
  'scroll',
  throttle(() => {
    let contentHeight = mainSection.offsetHeight; // 1) высота блока контента вместе с границами
    let yOffset = window.pageYOffset; // 2) текущее положение скролбара
    let window_height = window.innerHeight; // 3) высота внутренней области окна документа
    let y = yOffset + window_height;

    // если пользователь достиг конца
    if (y >= contentHeight) {
      //загружаем новое содержимое в элемент
      page = page + 1;
      renderPhotos(page);
    }
  }, 200),
);
