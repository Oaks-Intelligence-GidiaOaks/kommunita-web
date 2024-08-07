import { useState, useEffect } from "react";
import { GoPerson } from "react-icons/go";
import facebook from "../../assets/images/facebook.svg";
import goggle from "../../assets/images/goggle.svg";
import instagram from "../../assets/images/instagram.svg";
import linkedin from "../../assets/images/linkedin.svg";
import { AiOutlineMail } from "react-icons/ai";
// import BgGroup from "../../assets/images/BgGroup.svg";
// import Ellipse from "../../assets/images/Ellipse.svg";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  InputField,
  PasswordField,
  DropDownMenu
} from "../../components/auth-form";
import { Form, Field } from "react-final-form";
// import logo from "../../assets/images/new-logo.svg";
import rtkMutation from "../../utils/rtkMutation";
import { showAlert } from "../../static/alert";
import { useRegisterUserMutation } from "../../service/user.service";
import { INDEX, LOGIN } from "../../routes/routes";
import { logo, user_phone, world_2 } from "../../assets/images";

const RegisterPage = () => {
  const [org, setOrg] = useState("");

  async function fetchData() {
    try {
      // Make a GET request to the API
      const response = await fetch(
        "https://media-space-api-93ae1a0c4354.herokuapp.com/api/v1/user/organizations"
      );

      // Check if the response is OK (status code 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the response data as JSON
      const data = await response.json();

      // Log the data to the console
      console.log(data);
      setOrg(data?.data);
    } catch (error) {
      // Handle any errors that occur during the fetch
      console.error("Fetch error: ", error);
    }
  }

  useEffect(() => {
    fetchData();
    console.log("fetched");
  }, []);

  const [organization, setOrganization] = useState("");
  const orgId = organization?._id;

  const navigate = useNavigate();

  const [eyeState, setEyeState] = useState(false);

  const toggleEye = (e) => {
    e.preventDefault();
    setEyeState((prev) => !prev);
  };

  const validateForm = (values) => {
    const errors = {};

    // Validate presence
    if (!values.password) {
      errors.password = "Password is required";
    } else {
      // Validate length
      if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters long";
      }

      // Validate format
      const lowercase = /[a-z]/.test(values.password);
      const uppercase = /[A-Z]/.test(values.password);
      const number = /\d/.test(values.password);
      const specialChar = /[!@#$%^&*]/.test(values.password);

      if (!lowercase) {
        errors.password = "Password must contain at least one lowercase letter";
      } else if (!uppercase) {
        errors.password = "Password must contain at least one uppercase letter";
      } else if (!number) {
        errors.password = "Password must contain at least one number";
      } else if (!specialChar) {
        errors.password =
          "Password must contain at least one special character (!@#$%^&*)";
      }
    }

    // Validate confirm_password
    if (!values.confirm_password) {
      errors.confirm_password = "Please confirm your password";
    } else if (values.confirm_password !== values.password) {
      errors.confirm_password = "Passwords do not match";
    }

    // Other validations for display_name, email, username, and terms
    if (!values.display_name) {
      errors.display_name = "Display Name is required";
    }

    if (!values.username) {
      errors.username = "Username is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    }

    if (!values.terms) {
      errors.terms = "You must accept the terms of use";
    }

    return errors;
  };

  const [registerUser, { error, isSuccess }] = useRegisterUserMutation({
    provideTag: ["User"]
  });

  const onSubmit = async (values) => {
    try {
      const organizationId = orgId;

      const formData = {
        ...values,
        organization_id: organizationId
      };

      console.log(formData);
      // Submit the form data
      await rtkMutation(registerUser, formData);
    } catch (error) {
      showAlert("Oops", error.message || "An error occurred", "error");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      showAlert(
        "Welcome to Kommunita!",
        "Pls verify email to continue",
        "success"
      );
      navigate(LOGIN);
    } else if (error) {
      showAlert("Oops", error.data.message || "An error occurred", "error");
    }
  }, [error, isSuccess, navigate]);

  return (
    <div className="flex lg:h-screen bg-[]  flex-col lg:flex-row ">
      {/* <div className="w-full flex-1">
        <div className="relative">
          <div className="h-screen w-full flex justify-center items-center bg-[#001900] bg-no-repeat overflow-hidden relative">
            <motion.img
              initial={{ y: 200, opacity: 0, scale: 1 }}
              animate={{ y: 0, opacity: 1, scale: 1.1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              src={BgGroup}
              alt="Background"
              className="absolute bg-cover bottom-0  transform -translate-x-1/2 w-[60%]"
            />
          </div>

          <div className="absolute right-0 left-0 top-0 h-full w-full scale-100">
            <motion.img
              initial={{ y: -400, x: -400 }}
              animate={{ y: 0, x: 0 }}
              transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
              src={Ellipse}
              alt=""
              className="  w-[60%]"
            />
          </div>
        </div>
      </div> */}
      <div className="w-full flex-1">
        <div className="relative">
          <div className="h-screen w-full flex justify-center items-center bg-[#001900] bg-no-repeat overflow-hidden relative">
            <Link to={INDEX} className="flex" smooth={true}>
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
                  color: "transparent"
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
              className="absolute z-40 bg-cover bottom-0 left-1/2 transform -translate-x-1/2 w-[20rem]"
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
            <img src={world_2} alt="" className="mt-24 w- mx-auto   " />
          </div>
        </div>
      </div>
      <div className="w-full h-screen flex-1 rounded-tl-[10%]  lg:rounded-tl-[20%] mx-auto px-8 lg:p-16 bg-white overflow-y-scroll scrollbar-thin bar  scrollbar-thumb-[#AEAEAE] scrollbar-track-gray-200">
        {/* <div className="flex justify-end">
          <img src={logo} alt="Logo" />
        </div> */}
        <div className="mx-auto w-[80%] lg:mt-10 2xl:mt-40">
          <div className="">
            <div className="flex justify-center items-center mb-10">
              <div className="flex font-[500] mx-auto text-xs items-center">
                <p className=" bg-[#F7F7F8] text-sm w-[8.8rem] text-center rounded-lg text-[#757682]">
                  Built for you
                </p>
                <p className="text-[#3D7100]">Change</p>
              </div>
            </div>
            <Form
              onSubmit={onSubmit}
              validate={validateForm}
              render={({ handleSubmit, form, submitting }) => (
                <form onSubmit={handleSubmit}>
                  <h1 className="font-Inter mb-7 flex justify-center items-center lg:py-0 text-primary-dark-green font-bold text-3xl">
                    Create Account
                  </h1>

                  <DropDownMenu
                    options={org || ""}
                    onSelect={(option) => setOrganization(option)}
                    displayText="Select Organization"
                  />

                  <InputField
                    id="display_name"
                    type="text"
                    name="display_name"
                    label="Display Name"
                    component="input"
                    icon={GoPerson}
                    placeholder=" "
                  />
                  {form.getState().submitFailed &&
                    form.getState().errors.display_name && (
                      <small className="text-red-600">
                        {form.getState().errors.display_name}
                      </small>
                    )}
                  <InputField
                    id="username"
                    type="text"
                    name="username"
                    label="Username"
                    component="input"
                    icon={GoPerson}
                    placeholder=" "
                  />
                  {form.getState().submitFailed &&
                    form.getState().errors.username && (
                      <small className="text-red-600">
                        {form.getState().errors.username}
                      </small>
                    )}
                  <InputField
                    id="email"
                    type="email"
                    name="email"
                    label="Email"
                    component="input"
                    icon={AiOutlineMail}
                    placeholder=" "
                  />
                  {form.getState().submitFailed &&
                    form.getState().errors.email && (
                      <small className="text-red-600">
                        {form.getState().errors.email}
                      </small>
                    )}

                  <PasswordField
                    name="password"
                    id="password"
                    component="input"
                    eyeState={eyeState}
                    toggleEye={toggleEye}
                    placeholder=" "
                    label="Password"
                  />
                  {form.getState().submitFailed &&
                    form.getState().errors.password && (
                      <small className="text-red-600">
                        {form.getState().errors.password}
                      </small>
                    )}
                  <PasswordField
                    name="confirm_password"
                    id="confirm_password"
                    component="input"
                    eyeState={eyeState}
                    toggleEye={toggleEye}
                    placeholder=" "
                    label="Re-enter Password"
                  />
                  {form.getState().submitFailed &&
                    form.getState().errors.confirm_password && (
                      <small className="text-red-600">
                        {form.getState().errors.confirm_password}
                      </small>
                    )}

                  <div className="flex items-center mt-4 gap-2">
                    <div>
                      <Field
                        type="checkbox"
                        name="terms"
                        component="input"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-[#FF3A29] d dark:focus:ring-blue-600"
                      />
                    </div>
                    <span className="text-xs font-Inter font-normal pt-1">
                      I accept the{" "}
                      <span className=" text-[#3D7100]">terms of use</span> and{" "}
                      <span className=" text-[#3D7100]">privacy policy</span>
                    </span>
                  </div>
                  {form.getState().errors.terms && (
                    <small className="text-red-600">
                      {form.getState().errors.terms}
                    </small>
                  )}

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
                      "Sign Up"
                    )}
                  </button>
                </form>
              )}
            />
          </div>

          <div className="mt-4 grid grid-cols-3 lg:gap-3 items-center w-full">
            <hr className="outline-gray-500" />
            <p className="text-center text-sm font-Montserrat text-gray-500 whitespace-nowrap">
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
            <div className="p-2 border border-gray-500 w-10 h-10 flex justify-center items-center rounded-full">
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
            </div>
          </div>

          <div className="flex items-center justify-center mt-4">
            <button className="font-Inter font-medium text-base text-primary-gray ">
              Already have an account?{" "}
              <Link to="/login" className=" text-[#3D7100]">
                Log In
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
