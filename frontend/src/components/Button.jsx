import { AiOutlineSend } from "react-icons/ai";

const Button = ({ onClick }) => {
  return (
    <>
      <button
        className="border-none outline-none bg-gray-400 px-4 py-[6px] rounded-tr-lg rounded-br-lg text-black cursor-pointer"
        onClick={onClick}
      >
        {" "}
        <AiOutlineSend size={20} />
      </button>
    </>
  );
};

export default Button;
