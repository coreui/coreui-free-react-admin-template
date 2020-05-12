import React from 'react';

import Carousel from 'nuka-carousel';
import Slider1 from '../assets/imgs/slider1.png';
const HomeSlider = () => {
  return (
    <Carousel
      className="carousel__height"
      renderCenterLeftControls={({ previousSlide }) => (
        <i
          className="icon-arrow-left icons font-2xl d-block mt-4 px-1"
          onClick={previousSlide}
          style={{ color: 'white' }}
        ></i>
      )}
      defaultControlsConfig={{
        pagingDotsStyle: {
          fill: 'white',
        },
      }}
      renderCenterRightControls={({ nextSlide }) => (
        <i
          className="icon-arrow-right icons font-2xl d-block mt-4 px-1"
          onClick={nextSlide}
          style={{ color: 'white' }}
        ></i>
      )}
    >
      <img src={Slider1} alt="Slider One" />
    </Carousel>
  );
};

export default HomeSlider;
