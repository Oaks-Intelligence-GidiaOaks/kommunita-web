import PropTypes from "prop-types";
import "./style.css";
import survey_bg from "../../assets/carousel/survey-bg.svg";
import left from "../../assets/carousel/left.svg";
import right from "../../assets/carousel/right.svg";
import Carousel from "./Carousel";

const Survey = ({ feeds }) => {
  // console.log(feeds, "feeds")
  return (
    <>
      {feeds?.length > 0 && (
        <div className="category-section mt-4 mb-5">
          <div
            className="rounded-md h-[250px] survey-container relative"
            style={{
              background: `
                linear-gradient(
                  181.66deg,
                  rgba(50, 49, 49, 0) 19.82%,
                  #111010 65.8%
                ),
                url(${survey_bg})
              `,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="flex justify-start flex-col gap-3 items-center absolute bottom-1 w-full">
              <Carousel surveys={feeds} left={left} right={right} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Survey.propTypes = {
  feeds: PropTypes.arrayOf(PropTypes.object),
};

export default Survey;
