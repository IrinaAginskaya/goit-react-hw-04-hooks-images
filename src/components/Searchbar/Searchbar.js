import { Component } from 'react';
import { SearchBar } from './Searchbar.styled';
import PropTypes from 'prop-types';

export default class Searchbar extends Component {
  state = {
    image: '',
  };

  handleNameChange = event => {
    this.setState({ image: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.image.trim() === '') {
      alert('Введите название картинки');
      return;
    }
    this.props.onSubmit(this.state.image);
    this.setState({ image: '' });
  };

  render() {
    return (
      <SearchBar>
        <form onSubmit={this.handleSubmit}>
          <button type="submit" class="button">
            <span>Search</span>
          </button>

          <input
            class="input"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            value={this.state.image}
            onChange={this.handleNameChange}
          />
        </form>
      </SearchBar>
    );
  }
}
Searchbar.propTypes = {
  image: PropTypes.string,
  handleNameChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};
