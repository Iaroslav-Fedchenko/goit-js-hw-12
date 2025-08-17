import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
//-----------------------------------------------------------------------------------------------------------------------
const form = document.querySelector('.form');
const input = form.querySelector('input[name="search-text"]');

let query = '';
let page = 1;
let totalHits = 0;
const PER_PAGE = 15;

form.addEventListener('submit', onSearch);
document.querySelector('.load-more').addEventListener('click', onLoadMore);
//-------------------------------------------------------------------------------------------------------------
async function onSearch(event) {
  event.preventDefault();

  query = input.value.trim();
  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Search query cannot be empty',
      position: 'topRight',
    });
    return;
  }

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    hideLoader();

    if (data.hits.length === 0) {
      iziToast.info({
        title: 'Info',
        message: 'No images found. Please try another search.',
        position: 'topRight',
      });
      return;
    }

    totalHits = data.totalHits;
    createGallery(data.hits);
    checkEndOfResults();
    form.reset();
  } catch {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  }
}
//-------------------------------------------------------------------------------------------------------------------------------
async function onLoadMore() {
  page += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    hideLoader();

    createGallery(data.hits);
    checkEndOfResults();
    smoothScroll();
  } catch {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  }
}
//-----------------------------------------------------------------------------------------------------------------------------
function checkEndOfResults() {
  if (page * PER_PAGE >= totalHits) {
    hideLoadMoreButton();
    iziToast.info({
      title: 'End',
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  } else {
    showLoadMoreButton();
  }
}
//-----------------------------------------------------------------------------------------------------------------------
function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
