import axios from 'axios';

export async function buildUrl(query, page) {
  const API_KEY = '42458886-d6d62fa6987d6f72b0a5e97bb';
  const URL = 'https://pixabay.com/api/';

  const fetchGallery = await axios.get(URL, {
    params: {
      per_page: 15,
      page: page,
      key: API_KEY,
      q: query,
      IMAGE_TYPE: 'photo',
      SAFESEARCH: 'true',
      ORIENTATION: 'horizontal',
    },
  });

  return fetchGallery.data;
}
