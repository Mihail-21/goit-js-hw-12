'use strict';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { buildUrl } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.btn-more');
let currentPage = 1;
let searchQuery = null;
let isLoading = false;
hideLoader();
hideBtn();
async function fetchRequest(event) {
  event.preventDefault();
  searchQuery = document
    .querySelector('.form input[name="query"]')
    .value.trim();
  currentPage = 1;
  gallery.innerHTML = '';
  if (searchQuery === '') {
    // Show warning message if no search query is entered
    iziToast.warning({
      message: 'Please enter a search query.',
      messageColor: 'black',
      backgroundColor: '#FFAC26',
      position: 'topRight',
      pauseOnHover: false,
      progressBarColor: 'black',
      timeout: 3000,
    });
    return;
  }
  showLoader();
  isLoading = true;
  try {
    const data = await buildUrl(searchQuery, currentPage);
    const images = data.hits;
    if (images.length === 0) {
      // Show error message if no images are found
      iziToast.error({
        theme: 'dark',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageColor: '#FFFFFF',
        backgroundColor: '#EF4040',
        position: 'topRight',
        pauseOnHover: false,
        progressBarColor: '#B51B1B',
        timeout: 3000,
      });
    }
    gallery.innerHTML = renderGallery(images);
    if (images.length < 15) {
      hideBtn();
      iziToast.info({
        theme: 'dark',
        message: "We're sorry, but you've reached the end of search results.",
        messageColor: '#FFFFFF',
        backgroundColor: '#1F79FF',
        position: 'topRight',
        pauseOnHover: false,
        progressBarColor: 'black',
        timeout: 3000,
      });
    } else {
      showBtn();
    }
    lightbox.refresh();
  } catch {
    // Show error message if there's an error during fetching
    iziToast.error({
      theme: 'dark',
      message: 'Sorry, there was an error fetching images. Please try again!',
      messageColor: '#FFFFFF',
      backgroundColor: '#EF4040',
      position: 'topRight',
      pauseOnHover: false,
      progressBarColor: '#B51B1B',
      timeout: 3000,
    });
  } finally {
    hideLoader();
    isLoading = false;
    document.querySelector('.form').reset();
  }
}
document.querySelector('.form').addEventListener('submit', fetchRequest);
loadMoreBtn.addEventListener('click', async () => {
  if (isLoading) return;
  try {
    showLoader();
    isLoading = true;
    const data = await buildUrl(searchQuery, ++currentPage);
    const images = data.hits;
    gallery.insertAdjacentHTML('beforeend', renderGallery(images));
    lightbox.refresh();
    if (images.length < 15) {
      hideBtn();
      iziToast.info({
        theme: 'dark',
        message: "We're sorry, but you've reached the end of search results.",
        messageColor: '#FFFFFF',
        backgroundColor: '#1F79FF',
        position: 'topRight',
        pauseOnHover: false,
        progressBarColor: 'black',
        timeout: 3000,
      });
    }
    const height = gallery.firstElementChild.getBoundingClientRect().height;
    scrollBy({
      behavior: 'smooth',
      top: height * 2,
    });
  } catch (error) {
    throw new Error(error.status);
  } finally {
    hideLoader();
    isLoading = false;
  }
});
function showBtn() {
  loadMoreBtn.classList.remove('is-hidden');
}
function hideBtn() {
  loadMoreBtn.classList.add('is-hidden');
}
function showLoader() {
  loader.style.display = 'block';
}
function hideLoader() {
  loader.style.display = 'none';
}
