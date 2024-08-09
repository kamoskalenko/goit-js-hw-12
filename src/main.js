import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import * as API from './js/pixabay-api';
import renderImageCard from './js/render-functions';

const gallery = document.querySelector('.gallery');
const searchForm = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more-btn');
const loader = document.querySelector('.loader');
const lightbox = new SimpleLightbox('.gallery a');

const limit = 15;
let page = 1;
let totalImgs = 0;
let totalPages = 0;
let query = '';

function onLoader() {
  loader.classList.add('is-active');
}

function offLoader() {
  loader.classList.remove('is-active');
}

function hideLoadMoreBtn() {
  loadMoreBtn.classList.add('is-hidden');
}

function displayLoadMoreBtn() {
  loadMoreBtn.classList.remove('is-hidden');
}

hideLoadMoreBtn();

searchForm.addEventListener('submit', onSearch);

async function onSearch(event) {
  event.preventDefault();
  gallery.innerHTML = '';
  onLoader();

  const form = event.currentTarget;
  query = form.elements.query.value.trim().toLowerCase();

  try {
    page = 1;

    const data = await API.getImages(query, page, limit);
    totalImgs = data.totalHits;
    totalPages = Math.ceil(totalImgs / limit);

    if (query === '' || data.hits.length === 0) {
      onFetchError();
      hideLoadMoreBtn();
      return;
    }

    renderImageCard(data);
    lightbox.refresh();

    if (page < totalPages) {
      displayLoadMoreBtn();
    } else {
      hideLoadMoreBtn();
      showMessage();
    }
  } catch (error) {
    onFetchError();
  } finally {
    form.reset();
    offLoader();
  }
}

loadMoreBtn.addEventListener('click', onLoadMore);

async function onLoadMore() {
  page += 1;
  onLoader();

  try {
    const data = await API.getImages(query, page, limit);

    renderImageCard(data);
    lightbox.refresh();

    scrollGallery();

    if (page >= totalPages) {
      hideLoadMoreBtn();
      showMessage();
    }
  } catch (error) {
    onFetchError();
  } finally {
    offLoader();
  }
}

function onFetchError(error) {
  gallery.innerHTML = '';
  iziToast.error({
    maxWidth: 500,
    timeout: 3000,
    position: 'topRight',
    icon: 'material-icons',
    title: 'Error',
    message:
      'Sorry, there are no images matching your search query. Please try again!',
  });
}

function showMessage() {
  iziToast.info({
    maxWidth: 500,
    timeout: 3000,
    position: 'bottomCenter',
    icon: 'material-icons',
    title: 'Info',
    message: `We're sorry, but you've reached the end of search results`,
  });
}

function scrollGallery() {
  const { height: cardHeight } =
    gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
