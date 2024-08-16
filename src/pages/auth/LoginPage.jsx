import { useState, useEffect } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import facebook from "../../assets/images/facebook.svg";
import goggle from "../../assets/images/goggle.svg";
import instagram from "../../assets/images/instagram.svg";
import linkedin from "../../assets/images/linkedin.svg";
import BgGroup from "../../assets/images/BgGroup.svg";
import Ellipse from "../../assets/images/Ellipse.svg";
// import logo from "../../assets/images/new-logo.svg";
import { motion } from "framer-motion";
import { InputField, PasswordField } from "../../components/auth-form";
import { Form } from "react-final-form";
import validate from "validate.js";
import { REGISTER, INDEX, FORGOT_PASSWORD, LOGIN } from "../../routes/routes";
import rtkMutation from "../../utils/rtkMutation";
import { showAlert } from "../../static/alert";
import { useLoginUserMutation } from "../../service/user.service";
import { logo, user_phone, world_2 } from "../../assets/images";

const constraints = {
  identifier: {
    presence: true,
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
    },
  },
};

const LoginPage = () => {
  const [eyeState, setEyeState] = useState(false);

  const toggleEye = (e) => {
    e.preventDefault();
    setEyeState((prev) => !prev);
  };

  const [loginUser, { error, isSuccess }] = useLoginUserMutation({
    provideTag: ["User"],
  });

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    // console.log(values);
    await rtkMutation(loginUser, values);
  };

  const validateForm = (values) => {
    return validate(values, constraints) || {};
  };

  useEffect(() => {
    if (isSuccess) {
      showAlert("", "Login Successful!", "success");
      navigate(INDEX);
    } else if (error) {
      navigate(LOGIN);
      showAlert("Oops", error?.data?.message || "An error occurred", "error");
    }
  }, [isSuccess, error, navigate]);

  return (
    <div className="flex lg:h-screen bg-[]  flex-col lg:flex-row ">
      {/* <div className="w-full ">
        <div className="relative">
          <div className="h-screen w-full flex justify-center items-center bg-[#001900] bg-no-repeat overflow-hidden relative">
            <motion.img
              initial={{ y: 200, opacity: 0, scale: 1 }}
              animate={{ y: 0, opacity: 1, scale: 1.1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              src={BgGroup}
              alt="Background"
              className="absolute bottom-0 transform -translate-x-1/2 w-[60%]"
            />
          </div>

          <div className="absolute right-0 left-0 top-0 h-full w-full scale-100">
            <motion.img
              initial={{ y: -400, x: -400 }}
              animate={{ y: 0, x: 0 }}
              transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
              src={Ellipse}
              alt=""
              className=" w-[60%]"
            />
          </div>
        </div>
      </div> */}

      <div className="w-full flex-1">
        <div className="relative">
          <div className="lg:hidden bg-[#001900] h-20">
            <img
              className="lg:hidden absolute top-0 left-10 transform text-white mt-5"
              style={{
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
              src={logo}
            />
          </div>
          <div className="h-0 lg:h-screen w-full flex justify-center items-center bg-[#001900] bg-no-repeat overflow-hidden relative">
            <Link to={INDEX} className="flex">
              {/* <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1, ease: "easeIn" }}
                className="absolute top-0 left-10 transform  text-white  mt-5"
                // className="absolute text-center font-Inter top-0 left-1/2 transform -translate-x-1/2 text-white text-3xl  mt-10"
                style={{
                  // backgroundImage:
                  //   "linear-gradient(90deg, #6E9D37 0%, #74A12D 52%, #97B24C 99.99%, #94B04A 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
                src={logo}
              /> */}
              <img
                className="absolute top-0 left-10 transform  text-white  mt-5"
                style={{
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
                src={logo}
              />

              {/* <img src={images.logo} alt="logo" /> */}
            </Link>
            {/* <motion.img
              initial={{ y: 200, opacity: 0, scale: 1 }}
              animate={{ y: 0, opacity: 1, scale: 1.1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              // src={BgGroup}
              src={user_phone}
              alt="Background"
              className="absolute z-40 bg-cover bottom-0  transform -translate-x-1/2 w-[20rem]"
            /> */}
            <img
              src={user_phone}
              alt="Background"
              className="hidden lg:block absolute z-40 bg-cover bottom-0 left-1/2 transform -translate-x-1/2 w-[20rem]"
            />
          </div>

          <div className="absolute right-0 left-0 top-0 h-full w-full scale-100">
            {/* <motion.img
              // initial={{ y: -400, x: -400 }}
              // animate={{ y: 0, x: 0 }}
              // transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 3, ease: "easeOut" }}
              src={world_2}
              alt=""
              className="mt-24 w- mx-auto   "
            /> */}
            <img
              transition={{ duration: 3, ease: "easeOut" }}
              src={world_2}
              alt=""
              className="hidden lg:block mt-24 w- mx-auto   "
            />
          </div>
        </div>
      </div>

      <div className="w-full h-screen flex-1 flex flex-col justify-center items-center rounded-tl-[10%]  lg:rounded-tl-[20%]  mx-auto pt-20 px-8 lg:p-16 bg-white">
        {/* <div className="w-full h-screen rounded-tl-[10%]  lg:rounded-tl-[20%]  mx-auto pt-20 px-8 lg:p-16 bg-white"> */}
        {/* <div className="flex justify-end">
          <img src={logo} alt="Logo" />
        </div> */}
        <div className="sm:mt-20 lg:mt-0 2xl:mt-40 mx-auto w-[80%]">
          <div className="">
            <h1 className="font-Inter mb-7 lg:py-0 mx-auto flex justify-center items-center  text-primary-dark-green font-bold text-3xl">
              Hello, Welcome Back
            </h1>
            <Form
              onSubmit={onSubmit}
              validate={validateForm}
              render={({ handleSubmit, form, submitting }) => (
                <form onSubmit={handleSubmit}>
                  <InputField
                    id="identifier"
                    type="text"
                    name="identifier"
                    label="Email or Username"
                    component="input"
                    icon={AiOutlineMail}
                    placeholder=" "
                  />
                  {form.getState().submitFailed &&
                    form.getState().errors.identifier && (
                      <small className="text-red-600">
                        {form.getState().errors.identifier}
                      </small>
                    )}
                  <PasswordField
                    name="password"
                    id="password"
                    component="input"
                    eyeState={eyeState}
                    toggleEye={toggleEye}
                    label="Password"
                    placeholder=" "
                  />
                  {form.getState().submitFailed &&
                    form.getState().errors.password && (
                      <small className="text-red-600">
                        {form.getState().errors.password}
                      </small>
                    )}
                  <div className="flex justify-between mt-4 items-center">
                    <div className="flex items-center gap-2">
                      <div>
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          className="text-[#FF3A29]"
                        />
                        <label htmlFor="Remember Me"></label>
                      </div>
                      <span className="text-xs font-Inter font-light ">
                        Keep me sign in
                      </span>
                    </div>

                    <span className="text-xs font-Inter font-light text-primary-red hover:underline">
                      <Link to={FORGOT_PASSWORD}>forgot password?</Link>
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 font-Montserrat font-bold py-2 px-8 mb-4 bg-primary-dark-green text-white hover:opacity-85"
                  >
                    {submitting ? (
                      <>
                        <span className="loading-dots">
                          <span className="loading-dots-dot"></span>
                          <span className="loading-dots-dot"></span>
                          <span className="loading-dots-dot"></span>
                        </span>
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>
              )}
            />
          </div>

          <div className="mt-4 grid grid-cols-3 lg:gap-3 items-center w-full">
            <hr className="outline-gray-500" />
            <p className="text-center text-xs font-Montserrat text-gray-500 whitespace-nowrap">
              Or Sign Up With{" "}
            </p>
            <hr className="outline-gray-500" />
          </div>

          <div className="flex items-center justify-center w-full mt-4 gap-5">
            <div className="p-2 border border-gray-500 w-10 h-10 flex justify-center items-center rounded-full">
              <img
                src={goggle}
                alt=""
                className="bg-cover hover:cursor-pointer"
              />
            </div>
            <div className="p-2 border border-gray-500 w-10 h-10 flex justify-center items-center rounded-full">
              <img
                src={facebook}
                alt=""
                className="bg-cover hover:cursor-pointer"
              />
            </div>
            {/* <div className="p-2 border border-gray-500 w-10 h-10 flex justify-center items-center rounded-full">
              <img
                src={instagram}
                alt=""
                className="bg-cover hover:cursor-pointer"
              />
            </div>
            <div className="p-2 border border-gray-500 w-10 h-10 flex justify-center items-center rounded-full">
              <img
                src={linkedin}
                alt=""
                className="bg-cover hover:cursor-pointer"
              />
            </div> */}
          </div>

          <div className="flex items-center justify-center mt-4">
            <button className="font-Inter font-medium text-base text-primary-gray ">
              Don’t have an account?
              <Link to={REGISTER} className=" text-[#3D7100]">
                Register Here
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
