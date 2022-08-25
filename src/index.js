// Libraries
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Other js files
import renderImages from './js/templates/imagesMarkup';
import { fetchImages } from './js/services/imagesApi';
import refs from './js/services/getRefs';

// Sass styles
import './sass/_example.scss';

let simpleLightBox = new SimpleLightbox('.gallery a');
let perPage = 40;
let page = 1;
let inputValue = '';

const onSearch = e => {
  e.preventDefault();
  inputValue = e.currentTarget.searchQuery.value.trim();
  refs.gallery.innerHTML = '';
  page = 1;
  // refs.button.classList.add('is-hidden');

  fetchImages(inputValue, perPage, page)
    .then(({ hits, totalHits }) => {
      if (hits.length === 0 || !inputValue.trim()) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        Notiflix.Notify.success(
          `Hooray! We found ${totalHits} totalHits images.`
        );
        // refs.button.classList.remove('is-hidden');
        renderImages(hits);
        simpleLightBox.refresh();

        if (totalHits < perPage) {
          // refs.button.classList.add('is-hidden');
        }
      }
    })
    .catch(error =>
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      )
    );
};
refs.form.addEventListener('submit', onSearch);

const loadMoreContent = () => {
  page += 1;

  fetchImages(inputValue, perPage, page).then(({ hits, totalHits }) => {
    const lastPage = Math.ceil(totalHits / perPage);

    if (page > lastPage) {
      // refs.button.classList.add('is-hidden');
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      return;
    }
    renderImages(hits);
    simpleLightBox.refresh();
  });
};
// refs.button.addEventListener('click', loadMoreContent);

export default infiniteObserver = new IntersectionObserver(
  ([entry], observer) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      loadMoreContent();
    }
  },
  {
    threshold: 1,
  }
);

