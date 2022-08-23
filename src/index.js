import { fetchImages } from './js/services/imagesApi';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import refs from './js/services/getRefs';

const onInput = e => {
  e.preventDefault();
  const inputValue = e.currentTarget.searchQuery.value.trim();

  fetchImages(inputValue).then(res => {
    if (res.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    renderImages(res.hits);
    console.log(res.hits);
  });
};
refs.form.addEventListener('submit', onInput);

const renderImages = images => {
  const markup = images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
                        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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
                    </div>`;
      }
    )
    .join('');

  refs.gallery.insertAdjacentHTML('afterbegin', markup);
};
