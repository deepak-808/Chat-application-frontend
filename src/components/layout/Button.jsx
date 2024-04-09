import Proptype from 'prop-types';

const Button = (props) => {
  const { onClick, type, text, icon, className } = props;
  return (
    <div>
      <button className={`bg-blue-500 p-2 text-white w-24 rounded-xl text-center justify-center ${className ? className : ""}`} onClick={onClick} type={type}>
        {icon ? (<div className="btn_icon_container">{icon}</div>) : null}
        <span className='btn_text'>{text}</span>
      </button>
    </div>
  )
}

Button.defaultProps = {
  type: "submit",
  style: "",
};

Button.propTypes = {
  /** The click event handler */
  onClick: Proptype.func,
  /** The button type attribute */
  type: Proptype.oneOf(["submit", "reset", "button"]),
  /** Text to display inside of the button */
  text: Proptype.string.isRequired,
  /** An optional FontAwesome icon component to render in front of the text */
  icon: Proptype.element,
  /** Additional class names for styling */
  className: Proptype.string,
};

export default Button
