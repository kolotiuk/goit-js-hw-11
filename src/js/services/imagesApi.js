const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '25802265-f217fc33d7f2a9a9b0a0a0132';

const fetchImages = (inputValue) => {
  return fetch(
    `${BASE_URL}/?key=${API_KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true`
  ).then(res => (res.ok ? res.json() : Promise.reject(res.statusText)));
};
export { fetchImages };

