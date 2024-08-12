function Button({ onClick, children, className }) {
    return (
      <button
        onClick={onClick}
        className={`bg-blue-600 text-white py-2 px-4 rounded shadow hover:bg-blue-700 ${className}`}
      >
        {children}
      </button>
    );
  }
  
  export default Button;
  