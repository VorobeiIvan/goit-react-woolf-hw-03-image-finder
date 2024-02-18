const ImageGalleryItem = ({ src, alt, onClick }) => {
  return (
    <li className="ImageGalleryItem" onClick={onClick}>
      <img src={src} alt={alt} className="ImageGalleryItem-image" />
    </li>
  );
};

export default ImageGalleryItem;
