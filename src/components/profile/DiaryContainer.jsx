import React from "react";
import PostHeader from "./PostHeader";
import ProfileReactions from "./ProfileReactions";
import MainComment from "./comments/MainComment";

const DiaryContainer = ({ comment }) => {
  return (
    <div className="max-w-[491px] rounded-lg bg-white p-8 mb-5">
      <PostHeader diary={true} />
      <p className="text-sm mt-5 text-primary-dark-gray">
        Lorem ipsum dolor sit amet consectetur. Habitant pellentesque elementum
        aliquam hendrerit netus. Vestibulum consectetur tortor at nisi sit. Mi
        laoreet elementum ut pellentesque interdum diam viverra
        sit.jhbhduycuyvvdkjsC uysVdkjd syv OJHS LUydvyOYDClkjkcblkjcS:LIhb :IY
        LJBJ lNKSC lHlY lJ dblN NblJlJH LYLSjnd ljs nklHDlyDOLHbadldjX
        NLaHalDYBLajNB LZHBLYDLaDLJBSLYCOLyLJKBLJbli uducosyvvoSbzdkfliygO
        FyvlbdLbsyLcfbkjxlfjlk jnlzdbldfkldjbjldb ldkzfnzl db dfljzbdlzb
        zdlbijnzlbknn zlkdjkfbzl;kjb zlk bblzdgigjblzdknb lzdfbzld fdln ldh
        blkzndn blzdfj lzbl zdn ljn lnbl ljh locl ktckg mhcittk hkyvtckgh ,jh
        kuctlhlj.{" "}
      </p>
      <div className="flex items-center gap-2 justify-end mt-2">
        <ProfileReactions
          icon={
            <svg
              width="19"
              height="20"
              viewBox="0 0 19 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                clip-path="url(#clip0_1726_12731)"
                filter="url(#filter0_b_1726_12731)"
              >
                <path
                  d="M8.93263 5.00495L9.44044 5.80294L9.94825 5.00495C10.6632 3.88146 11.9265 3.15971 13.3738 3.15971C15.6373 3.15971 17.4919 5.01423 17.4919 7.2778C17.4919 8.2767 17.0308 9.33195 16.2563 10.3881C15.4864 11.438 14.4467 12.4341 13.386 13.3019C12.3282 14.1674 11.2674 14.8909 10.4694 15.3987C10.071 15.6523 9.7395 15.8511 9.50856 15.9861C9.48519 15.9998 9.46285 16.0128 9.44158 16.0251C9.42011 16.0126 9.39756 15.9993 9.37396 15.9854C9.14293 15.8494 8.81138 15.6492 8.41288 15.3941C7.61469 14.8831 6.55363 14.1558 5.49556 13.2877C4.43452 12.4172 3.39448 11.4196 2.6243 10.3711C1.84918 9.3159 1.38902 8.26588 1.38902 7.2778C1.38902 5.01423 3.24354 3.15971 5.50711 3.15971C6.95437 3.15971 8.21768 3.88146 8.93263 5.00495Z"
                  stroke="#838383"
                  strokeWidth="1.20383"
                />
              </g>
              <defs>
                <filter
                  id="filter0_b_1726_12731"
                  x="-2.92486"
                  y="-2.36487"
                  width="24.7296"
                  height="24.7297"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feGaussianBlur
                    in="BackgroundImageFix"
                    stdDeviation="1.46243"
                  />
                  <feComposite
                    in2="SourceAlpha"
                    operator="in"
                    result="effect1_backgroundBlur_1726_12731"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_backgroundBlur_1726_12731"
                    result="shape"
                  />
                </filter>
                <clipPath id="clip0_1726_12731">
                  <rect
                    width="18.88"
                    height="18.88"
                    fill="white"
                    transform="translate(0 0.559998)"
                  />
                </clipPath>
              </defs>
            </svg>
          }
          data={"12k"}
        />
        <ProfileReactions
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.61443 2.13348C8.58136 2.13348 7.55841 2.33696 6.60398 2.7323C5.64956 3.12764 4.78234 3.70709 4.05185 4.43758C2.57657 5.91286 1.74776 7.91378 1.74776 10.0002C1.74088 11.8167 2.36985 13.5783 3.52563 14.9797L1.95229 16.5531C1.84314 16.6637 1.76919 16.8042 1.73979 16.9568C1.71039 17.1094 1.72685 17.2673 1.78709 17.4106C1.85243 17.5521 1.95835 17.671 2.09141 17.7523C2.22447 17.8335 2.37867 17.8734 2.53443 17.8668H9.61443C11.7008 17.8668 13.7017 17.038 15.177 15.5627C16.6523 14.0874 17.4811 12.0865 17.4811 10.0002C17.4811 7.91378 16.6523 5.91286 15.177 4.43758C13.7017 2.96229 11.7008 2.13348 9.61443 2.13348ZM9.61443 16.2935H4.43029L5.16189 15.5619C5.30841 15.4145 5.39065 15.2151 5.39065 15.0073C5.39065 14.7995 5.30841 14.6001 5.16189 14.4527C4.13182 13.4238 3.49036 12.0695 3.34681 10.6207C3.20326 9.17183 3.56649 7.71803 4.37462 6.50697C5.18275 5.29591 6.38578 4.40251 7.77875 3.97898C9.17172 3.55545 10.6685 3.628 12.0139 4.18426C13.3594 4.74051 14.4704 5.74607 15.1576 7.02961C15.8448 8.31315 16.0658 9.79526 15.7828 11.2234C15.4998 12.6516 14.7304 13.9375 13.6056 14.8619C12.4809 15.7864 11.0704 16.2923 9.61443 16.2935Z"
                fill="#838383"
              />
            </svg>
          }
          data={"12k"}
        />
        <ProfileReactions
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.2826 14.3492H6.41404V11.9886L3.2666 15.1361L6.41404 18.2835V15.9229H15.8563V11.2018H14.2826M6.41404 6.48062H14.2826V8.8412L17.4301 5.69376L14.2826 2.54633V4.9069H4.84032V9.62806H6.41404V6.48062Z"
                fill="#838383"
              />
            </svg>
          }
          data={"12k"}
        />
        <ProfileReactions
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.669 4.492H7.27335C6.73673 4.492 6.22208 4.67435 5.84263 4.99893C5.46318 5.32351 5.25001 5.76373 5.25001 6.22275V15.4534C5.24953 15.5551 5.28047 15.655 5.33969 15.7432C5.39891 15.8313 5.48431 15.9045 5.58723 15.9553C5.68976 16.0059 5.80606 16.0326 5.92446 16.0326C6.04285 16.0326 6.15915 16.0059 6.26168 15.9553L9.97115 14.1207L13.6806 15.9553C13.7834 16.0051 13.8997 16.031 14.0179 16.0303C14.136 16.031 14.2523 16.0051 14.3551 15.9553C14.458 15.9045 14.5434 15.8313 14.6026 15.7432C14.6618 15.655 14.6928 15.5551 14.6923 15.4534V6.22275C14.6923 5.76373 14.4791 5.32351 14.0997 4.99893C13.7202 4.67435 13.2056 4.492 12.669 4.492ZM13.3434 14.4553L10.3084 12.9554C10.2058 12.9047 10.0895 12.8781 9.97115 12.8781C9.85276 12.8781 9.73646 12.9047 9.63393 12.9554L6.5989 14.4553V6.22275C6.5989 6.06974 6.66996 5.923 6.79645 5.81481C6.92293 5.70662 7.09448 5.64583 7.27335 5.64583H12.669C12.8478 5.64583 13.0194 5.70662 13.1459 5.81481C13.2723 5.923 13.3434 6.06974 13.3434 6.22275V14.4553Z"
                fill="#838383"
              />
            </svg>
          }
          data={"234"}
        />
      </div>
      {comment && <MainComment />}
    </div>
  );
};

export default DiaryContainer;
