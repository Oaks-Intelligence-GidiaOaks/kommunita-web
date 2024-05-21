import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BgGroup from "../../assets/images/BgGroup.svg";
import Ellipse from "../../assets/images/Ellipse.svg";
import logo from "../../assets/images/new-logo.svg";
import { motion } from "framer-motion";
import { InputField, PasswordField } from "../../components/auth-form";
import { Form } from "react-final-form";
import validate from "validate.js";
import { LOGIN, FORGOT_PASSWORD } from "../../routes/routes";
import rtkMutation from "../../utils/rtkMutation";
import { showAlert } from "../../static/alert";
import { useUpdatePasswordMutation } from "../../service/user.service";
import { TbPasswordFingerprint } from "react-icons/tb";

const constraints = {
  code: {
    presence: true,
  },
  newPassword: {
    presence: true,
  },
  confirmPassword: {
    presence: true,
  },
};

const ResetPasswordPage = () => {
  const [eyeState, setEyeState] = useState(false);

  const toggleEye = (e) => {
    e.preventDefault();
    setEyeState((prev) => !prev);
  };

  const [Reset, { error, isSuccess }] = useUpdatePasswordMutation({
    provideTag: ["User"],
  });

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    console.log(values);
    await rtkMutation(Reset, values);
  };

  const validateForm = (values) => {
    return validate(values, constraints) || {};
  };

  useEffect(() => {
    if (isSuccess) {
      showAlert("Password changed Successfully!", "Pls Login", "success");
      navigate(LOGIN);
    } else if (error) {
      // console.log(error.message);
      showAlert("Oops", "Invalid Otp or Otp expired", "error");
    }
  }, [isSuccess, error, navigate]);

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
      </div>

      <div className="w-full h-screen lg:w-2/5 rounded-tl-[10%]  lg:rounded-tl-[20%]  mx-auto pt-20 px-8 lg:p-16 bg-white">
        <div className="flex justify-end">
          <img src={logo} alt="Logo" />
        </div>
        <div className="sm:mt-20 lg:mt-0 2xl:mt-40">
          <div className="pt-10">
            <h1 className="font-Inter mb-7 lg:py-0  text-primary-dark-green font-medium text-3xl">
              Reset Password
            </h1>
            <Form
              onSubmit={onSubmit}
              validate={validateForm}
              render={({ handleSubmit, form, submitting }) => (
                <form onSubmit={handleSubmit}>
                  <PasswordField
                    name="newPassword"
                    id="newPassword"
                    component="input"
                    eyeState={eyeState}
                    toggleEye={toggleEye}
                    label="New Password"
                    placeholder=" "
                  />
                  {form.getState().submitFailed &&
                    form.getState().errors.newPassword && (
                      <small className="text-red-600">
                        {form.getState().errors.newPassword}
                      </small>
                    )}

                  <PasswordField
                    name="confirmPassword"
                    id="confirmPassword"
                    component="input"
                    eyeState={eyeState}
                    toggleEye={toggleEye}
                    label="Confirm Password"
                    placeholder=" "
                  />
                  {form.getState().submitFailed &&
                    form.getState().errors.confirmPassword && (
                      <small className="text-red-600">
                        {form.getState().errors.confirmPassword}
                      </small>
                    )}

                  <InputField
                    id="code"
                    type="text"
                    name="code"
                    label="Enter Code"
                    component="input"
                    icon={TbPasswordFingerprint}
                    placeholder=" "
                  />
                  {form.getState().submitFailed &&
                    form.getState().errors.code && (
                      <small className="text-red-600">
                        {form.getState().errors.code}
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
                      "Change Password"
                    )}
                  </button>
                </form>
              )}
            />
          </div>

          <div className="mt-4 grid grid-cols-3 lg:gap-3 items-center w-full">
            <hr className="outline-gray-500" />
            <p className="text-center text-xs font-Montserrat text-gray-500 whitespace-nowrap">
              OR
            </p>
            <hr className="outline-gray-500" />
          </div>

          <div className="flex items-center justify-between mt-4">
            <button className="font-Inter font-medium text-base text-primary-gray flex gap-4">
              Go back to Login
              <Link to={LOGIN} className=" text-primary-red">
                Sign In
              </Link>
            </button>

            <button className="font-Inter font-medium flex gap-4 border p-3 bg-primary-dark-green text-white text-sm rounded-full">
              <Link to={FORGOT_PASSWORD} className="">
                Request code
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
