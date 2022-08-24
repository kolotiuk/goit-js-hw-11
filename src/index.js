import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './js/services/imagesApi';
import refs from './js/services/getRefs';
import './sass/_example.scss';

let simpleLightBox = new SimpleLightbox('.gallery a');
let perPage = 40;
let page = 1;
let inputValue = '';

const onInput = e => {
  e.preventDefault();
  inputValue = e.currentTarget.searchQuery.value.trim();
  refs.gallery.innerHTML = '';
  page = 1;
  refs.button.classList.add('is-hidden');

  fetchImages(inputValue, perPage, page)
    .then(res => {
      if (res.hits.length === 0 || !inputValue.trim()) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        Notiflix.Notify.success(
          `Hooray! We found ${res.totalHits} totalHits images.`
        );
        refs.button.classList.remove('is-hidden');
        renderImages(res.hits);
        simpleLightBox.refresh();
        if (res.totalHits < perPage) {
          refs.button.classList.add('is-hidden');
        }
      }
    })
    .catch(error =>
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      )
    );
};
refs.form.addEventListener('submit', onInput);

const renderImages = images => {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>${likes}
          </p>
          <p class="info-item">
            <b>Views</b>${views}
          </p>
          <p class="info-item">
            <b>Comments</b>${comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>${downloads}
          </p>
        </div>
      </div>
      `;
      }
    )
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', markup);
};

function loadMoreContent() {
  page += 1;

  fetchImages(inputValue, perPage, page).then(res => {
    renderImages(res.hits);
    simpleLightBox.refresh();
    if (perPage > res.hits) {
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      refs.button.classList.add('is-hidden');
    }
  });
}
refs.button.addEventListener('click', loadMoreContent);
