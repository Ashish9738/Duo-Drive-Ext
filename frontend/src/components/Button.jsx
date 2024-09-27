const Button = ({ text }) => {
  return (
    <>
      <button className="border-none outline-none bg-gray-400 px-4 py-1 mt-5 rounded-md text-black cursor-pointer">
        {text}
      </button>
    </>
  );
};

export default Button;
