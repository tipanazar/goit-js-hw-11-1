import { PixabyAPI } from './fetchPhotos';
import handlebars from '../handlebars/handlebars.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const userForm = document.querySelector('form#search-form');
const mainSection = document.querySelector('main');
const textField = userForm.elements.searchQuery;

const pixabyApi = new PixabyAPI();

const addLightbox = new simpleLightbox('a.gallery__item', {
  captionDelay: 250,
  showCounter: false,
});

export function renderPhotos(page) {
  const keyword = textField.value;

  pixabyApi.keyword = keyword;
  pixabyApi.page = page;

  pixabyApi
    .fetchPhotos()
    .then(({ data } = {}) => {
      if (data.hits.length === 0) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return;
      } else if (data.hits.length > 0) {
        for (let photo of data.hits) {
          const photoLikes = photo.likes;
          const photoViews = photo.views;
          const photoComments = photo.comments;
          const photoDownloads = photo.downloads;
          const photoSmall = photo.webformatURL;
          const photoLarge = photo.largeImageURL;
          const photoAlt = photo.tags;

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
      addLightbox.refresh();
    })
    .catch(err => {
      console.log(err);
    });
  return;
}

