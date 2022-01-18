import './App.css';
import { Component } from 'react';
import Button from './components/Button/Button';
import Searchbar from './components/Searchbar/Searchbar';
import Modal from './components/Modal/Modal';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import api from './Api/Api';
import PropTypes from 'prop-types';

export default class App extends Component {
  state = {
    image: '',
    data: [],
    status: 'idle',
    page: 1,
    error: null,
    showModal: false,
    currImg: {},
  };
  componentDidUpdate(prevProps, prevState) {
    const { page, image } = this.state;

    if (prevState.image !== image) {
      this.setState({ status: 'pending', page: 1 });
      api
        .fetchImage(image, page)
        .then(data => data.hits)
        .then(images => {
          this.setState({ data: images, status: 'resolved' });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }

    if (prevState.page !== page) {
      this.setState({ status: 'pending' });

      api
        .fetchImage(image, page)
        .then(data => data.hits)
        .then(images =>
          this.setState(prevState => ({
            data: [...prevState.data, ...images],
            status: 'resolved',
          })),
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }
  handleFormSubmit = image => {
    this.setState({ image });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = image => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      currImg: image,
    }));
  };

  render() {
    const { status, data, currImg } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {status === 'idle' && <div>Waiting for your request</div>}

        {status === 'pending' && (
          <div>
            <Loader />
          </div>
        )}

        {status === 'resolved' && (
          <div>
            <ImageGallery data={data} onOpenModal={this.toggleModal} />
            {data.length > 0 && <Button onLoadMore={this.onLoadMore} />}
          </div>
        )}

        {status === 'rejected' && <div> Something went wrong</div>}
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={currImg.largeImageURL} alt={currImg.tags} />
          </Modal>
        )}
      </div>
    );
  }
}
App.propTypes = {
  image: PropTypes.string,
  data: PropTypes.array,
  status: PropTypes.string,
  page: PropTypes.number,
  error: PropTypes.bool,
  showModal: PropTypes.bool,
  currImg: PropTypes.object,
  handleFormSubmit: PropTypes.func,
  onLoadMore: PropTypes.func,
  toggleModal: PropTypes.func,
};
