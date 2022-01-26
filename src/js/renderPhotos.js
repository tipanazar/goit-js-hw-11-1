import { PixabyAPI } from './fetchPhotos';
import handlebars from '../handlebars/handlebars.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

const userForm = document.querySelector('form#search-form');
const mainSection = document.querySelector('main');
const textField = userForm.elements.searchQuery;

const pixabyApi = new PixabyAPI();

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
        // Notify.success(`Hooray! We found ${data.totalHits} images.`);
        // console.log(data)
        for (let photo of data.hits) {
          //   console.log(photo);
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
    })
    .catch(err => {
      console.log(err);
    });
  return;
}
