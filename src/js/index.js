import { axios } from './fetchPhotos';
import { PixabyAPI } from './fetchPhotos';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import handlebars from '../handlebars/handlebars.hbs';
import { renderPhotos } from './renderPhotos';

const userForm = document.querySelector('form#search-form');
const mainSection = document.querySelector('main');
const loadButton = document.querySelector('.load-button');
const textField = userForm.elements.searchQuery;

const pixabyApi = new PixabyAPI();

let page = 1;

userForm.addEventListener('submit', event => {
  event.preventDefault();

  mainSection.innerHTML = "";
  renderPhotos();
});

loadButton.addEventListener('click', event => {
  page = page + 1;

  renderPhotos(page);
  console.log(pixabyApi.page);
});
