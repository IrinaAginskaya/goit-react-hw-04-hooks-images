import PropTypes from 'prop-types';

function fetchImage(value, page) {
  const KEY = '24233847-0df8e18c0b7a82668deba14ff';
  return fetch(
    `https://pixabay.com/api/?q=${value}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`there is no image here`));
  });
}
const api = {
  fetchImage,
};

fetchImage.propTypes = {
  value: PropTypes.string,
  page: PropTypes.number,
};

export default api;
