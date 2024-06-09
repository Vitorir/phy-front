const Button = ({ type, children, onClick, className, ...props }) => {
    return (
      <button
        className={`button ${className}`}
        type={type}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  