import axios from 'axios';

export class PixabyAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '25409970-76d3bd325deb034b2a97ea891';

    constructor(keyword = null) {
      this.page = 1;
      this.keyword = keyword;
    }

  fetchPhotos() {
    return axios.get(`${this.#BASE_URL}`, {
      params: {
        key: this.#API_KEY,
        q: this.keyword,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.page,
        per_page: 40,
      },
    });
  }
}
