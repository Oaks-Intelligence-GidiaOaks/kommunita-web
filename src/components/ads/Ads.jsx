import "./style.css";
import Category from "./Category";
import Survey from "./Survey";
import ScrollAdds from "./ScrollAdds";
import { useGetSurveyFeedsQuery } from "../../service/survey.service.js";
import { useSelector } from "react-redux";

function Ads() {
  const { data } = useGetSurveyFeedsQuery();
  const surveyFeeds = data?.data;
  const user_id = useSelector((state) => state.user.user._id);
  // console.log(surveyFeeds);

  // Filter out surveys where the user ID already exists in the list of respondents
  const filteredSurveyFeeds = surveyFeeds?.filter((survey) => {
    // Check if any respondent has the same user ID
    const isUserRespondent = survey.respondents.some(
      (respondent) => respondent.respondent._id === user_id
    );
    console.log(isUserRespondent, "check");
    // Return true if the user is not aisUserRespondent respondent to this survey
    return !isUserRespondent;
  });

  // console.log(surveyFeeds, "survey");

  return (
    <aside className="ads-container w-full max-w-[410px] p-4 h-full hidden lg:block">
      <div className="rounded-md">
        <div className="ads rounded-md">
          <ScrollAdds />
        </div>
        <Survey feeds={filteredSurveyFeeds} />
        <Category />
      </div>
    </aside>
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
