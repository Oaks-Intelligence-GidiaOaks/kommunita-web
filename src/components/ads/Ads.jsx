import "./style.css";
import ads1 from "../../assets/images/ads/ad1.svg";
import Category from "./Category";
import ScrollAdds from "./ScrollAdds";

function Ads() {
  return (
    <div className="ads-container">
      <div className="ads mt-3">
        {/* <img src={ads1} alt="" /> */}
        <ScrollAdds />
      </div>

      <Category />
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
