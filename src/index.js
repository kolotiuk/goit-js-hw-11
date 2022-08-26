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

const onSearch = async e => {
  e.preventDefault();
  inputValue = e.currentTarget.searchQuery.value.trim();
  refs.gallery.innerHTML = '';
  page = 1;

  try {
    const { hits, totalHits } = await fetchImages(inputValue, perPage, page);

    if (hits.length === 0 || !inputValue.trim()) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    Notiflix.Notify.success(
      `Hooray! We found ${totalHits} totalHits images.`
    );
    renderImages(hits);
    simpleLightBox.refresh();
  } catch (error) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  // fetchImages(inputValue, perPage, page)
  //   .then(({ hits, totalHits }) => {
  //     if (hits.length === 0 || !inputValue.trim()) {
  //       Notiflix.Notify.failure(
  //         'Sorry, there are no images matching your search query. Please try again.'
  //       );
  //     } else {
  //       Notiflix.Notify.success(
  //         `Hooray! We found ${totalHits} totalHits images.`
  //       );
  //       renderImages(hits);
  //       simpleLightBox.refresh();
  //     }
  //   })
  // .catch(error =>
  //   Notiflix.Notify.failure(
  //     'Sorry, there are no images matching your search query. Please try again.'
  //   )
  // );
};
refs.form.addEventListener('submit', onSearch);

const loadMoreContent = async () => {
  page += 1;

  try {
    const { hits, totalHits } = await fetchImages(inputValue, perPage, page);
    const lastPage = Math.ceil(totalHits / perPage);

    if (page > lastPage) {
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      return;
    }
    
    renderImages(hits);
    simpleLightBox.refresh();

  } catch (error) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
};

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
