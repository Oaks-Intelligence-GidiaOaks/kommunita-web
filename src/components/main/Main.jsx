import "../main/style.css";
import Story from "./Story";
import MakePost from "./MakePost";
import Posts from "./Posts";
import postImage from "../../assets/images/main/post-image.svg";
import avatar1 from "../../assets/images/sidebar/avatar1.svg";
import avatar2 from "../../assets/images/sidebar/avatar2.svg";
import avatar4 from "../../assets/images/sidebar/avatar4.svg";
import { useGetFeedsQuery } from "../../service/feeds.service";

function Main() {
  const { data } = useGetFeedsQuery();
  console.log(data);

  return (
    <div className="mt-3 px-3 main-wrapper w-full pb-10">
      <Story />
      <MakePost />
      <Posts
        avatar={avatar1}
        fullname="Larry_the_Nigerian_Whiz"
        username="Larry9jaWhiz"
        verifiedUser={true}
        postTime="5h"
        content="Lorem ipsum dolor sit amet consectetur. Habitant pellentesque elementum aliquam hendrerit netus. Vestibulum consectetur tortor at nisi sit. Mi laoreet elementum ut pellentesque interdum diam viverra sit."
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
