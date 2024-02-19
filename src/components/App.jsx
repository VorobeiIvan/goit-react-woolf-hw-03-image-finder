import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
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
    allImagesLoaded: false,
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
      const newImages = data.hits;
      if (newImages.length < 12) {
        this.setState({ allImagesLoaded: true });
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...newImages],
        page: prevState.page + 1,
        error: newImages.length === 0 ? 'No images found' : null,
      }));
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleFormSubmit = query => {
    this.setState({ query, images: [], page: 1, allImagesLoaded: false });
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
    const {
      images,
      loading,
      error,
      showModal,
      largeImageURL,
      allImagesLoaded,
    } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        {error && <p>{error}</p>}
        {loading && <Loader />}
        <ImageGallery
          images={images}
          handleImageClick={this.handleImageClick}
        />
        {images.length > 0 && !loading && !allImagesLoaded && (
          <Button onClick={this.loadMoreImages}>Load more</Button>
        )}
        {allImagesLoaded && <p>All images loaded for this query.</p>}
        {showModal && (
          <Modal src={largeImageURL} alt="" onClose={this.closeModal} />
        )}
      </div>
    );
  }
}

export default App;
