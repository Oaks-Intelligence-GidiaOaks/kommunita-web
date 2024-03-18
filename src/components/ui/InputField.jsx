import PropTypes from "prop-types";
import { Field } from "react-final-form";

const InputField = ({
  id,
  type,
  name,
  label,
  icon: Icon,
  placeholder,
  component,
  readOnly,
}) => {
  return (
    <div className="relative mb-4 lg:mb-0 2xl:mt-6 lg:mt-4 z-0">
      <Field
        id={id}
        type={type}
        name={name}
        component={component}
        className="block px-2 w-full placeholder:text-sm placeholder:font-Inter placeholder:text-primary-light-gray py-3 bg-transparent border-0 border-b border-black appearance-none focus:border-b-primary-dark-green focus:outline-none focus:ring-0 peer"
        placeholder={placeholder}
        {...(readOnly && { readOnly: true })}
      />
      <label
        htmlFor={id}
        className={`px-2 absolute text-primary-light-gray bg-transparent duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-dark-green peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8`}
      >
        {label}
      </label>

      {Icon && (
        <Icon color="" className="text-primary-gray absolute top-4 right-2" />
      )}
    </div>
  );
};

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  placeholder: PropTypes.string.isRequired,
  component: PropTypes.elementType.isRequired,
  readOnly: PropTypes.bool,
};

export default InputField;
