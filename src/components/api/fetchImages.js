import axios from 'axios';

const API_KEY = '40813799-13823f8fac4dfa82ba757ecf4';
const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

const fetchImages = async (query, page) => {
  try {
    const response = await axios.get(`${BASE_URL}&q=${query}&page=${page}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw new Error('Error fetching images. Please try again later.');
  }
};

export default fetchImages;
