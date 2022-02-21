import './sass/main.scss';
import { fetchImages } from './js/get-images';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const moreBtn = document.querySelector('.btn-load-more');
let simpleLightBox;

searchForm.addEventListener('submit', onSearchForm);
moreBtn.addEventListener('click', loadMoreBtn);

let inputValue = '';
let page = 1;
const perPage = 40;

async function onSearchForm(event) {
    event.preventDefault();
    page = 1;
    inputValue = event.currentTarget.searchQuery.value.trim();
    gallery.innerHTML = '';
    moreBtn.classList.add('is-hidden');

    if (inputValue === '') {
        Notiflix.Notify.failure(
            'The search string cannot be empty. Please specify your search query.',
        );
        return;
    }

    fetchImages(inputValue, page, perPage)
        .then(({ data }) => {
            if (data.totalHits === 0) {
                Notiflix.Notify.failure(
                    'Sorry, there are no images matching your search query. Please try again.',
                );
            } else {
                renderGallery(data.hits);
                simpleLightBox = new SimpleLightbox('.gallery a').refresh();
                Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);

                if (data.totalHits > perPage) {
                    moreBtn.classList.remove('is-hidden');
                }
            }
        })
        .catch(error => console.log(error));
}

function renderGallery(images) {
    const markup = images
        .map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
            return `
        <a class="gallery-link" href="${largeImageURL}">
          <div class="gallery-card">
            <img class="gallery-card-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="gallery-info">
              <p class="gallery-info-item"><b>Likes</b>${likes}</p>
              <p class="gallery-info-item"><b>Views</b>${views}</p>
              <p class="gallery-info-item"><b>Comments</b>${comments}</p>
              <p class="gallery-info-item"><b>Downloads</b>${downloads}</p>
            </div>
          </div>
        </a>
      `;
        })
        .join('');

    gallery.insertAdjacentHTML('beforeend', markup);
}

async function loadMoreBtn() {
    page += 1;
    simpleLightBox.destroy();

    fetchImages(inputValue, page, perPage)
        .then(({ data }) => {
            renderGallery(data.hits);
            simpleLightBox = new SimpleLightbox('.gallery a').refresh();

            const lastPage = Math.ceil(data.totalHits / perPage);
            if (page > lastPage) {
                moreBtn.classList.add('is-hidden');
                Notiflix.Notify.failure(
                    "We're sorry, but you've reached the end of search results.",
                );
            }
        })
        .catch(error => console.log(error));
}
