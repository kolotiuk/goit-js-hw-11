import axios from 'axios';

const API_KEY = '25802265-f217fc33d7f2a9a9b0a0a0132';

axios.defaults.baseURL = 'https://pixabay.com/api';

const fetchImages = async (inputValue, perPage, page) => {
  const res = await axios.get(
    `/?key=${API_KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`
  );
  return res.data;
};
export { fetchImages };
