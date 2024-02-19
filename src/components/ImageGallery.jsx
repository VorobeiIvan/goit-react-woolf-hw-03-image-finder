import React from 'react';
import ImageGalleryItem from './ImageGalleryItem';

const ImageGallery = ({ images, handleImageClick }) => {
  return (
    <ul className="ImageGallery">
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          src={image.webformatURL}
          alt={image.tags}
          onClick={() => handleImageClick(image.largeImageURL)}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
