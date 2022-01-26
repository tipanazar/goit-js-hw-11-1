import { axios } from './fetchPhotos';
import { PixabyAPI } from './fetchPhotos';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import handlebars from '../handlebars/handlebars.hbs';

const userForm = document.querySelector('form#search-form');
const mainSection = document.querySelector('main');
const textField = userForm.elements.searchQuery;

const pixabyApi = new PixabyAPI();

userForm.addEventListener('submit', event => {
  event.preventDefault();

  const keyword = textField.value;

  pixabyApi.keyword = keyword;
  pixabyApi.page = 1;

  
  pixabyApi
  .fetchPhotos()
  .then(({ data } = {}) => {
        mainSection.innerHTML = '';

      if (data.hits.length === 0) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return;
      } else if (data.hits.length > 0) {
        console.log(data.hits);
        for (let photo of data.hits) {
            console.log(photo)
          const photoLikes = photo.likes;
          const photoViews = photo.views;
          const photoComments = photo.comments;
          const photoDownloads = photo.downloads;
          const photoSmall = photo.webformatURL;
          const photoLarge = photo.largeImageURL;
          const photoAlt = photo.tags;

          //   console.log(photoLikes);

          mainSection.insertAdjacentHTML(
            'beforeend',
            handlebars({
              photoLikes,
              photoViews,
              photoComments,
              photoDownloads,
              photoSmall,
              photoLarge,
              photoAlt,
            }),
          );
        }
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
