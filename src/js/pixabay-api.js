export default function fetchImage(query) {
  const searchParams = new URLSearchParams({
    key: '45193945-2152fc57bbe1d57bc87d8ed4b',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  const url = `https://pixabay.com/api/?${searchParams}`;

  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
