import "./style.css";
import Header from "./Header";
import Posts from "../main/Posts";
import postImage from "../../assets/images/main/post-image.svg";
import avatar1 from "../../assets/images/sidebar/avatar1.svg";
import avatar2 from "../../assets/images/sidebar/avatar2.svg";
import avatar4 from "../../assets/images/sidebar/avatar4.svg";

function Main() {
  return (
    <div className="mt-3 px-3 w-full">
      <Header />
      <Posts
        avatar={avatar1}
        fullname="Perl Rosy"
        username="perl_skin"
        verifiedUser={true}
        postTime="10m"
        content="Check out this cool image!"
        videoSrc="https://www.youtube.com/embed/EQJsr2OvVx4"
      />

      <Posts
        avatar={avatar2}
        fullname="Larry John"
        username="JohnDoe"
        verifiedUser={false}
        postTime="1h"
        imageSrc={postImage}
      />

      <Posts
        avatar={avatar4}
        fullname="Perl Rosy"
        username="perl_skin"
        verifiedUser={true}
        postTime="10m"
        content="Check out this cool image!"
        imageSrc={postImage}
      />
    </div>
  );
}

export default Main;
