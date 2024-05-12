import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import ads1 from "../../assets/images/ads/ad1.svg";
import ads2 from "../../assets/images/ads/nivea.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetAdvertQuery } from "../../service/advert.service";
import { ShimmerSocialPost } from "react-shimmer-effects";

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

const ScrollAdds = () => {
  const { data } = useGetAdvertQuery();
  const [advert, setAdvert] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setAdvert(data?.data);
      console.log(data);
    }, 5000);
  }, [data]);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 7000,
    // autoplaySpeed: 5000,
    cssEase: "linear",
  };

  function isToday(date) {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  return (
    <div className="w-full">
      {advert ? (
        <Slider {...settings}>
          {advert
            ?.filter((dt) => !isToday(new Date(dt.end_date)))
            .map((ads, id) => (
              <a href={ads.landing_page_link} key={id} target="_blank">
                <div className="relative lg:max-w-[400px] h-[400px]">
                  <img
                    className="object-cover w-[300px] h-[400px]"
                    src={ads.media_urls[0].media_url}
                    alt=""
                    width={300}
                  />
                  <div className="absolute bottom-0 p-1 bg-white w-11/12">
                    <h2 className="font-semibold">{ads.headline}:</h2>
                    <p className="text-sm">{ads.description}</p>
                  </div>
                </div>
              </a>
            ))}
        </Slider>
      ) : (
        <ShimmerSocialPost type="image" />
      )}
    </div>
  );
};

export default ScrollAdds;
