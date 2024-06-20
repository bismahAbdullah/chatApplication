// SideBarButton.jsx
import React from 'react';
import '../styles/sideBarButton.scss';
import PropTypes from 'prop-types';

const SideBarButton = ({ imageSrc, text }) => {
    return (
        <div className="button-with-image">
            <img src={imageSrc} alt="Button Image" className="button-image" />
            <span className="button-text">{text}</span>
        </div>
    );
};

SideBarButton.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    text: PropTypes.string,
};

export default SideBarButton;
