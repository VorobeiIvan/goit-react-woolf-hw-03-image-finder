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

  fetchImagesData = async (
    query = this.state.query,
    page = this.state.page
  ) => {
    this.setState({ loading: true });
    try {
      const data = await fetchImages(query, page);
      const newImages = data.hits;
      if (newImages.length === 0) {
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
    this.fetchImagesData();
  };

  handleImageClick = largeImageURL => {
    this.setState({ largeImageURL, showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false, largeImageURL: '' });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchImagesData(this.state.query, 1);
    }
  }

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
