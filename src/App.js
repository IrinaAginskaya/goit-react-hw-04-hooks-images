import './App.css';
import { useEffect, useState } from 'react';
import Button from './components/Button/Button';
import Searchbar from './components/Searchbar/Searchbar';
import Modal from './components/Modal/Modal';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import api from './Api/Api';
import PropTypes from 'prop-types';

export default function App() {
  const [image, setImage] = useState('');
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currImg, setCurrImg] = useState({});

  useEffect(() => {
    if (image !== '') {
      setStatus(true);
    }
  }, [image]);

  useEffect(() => {
    if (!image) {
      return;
    }
    fetchImage();
  }, [image]);

  const fetchImage = () => {
    setStatus(true);

    api
      .fetchImage(image, page)
      .then(
        ({ hits }) => setData(prevImage => [...prevImage, ...hits]),
        setPage(prevPage => prevPage + 1),
      )
      .catch(error => setError(error))
      .finally(() => setStatus(false));
  };

  const handleFormSubmit = image => {
    setImage(image);
    setData([]);
    setPage(1);
  };

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const toggleModal = currImg => {
    setShowModal(showModal => !showModal);
    setCurrImg(currImg);
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />

      {status && (
        <div>
          <Loader />
        </div>
      )}

      {
        <div>
          <ImageGallery data={data} onOpenModal={toggleModal} />
          {data.length > 0 && <Button onLoadMore={onLoadMore} />}
        </div>
      }

      {error && <div> Something went wrong</div>}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={currImg.largeImageURL} alt={currImg.tags} />
        </Modal>
      )}
    </div>
  );
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

// export default class App extends Component {
//   state = {
//     image: '',
//     data: [],
//     status: 'idle',
//     page: 1,
//     error: null,
//     showModal: false,
//     currImg: {},
//   };
//   componentDidUpdate(prevProps, prevState) {
//     const { page, image } = this.state;

//     if (prevState.image !== image) {
//       this.setState({ status: 'pending', page: 1 });
//       api
//         .fetchImage(image, page)
//         .then(data => data.hits)
//         .then(images => {
//           this.setState({ data: images, status: 'resolved' });
//         })
//         .catch(error => this.setState({ error, status: 'rejected' }));
//     }

//     if (prevState.page !== page) {
//       this.setState({ status: 'pending' });

//       api
//         .fetchImage(image, page)
//         .then(data => data.hits)
//         .then(images =>
//           this.setState(prevState => ({
//             data: [...prevState.data, ...images],
//             status: 'resolved',
//           })),
//         )
//         .catch(error => this.setState({ error, status: 'rejected' }));
//     }
//   }
//   handleFormSubmit = image => {
//     this.setState({ image });
//   };

//   onLoadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   toggleModal = image => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//       currImg: image,
//     }));
//   };

//   render() {
//     const { status, data, currImg } = this.state;
//     return (
//       <div>
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         {status === 'idle' && <div>Waiting for your request</div>}

//         {status === 'pending' && (
//           <div>
//             <Loader />
//           </div>
//         )}

//         {status === 'resolved' && (
//           <div>
//             <ImageGallery data={data} onOpenModal={this.toggleModal} />
//             {data.length > 0 && <Button onLoadMore={this.onLoadMore} />}
//           </div>
//         )}

//         {status === 'rejected' && <div> Something went wrong</div>}
//         {this.state.showModal && (
//           <Modal onClose={this.toggleModal}>
//             <img src={currImg.largeImageURL} alt={currImg.tags} />
//           </Modal>
//         )}
//       </div>
//     );
//   }
// }
// App.propTypes = {
//   image: PropTypes.string,
//   data: PropTypes.array,
//   status: PropTypes.string,
//   page: PropTypes.number,
//   error: PropTypes.bool,
//   showModal: PropTypes.bool,
//   currImg: PropTypes.object,
//   handleFormSubmit: PropTypes.func,
//   onLoadMore: PropTypes.func,
//   toggleModal: PropTypes.func,
// };

// useEffect(() => {

//   if (!image) {
//     return
//   }

//   async function getFetchImages() {
//     setStatus('pending');
//     try {
//       const hits = await fetchImage(image, page);
//       if (!hits.length) {
//         throw new Error();
//       }
//       setData(prev => [...prev, ...data]);
//       setStatus('resolved');

//       page > 1 &&
//         window.scrollTo({
//           top: document.documentElement.scrollHeight,
//           behavior: 'smooth',
//         });
//     } catch (error) {
//       setError(error);
//       setStatus('rejected');
//     }
//   }
//   getFetchImages();
// }, [image, page]);
