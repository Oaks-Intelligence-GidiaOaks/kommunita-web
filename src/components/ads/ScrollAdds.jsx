import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import ads1 from "../../assets/images/ads/ad1.svg";
import ads2 from "../../assets/images/ads/nivea.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// const slideImages = [
//   {
//     url: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
//     caption: "Slide 1",
//   },
//   {
//     url: "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
//     caption: "Slide 2",
//   },
//   {
//     url: "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
//     caption: "Slide 3",
//   },
// ];

const ScrollAdds = ({ adds }) => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    // autoplaySpeed: 5000,
    cssEase: "linear",
  };

  return (
    // <div className="slide-container">
    //   <Slide>
    //     {slideImages.map((slideImage, index) => (
    //       <a href={slideImage.url} target="_blank">
    //         <div key={index}>
    //           <div
    //             style={{
    //               ...divStyle,
    //               backgroundImage: `url(${slideImage.url})`,
    //             }}
    //           >
    //             {/* <span style={spanStyle}>{slideImage.caption}</span> */}
    //           </div>
    //         </div>
    //       </a>
    //     ))}
    //   </Slide>
    // </div>
    <div className="max-w-[300px]">
      <Slider {...settings}>
        <a href="https://www.google.com" target="_blank">
          <div className="lg:max-w-[400px]">
            <img src={ads1} alt="" width={300} />
          </div>
        </a>
        <a href="https://www.google.com" target="_blank">
          <div className="lg:max-w-[400px]">
            <img src={ads2} alt="" width={300} />
          </div>
        </a>
      </Slider>
    </div>
  );
};

export default ScrollAdds;
