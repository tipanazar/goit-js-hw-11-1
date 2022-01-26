import { axios } from './fetchPhotos';
import { PixabyAPI } from './fetchPhotos';
import handlebars from '../handlebars/handlebars.hbs';

const userForm = document.querySelector('form#search-form');
const body = document.querySelector('body');
const textField = userForm.elements.searchQuery;

const pixabyApi = new PixabyAPI();

userForm.addEventListener('submit', event => {
  event.preventDefault();

  // body.insertAdjacentHTML("beforeend", handlebars());

  const keyword = textField.value;

  pixabyApi.keyword = keyword;
  pixabyApi.page = 1;

  // galleryListEl.innerHTML = '';

  pixabyApi
    .fetchPhotos()
    .then(({ data } = {}) => {
      if (data.hits.length === 0) {
        console.log('Не найдено');
        return;
      }
      console.log(data.hits);
      for (let photo of data.hits) {
        // console.log(photo);
        const photoLikes = photo.likes;
        const photoVievs = photo.vievs;
        const photoComments = photo.comments;
        const photoDownloads = photo.downloads;
        const photoSmall = photo.previevURL;
        const photoLagre = photo.largeImageURL;
      }

      // if (data.total_pages === 1) {
      // //   galleryListEl.insertAdjacentHTML('beforeend', galleryCardsTemplate(data.results));
      // //   loadMoreBtnEl.classList.add('is-hidden');
      //   return;
      // }

      // galleryListEl.insertAdjacentHTML('beforeend', galleryCardsTemplate(data.results));
      // loadMoreBtnEl.classList.remove('is-hidden');
    })
    .catch(err => {
      console.log(err);
    });
});
