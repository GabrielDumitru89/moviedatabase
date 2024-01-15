import React, { useState, useEffect, useRef } from 'react';
import ColorThief from 'colorthief';
import styles from '../../styles/MediaDetail.module.scss';

const ImageWithGradient = ({ backdropUrl }) => {
  const [dominantColor, setDominantColor] = useState('');
  const imageRef = useRef(null);

  // Function to generate gradient style dynamically
  const generateGradientStyle = (dominantColor) => {
    return {
      backgroundImage: `linear-gradient(to bottom, ${dominantColor}, transparent)`,
    };
  };

  useEffect(() => {
    const colorThief = new ColorThief();

    const image = new Image();
    image.crossOrigin = 'Anonymous'; // Enable CORS for the image
    image.src = backdropUrl;

    image.onload = () => {
      const color = colorThief.getColor(image);
      const rgbColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
      setDominantColor(rgbColor);
    };
  }, [backdropUrl]);

  const gradientStyle = generateGradientStyle(dominantColor);

  return (
        <div className={styles.mediaBackdrop} style={gradientStyle}>
          <img
            ref={imageRef}
            src={backdropUrl}
            alt="Backdrop Image"
            className="media-image"
            crossOrigin="anonymous"
          />
        </div>
  );
};

export default ImageWithGradient;