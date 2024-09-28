import { useState, useEffect, useRef } from "react";
const Card = ({ content }) => {
  const [height, setHeight] = useState("auto");
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      setHeight(`${cardRef.current.scrollHeight}px`);
    }
  }, [content]);

  return (
    <>
      <div
        className="bg-gray-400 max-w-[275px] font-semibold text-sm rounded-md overflow-hidden px-5 py-5 break-all text-black mb-2"
        ref={cardRef}
        style={{ height }}
      >
        {content}
      </div>
    </>
  );
};

export default Card;
