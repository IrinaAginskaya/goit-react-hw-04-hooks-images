import { Buttonstyle } from './Button.styled';
import PropTypes from 'prop-types';

function Button({ onLoadMore }) {
  return (
    <Buttonstyle type="button" onClick={onLoadMore}>
      Load more
    </Buttonstyle>
  );
}

Button.propTypes = {
  onLoadMore: PropTypes.func,
};
export default Button;
