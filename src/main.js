import { getImagesByQuery } from "./js/pixabay-api.js";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from "./js/render-functions.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const input = form.querySelector('input[name="search-text"]');

form.addEventListener("submit", onSearch);

function onSearch(event) {
  event.preventDefault();

  const query = input.value.trim();
  if (query === "") {
    iziToast.error({
      title: "Error",
      message: "Search query cannot be empty",
      position: "topRight",
    });
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then((data) => {
      hideLoader();
      if (data.hits.length === 0) {
        iziToast.info({
          title: "Info",
          message:
            "Sorry, there are no images matching your search query. Please try again!",
          position: "topRight",
        });
        return;
      }
      createGallery(data.hits);
      form.reset();
    })
    .catch((error) => {
      hideLoader();
      iziToast.error({
        title: "Error",
        message: "Something went wrong. Please try again later.",
        position: "topRight",
      });
      console.error(error);
    });
}
