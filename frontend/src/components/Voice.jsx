import { MdKeyboardVoice } from "react-icons/md";

const Voice = ({ onClick }) => {
  return (
    <>
      <MdKeyboardVoice
        className="bg-gray-400 rounded-full h-8 w-8 p-1 cursor-pointer"
        size={18}
        onClick={onClick}
      />
    </>
  );
};

export default Voice;
