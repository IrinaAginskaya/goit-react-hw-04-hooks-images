import { Gallery } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export default function ImageGallery({ data, onOpenModal }) {
  return (
    <Gallery>
      {data.map(image => (
        <li
          onClick={() => {
            onOpenModal(image);
          }}
          key={image.id}
        >
          <img src={image.webformatURL} alt={image.tags} />
        </li>
      ))}
    </Gallery>
  );
}

ImageGallery.propTypes = {
  data: PropTypes.string,
  onOpenModal: PropTypes.func,
};
