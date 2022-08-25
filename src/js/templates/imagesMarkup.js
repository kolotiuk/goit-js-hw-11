import refs from '../services/getRefs';

// // const renderImages = images => {
// //   const markup = images
// //     .map(
// //       ({
// //         webformatURL,
// //         largeImageURL,
// //         tags,
// //         likes,
// //         views,
// //         comments,
// //         downloads,
// //       }) => {
// //         return `<div class="photo-card">
// //           <a class="gallery-link" href="${largeImageURL}">
// //             <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
// //           </a>
// //           <div class="info">
// //             <p class="info-item">
// //               <b>Likes</b>${likes}
// //             </p>
// //             <p class="info-item">
// //               <b>Views</b>${views}
// //             </p>
// //             <p class="info-item">
// //               <b>Comments</b>${comments}
// //             </p>
// //             <p class="info-item">
// //               <b>Downloads</b>${downloads}
// //             </p>
// //           </div>
// //         </div>
// //         `;
// //       }
// //     )
// //     .join('');

// //   refs.gallery.insertAdjacentHTML('beforeend', markup);
// //   const lastCard = document.querySelector('.last-div');
// //   if (lastCard) {
// //     infiniteObserver.observe(lastCard);
// //   }
// // };

// const infiniteObserver = new IntersectionObserver(
//   ([entry], observer) => {
//     if (entry.isIntersecting) {
//       observer.unobserve(entry.target);
//       loadMoreContent();
//     }
//   },
//   {
//     threshold: 1,
//   }
// );
// import infiniteObserver from './observe';
import infiniteObserver from '../../index';
// import infiniteObserver from './observe';
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

  const lastCard = document.querySelector('.photo-card:last-child');
  if (lastCard) {
    infiniteObserver.observe(lastCard);
  }
};

export default renderImages;
