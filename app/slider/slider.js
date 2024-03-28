'use client'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SliderComponent() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="px-4">
          <div className="h-60 flex items-center justify-center text-3xl bg-teal-400 rounded-md text-white">1</div>
        </div>
        <div className="px-4">
          <div className="h-60 flex items-center justify-center text-3xl bg-teal-500 rounded-md text-white">2</div>
        </div>
        <div className="px-4">
          <div className="h-60 flex items-center justify-center text-3xl bg-teal-600 rounded-md text-white">3</div>
        </div>
        <div className="px-4">
          <div className="h-60 flex items-center justify-center text-3xl bg-teal-700 rounded-md text-white">4</div>
        </div>
        <div className="px-4">
          <div className="h-60 flex items-center justify-center text-3xl bg-teal-800 rounded-md text-white">5</div>
        </div>
        <div className="px-4">
          <div className="h-60 flex items-center justify-center text-3xl bg-teal-900 rounded-md text-white">6</div>
        </div>
      </Slider>
    </div>
  )
}