import { useEffect, useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetAdvertQuery } from "../../service/advert.service";

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
      {advert && (
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
      )}
    </div>
  );
};

export default ScrollAdds;
