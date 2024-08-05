import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import fetchImage from './js/pixabay-api';
import renderImageCard from './js/render-functions';

iziToast.settings({
  maxWidth: 500,
  timeout: 3000,
  resetOnHover: true,
  icon: 'material-icons',
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
  position: 'topRight',
  onOpening: function () {
    console.log('callback abriu!');
  },
  onClosing: function () {
    console.log('callback fechou!');
  },
});

const gallery = document.querySelector('.gallery');
const searchForm = document.querySelector('.search-form');
const loader = document.querySelector('.loader');
let lightbox = null;

function onLoader() {
  loader.classList.add('is-active');
}

function offLoader() {
  loader.classList.remove('is-active');
}

searchForm.addEventListener('submit', onSearch);

function onSearch(event) {
  onLoader();
  event.preventDefault();

  const form = event.currentTarget;
  const searchQuery = form.elements.query.value.trim().toLowerCase();

  fetchImage(searchQuery)
    .then(images => {
      if (searchQuery === '' || images.hits.length === 0) {
        throw new Error();
      }

      renderImageCard(images);

      if (lightbox) {
        lightbox.refresh();
      } else {
        lightbox = new SimpleLightbox('.gallery a');
      }
    })

    .catch(onFetchError)
    .finally(() => {
      form.reset();
      offLoader();
    });
}

function onFetchError(error) {
  gallery.innerHTML = '';
  iziToast.error({
    message:
      'Sorry, there are no images matching your search query. Please try again!',
  });
}
