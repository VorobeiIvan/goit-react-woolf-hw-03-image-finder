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

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.fetchImagesData(query, page);
    }
  }

  fetchImagesData = async (query, page) => {
    this.setState({ loading: true });
    try {
      const data = await fetchImages(query, page);
      const { hits, totalHits } = data;
      if (hits.length === 0) {
        this.setState({ allImagesLoaded: true });
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        error: hits.length === 0 ? 'No images found' : null,
        allImagesLoaded: page >= Math.ceil(totalHits / 12),
      }));
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleFormSubmit = query => {
    if (query.trim() !== '') {
      this.setState({ query, images: [], page: 1, allImagesLoaded: false });
    }
  };

  loadMoreImages = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
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
