import PropTypes from 'prop-types';
import React from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
const Input = (props) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { title, type, icon, inputType, passwordicon, rightIcons, className, height, onClick, size, ...otherProps } = props;

  const passwordToggle = () => {
    setShowPassword(!showPassword)
  }

  const PasswordView = showPassword ? <FaRegEye /> : <FaRegEyeSlash />;
  const PasswordIcon = () => (
    <span className="mx-2 cursor-pointer" onClick={passwordToggle}>
      {PasswordView}
    </span>
  )
  const renderRightIcons = () => {
    if (!rightIcons || rightIcons.length === 0) return null;
    
    return rightIcons.map((RightIcon, index) => (
      <span key={index}
        className={`mx-2 ${RightIcon.onClick ? 'cursor-pointer': ""} `}
        onClick={RightIcon.onClick}>
        <RightIcon.Icon />
      </span>
    ));
  };
  return (
        <div className={className}>
      <label htmlFor="username" className='flex text-sm'>{title}</label>
      <div className={`flex items-center ${inputType === 'underline' ? 'underline rounded-lg' : 'border rounded-lg' } ${height ? 'h-'+height : ''} p-2 bg-white`}>
        {icon && <span onClick={onClick} className={`flex items-center px-2 ${onClick ? 'cursor-pointer': ''}`}>{icon}</span>}
        {passwordicon &&  <input {...otherProps} type={passwordicon && !showPassword ? 'password' : 'text'} className={`flex-1 outline-none border-none ${size ? 'text-'+size : ''}`}/>}
        {!passwordicon && <input {...otherProps} type={type ? type : 'text'} className={`flex-1 outline-none border-none ${size ? 'text-'+size : ''}`}/>}
        {passwordicon ? <PasswordIcon /> : renderRightIcons()}
      </div>
    </div>
  )
}
Input.defaultProps = {
  type: "text",
};
Input.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.node,
  inputType: PropTypes.string,
  passwordicon: PropTypes.bool,
  rightIcons: PropTypes.arrayOf(PropTypes.node),
  onClick: PropTypes.func,
  className: PropTypes.string,
  height: PropTypes.number,
  size: PropTypes.oneOf(['xm', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl',  '8xl', '9xl']),
};

export default Input;