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

const refs = {
  form: document.querySelector('.form'),
  gallery: document.querySelector('.list'),
  loader: document.querySelector('.loader'),
  loadMoreBtn: document.querySelector('.btn-more'),
};

let currentPage = 1;
let searchQuery = null;

hideLoader();
hideBtn();

async function fetchRequest(event) {
  event.preventDefault();

  searchQuery = refs.form.elements.query.value.trim();

  currentPage = 1;
  refs.gallery.innerHTML = '';

  if (searchQuery === '') {
    iziToast.warning({
      message: 'Please enter a search query.',
      messageColor: 'black',
      backgroundColor: '#ffac26',
      position: 'topRight',
      pauseOnHover: false,
      progressBarColor: 'black',
      timeout: 3000,
    });

    return;
  }

  showLoader();

  const data = await buildUrl(searchQuery, currentPage);
  try {
    const images = data.hits;

    refs.gallery.innerHTML = renderGallery(images);

    images.length < 15 ? hideBtn() : showBtn();

    lightbox.refresh();
  } catch {
    iziToast.error({
      theme: 'dark',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      messageColor: '#ffffff',
      backgroundColor: '#ef4040',
      position: 'topRight',
      pauseOnHover: false,
      progressBarColor: '#b51b1b',
      timeout: 3000,
    });
  } finally {
    hideLoader();

    refs.form.reset();
  }
}

refs.form.addEventListener('submit', fetchRequest);
refs.loadMoreBtn.addEventListener('click', async () => {
  try {
    showLoader();

    const res = await buildUrl(searchQuery, ++currentPage);

    const listItems = document.querySelectorAll('.gallery-item').length;

    refs.gallery.insertAdjacentHTML('beforeend', renderGallery(res.hits));

    const newItems = document.querySelectorAll('.gallery-item');

    if (newItems.length > listItems) {
      const newlyItems = newItems[listItems];

      newlyItems.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    }

    lightbox.refresh();

    if (res.hits.length < 15) {
      hideBtn();

      iziToast.info({
        theme: 'dark',
        message: "We're sorry, but you've reached the end of search results.",
        messageColor: '#ffffff',
        backgroundColor: '#1f79ff',
        position: 'topRight',
        pauseOnHover: false,
        progressBarColor: 'black',
        timeout: 3000,
      });
    }
  } catch (error) {
    throw new Error(error.status);
  } finally {
    hideLoader();
  }
});

function showBtn() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}

function hideBtn() {
  refs.loadMoreBtn.classList.add('is-hidden');
}

function showLoader() {
  refs.loader.style.display = 'block';
}

function hideLoader() {
  refs.loader.style.display = 'none';
}
/** */
