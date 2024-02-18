const Modal = ({ onClose, src, alt }) => {
  return (
    <div className="Overlay" onClick={onClose}>
      <div className="Modal">
        <img src={src} alt={alt} />
      </div>
    </div>
  );
};

export default Modal;
