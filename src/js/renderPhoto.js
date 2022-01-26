function renderPhoto() {
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
          console.log(photo);
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
}
