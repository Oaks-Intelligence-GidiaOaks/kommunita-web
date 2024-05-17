import { useState, useEffect } from "react";
import { GoPerson } from "react-icons/go";
import facebook from "../../assets/images/facebook.svg";
import goggle from "../../assets/images/goggle.svg";
import instagram from "../../assets/images/instagram.svg";
import linkedin from "../../assets/images/linkedin.svg";
import { AiOutlineMail } from "react-icons/ai";
import BgGroup from "../../assets/images/BgGroup.svg";
import Ellipse from "../../assets/images/Ellipse.svg";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  InputField,
  PasswordField,
  DropDownMenu,
} from "../../components/auth-form";
import { Form, Field } from "react-final-form";
import validate from "validate.js";
import logo from "../../assets/images/logo.svg";
import rtkMutation from "../../utils/rtkMutation";
import { showAlert } from "../../static/alert";
import {
  useRegisterUserMutation,
  useGetOrganizationQuery,
} from "../../service/user.service";
import { LOGIN } from "../../routes/routes";

const constraints = {
  display_name: {
    presence: true,
  },
  email: {
    presence: true,
  },
  username: {
    presence: true,
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
    },
  },
  confirm_password: {
    presence: true,
    equality: "password",
  },
  terms: {
    presence: {
      message: "must be accepted",
    },
    inclusion: {
      within: [true],
      message: "^must be accepted",
    },
  },
};

const RegisterPage = () => {
  const { data } = useGetOrganizationQuery();
  const orgData = data?.data;
  // console.log(orgData);

  const [org, setOrg] = useState("");

  useEffect(() => {
    setOrg(orgData);
    console.log(orgData, "just fetched!");
  }, [orgData]);

  const [organization, setOrganization] = useState("");
  const orgId = organization?._id;

  const navigate = useNavigate();

  const [eyeState, setEyeState] = useState(false);

  const toggleEye = (e) => {
    e.preventDefault();
    setEyeState((prev) => !prev);
  };

  const validateForm = (values) => {
    return validate(values, constraints) || {};
  };

  const [registerUser, { error, isSuccess }] = useRegisterUserMutation({
    provideTag: ["User"],
  });

  const onSubmit = async (values) => {
    try {
      const organizationId = orgId;

      const formData = {
        ...values,
        organization_id: organizationId,
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
        "Account created successfully!",
        "Welcome to Kommunita",
        "success"
      );
      navigate(LOGIN);
    } else if (error) {
      showAlert("Oops", error.data.message || "An error occurred", "error");
    }
  }, [error, isSuccess, navigate]);

  return (
    <div className="flex lg:h-screen bg-[#001900]  flex-col lg:flex-row ">
      <div className="w-full lg:w-3/5">
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
      </div>
      <div className="w-full h-screen lg:w-2/5 rounded-tl-[10%]  lg:rounded-tl-[20%] mx-auto px-8 lg:p-16 bg-white overflow-y-scroll scrollbar-thin bar  scrollbar-thumb-[#AEAEAE] scrollbar-track-gray-200">
        <div className="flex justify-end">
          <img src={logo} alt="Logo" />
        </div>
        <div className="2xl:mt-12">
          <div className="">
            <Form
              onSubmit={onSubmit}
              validate={validateForm}
              render={({ handleSubmit, form, submitting }) => (
                <form onSubmit={handleSubmit}>
                  <h1 className="font-Inter mb-7 lg:py-0 text-primary-dark-green font-medium text-3xl">
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
                      <span className=" text-primary-red">terms of use</span>{" "}
                      and{" "}
                      <span className=" text-primary-red">privacy policy</span>
                    </span>
                  </div>
                  {form.getState().errors.terms && (
                    <small className="text-red-600">
                      {form.getState().errors.terms}
                    </small>
                  )}

                  <button
                    type="submit"
                    className="w-full mt-4 font-Montserrat font-bold py-2 px-8 mb-4 rounded-full bg-primary-dark-green text-white hover:opacity-85"
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
              <Link to="/login" className=" text-primary-red">
                Sign In
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
