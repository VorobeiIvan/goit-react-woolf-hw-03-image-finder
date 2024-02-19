import React, { Component } from 'react';

class Modal extends Component {
  handleKeyPress = e => {
    if (e.key === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { src, alt, onClose } = this.props;
    return (
      <div className="Overlay" onClick={this.handleBackdropClick}>
        <div className="Modal">
          <img src={src} alt={alt} />
          <button type="button" onClick={onClose}>
            Close modal
          </button>
        </div>
      </div>
    );
  }
}

export default Modal;
