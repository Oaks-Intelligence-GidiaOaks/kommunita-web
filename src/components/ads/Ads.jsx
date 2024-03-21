import "./style.css";
import ads1 from "../../assets/images/ads/ad1.svg";

function Ads() {
  return (
    <div className="ads-container">
      <div className="ads mt-3">
        <img src={ads1} alt="" />
      </div>

      <div className="category-section mt-4">
        <div className="p-4">
          <div className="flex justify-between">
            <p className="category">Categories</p>
            <button className="category-btn">See all</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ads;
