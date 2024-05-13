import "./style.css";
import Category from "./Category";
import Survey from "./Survey";
import ScrollAdds from "./ScrollAdds";
import { useGetSurveyFeedsQuery } from "../../service/survey.service.js";

function Ads() {
  const { data } = useGetSurveyFeedsQuery();
  const surveyFeeds = data?.data;

  return (
    <div className="ads-container">
      <div className="mt-3">
        <div className="ads">
          <ScrollAdds />
        </div>
        <Survey feeds={surveyFeeds} />
        <Category />
      </div>
    </div>
  );
}

export function AdsOnly() {
  return (
    <div className="ads-container">
      <div className="ads mt-3">
        <ScrollAdds />
      </div>
    </div>
  );
}
export default Ads;
