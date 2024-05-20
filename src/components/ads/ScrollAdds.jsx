import React from "react";
import Glider from "react-glider";
import "glider-js/glider.min.css";
import { useGetAdvertQuery } from "../../service/advert.service";

const ScrollAdds = () => {
  const { data: advertData, error, isLoading } = useGetAdvertQuery();
  const ads = advertData?.data.filter((ad) => ad.status === "active") || [];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading adverts</div>;

  const imageTypes = ["jpeg", "svg+xml", "jpg", "webp", "png", "octet-stream"];

  return (
    <div className="w-[410px] h-[503px]">
      <Glider draggable hasArrows hasDots slidesToShow={1} slidesToScroll={1}>
        {ads.map((ad) => (
          <div key={ad._id} className="relative w-[410px] h-[400px]">
            <a
              href={ad.landing_page_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {imageTypes.includes(ad.media_urls[0]?.media_type) ? (
                <img
                  className="object-cover w-[410px] h-[400px]"
                  src={ad.media_urls[0]?.media_url}
                  alt={ad.description}
                />
              ) : ad.media_urls[0]?.media_type === "mp4" ? (
                <video className="object-cover w-[410px] h-[400px]" controls>
                  <source src={ad.media_urls[0]?.media_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : null}
            </a>
            <div className="absolute bottom-0 left-0 p-2 bg-gray-800 bg-opacity-50 text-white">
              Active
            </div>
          </div>
        ))}
      </Glider>
    </div>
  );
};

export default ScrollAdds;
