import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import './Input.scss'
const Input = (props) => {
  const { title, type, icon, inputType, passwordIcon, rightIcons, onClick, className, ...otherProps } = props;
  const [showPassword, setShowPassword] = useState(true);

  const passwordToggle = () => {
    setShowPassword(!showPassword)
  }
  
  const PasswordView = showPassword ? <FaRegEye /> : <FaRegEyeSlash />;
  const PasswordIcon = () => (
    <span className="input-icon cursor-pointer" onClick={passwordToggle}>
      {PasswordView}
    </span>
  )
  const renderRightIcons = () => {
    if (!rightIcons || rightIcons.length === 0) return null;
    
    return rightIcons.map((RightIcon, index) => (
      <span key={index}
        className={`input-icon ${RightIcon.onClick ? 'cursor-pointer': ""} `}
        onClick={RightIcon.onClick}>
        <RightIcon.Icon />
      </span>
    ));
  };
  
  return (
    <div className={className}>
      <label htmlFor="username" className='text-sm'>{title}</label>
      <div className={`input-container ${inputType === 'underline' ? 'underline rounded-lg' : 'border rounded-lg' } p-2 bg-white`}>
        {icon && <span className="flex items-center">{icon}</span>}
        {passwordIcon &&  <input {...otherProps} type={passwordIcon && showPassword ? 'password' : 'text'} className='input-field'/>}
        {!passwordIcon && <input {...otherProps} type={type ? type : 'text'} className='input-field'/>}
        {passwordIcon ? <PasswordIcon /> : renderRightIcons()}
      </div>
    </div>
  )
}

export default Input