import axios from 'axios';

const URL = 'https://pixabay.com/api/';

async function getImages(query, page = 1, limit = 15) {
  const params = new URLSearchParams({
    key: '45193945-2152fc57bbe1d57bc87d8ed4b',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: limit,
    page,
  });

  const response = await axios.get(`${URL}?${params}`);
  // console.log(response.data);
  return response.data;
}

export { getImages };
