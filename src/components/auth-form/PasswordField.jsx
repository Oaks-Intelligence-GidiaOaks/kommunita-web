import { BsEye, BsEyeSlash } from "react-icons/bs";
import PropTypes from "prop-types";
import { Field } from "react-final-form";

const PasswordField = ({
  id,
  eyeState,
  toggleEye,
  placeholder,
  label,
  name,
  component,
}) => {
  return (
    <div className="relative mb-4 lg:mb-0 2xl:mt-6 lg:mt-4 z-0">
      <Field
        id={id}
        type={eyeState ? "text" : "password"}
        name={name}
        component={component}
        className="block px-2 w-full placeholder:text-sm placeholder:font-Inter placeholder:text-primary-light-gray py-3 bg-transparent border-0 border-b border-black appearance-none focus:border-b-primary-dark-green focus:outline-none focus:ring-0 peer"
        placeholder={placeholder}
      />
      <label
        htmlFor={id}
        className={`px-2 absolute text-primary-light-gray bg-transparent duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-dark-green peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8`}
      >
        {label}
      </label>
      <div
        className="text-primary-gray absolute top-4 right-2 hover:cursor-pointer"
        onClick={toggleEye}
      >
        {eyeState ? <BsEye size={20} /> : <BsEyeSlash size={20} />}
      </div>
    </div>
  );
};

PasswordField.propTypes = {
  id: PropTypes.string.isRequired,
  eyeState: PropTypes.bool.isRequired,
  toggleEye: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  component: PropTypes.elementType.isRequired,
};

export default PasswordField;
