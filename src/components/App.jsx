import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';
import fetchImages from './api/fetchImages';

class App extends Component {
  state = {
    query: '',
    images: [],
    loading: false,
    error: null,
    page: 1,
    largeImageURL: '',
    showModal: false,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = e => {
    if (e.key === 'Escape') {
      this.closeModal();
    }
  };

  fetchImagesData = async (query, page) => {
    this.setState({ loading: true });
    try {
      const data = await fetchImages(query, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        page: prevState.page + 1,
        loading: false,
        error: data.hits.length === 0 ? 'No images found' : null,
      }));
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  handleFormSubmit = query => {
    this.setState({ query, images: [], page: 1 });
    this.fetchImagesData(query, 1);
  };

  loadMoreImages = () => {
    this.fetchImagesData(this.state.query, this.state.page);
  };

  handleImageClick = largeImageURL => {
    this.setState({ largeImageURL, showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false, largeImageURL: '' });
  };

  render() {
    const { images, loading, error, showModal, largeImageURL } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        {error && <p>{error}</p>}
        {loading && <Loader />}
        <ImageGallery>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              src={image.webformatURL}
              alt={image.tags}
              onClick={() => this.handleImageClick(image.largeImageURL)}
            />
          ))}
        </ImageGallery>
        {images.length > 0 && !loading && (
          <Button onClick={this.loadMoreImages}>Load more</Button>
        )}
        {showModal && (
          <Modal src={largeImageURL} alt="" onClose={this.closeModal} />
        )}
      </div>
    );
  }
}

export default App;
