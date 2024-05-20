import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetAdvertQuery } from "../../service/advert.service";

const ScrollAdds = () => {
  const { data: advertData, error, isLoading } = useGetAdvertQuery();
  const ads = advertData?.data?.filter((ad) => ad.status === "active") || [];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading adverts</div>;

  const imageTypes = ["jpeg", "svg+xml", "jpg", "webp", "png", "octet-stream"];

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

  function isToday(date) {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  return (
    <div className="w-[410px] h-[410px]">
      <Slider {...settings}>
        {ads
          .filter((dt) => !isToday(new Date(dt.end_date)))
          .map((ad) => (
            <div key={ad._id} className="relative w-[410px] h-auto">
              <a
                href={ad.landing_page_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {imageTypes.includes(ad.media_urls[0]?.media_type) ? (
                  <img
                    className="object-cover w-[410px] h-[410px]"
                    src={ad.media_urls[0]?.media_url}
                    alt={ad.description}
                  />
                ) : ad.media_urls[0]?.media_type === "mp4" ? (
                  <video className="object-cover w-[410px] h-[503px]" controls>
                    <source
                      src={ad.media_urls[0]?.media_url}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                ) : null}
              </a>
              {/* <div className="absolute bottom-0 left-0 p-2 bg-gray-800 bg-opacity-50 text-white">
              Active
            </div> */}
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default ScrollAdds;
