import "./style.css";
import ads1 from "../../assets/images/ads/ad1.svg";
import Category from "./Category";

function Ads() {
  return (
    <div className="ads-container">
      <div className="ads mt-3">
        <img src={ads1} alt="" />
      </div>

      <Category />
    </div>
  );
}

export default Ads;
