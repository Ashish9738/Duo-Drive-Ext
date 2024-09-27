const Button = ({ text }) => {
  return (
    <>
      <button className="border-none outline-none bg-gray-700 px-6 py-3 mt-5 rounded-md">
        {text}
      </button>
    </>
  );
};

export default Button;
