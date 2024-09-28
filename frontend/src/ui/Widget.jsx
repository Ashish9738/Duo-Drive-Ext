import Voice from "../components/Voice";
import Button from "../components/Button";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../utils/constant";
import Card from "../components/Card";
import Loader from "../components/Loader";

const Widget = () => {
  const [input, setInput] = useState("");
  const [loader, setLoader] = useState(false);
  const [history, setHistory] = useState([]);

  const endOfMessagesRef = useRef(null);

  const handleChat = async () => {
    const data = {
      prompt: input,
    };
    setLoader(true);
    try {
      const response = await axios.post(`${URL}/chat`, data);
      const newHistory = [...history, ...response.data.history];
      setHistory(newHistory);
      setInput("");
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.error("Failed to get the error", error);
    }
  };

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [history]);

  return (
    <div className="h-[300px] w-[500px] bg-black relative flex flex-col ">
      {/* Response Display */}
      <div className="flex-grow  p-2 overflow-y-scroll no-scrollbar">
        {history.map((entry, index) =>
          entry.parts.map((part, partIndex) => (
            <div
              key={`${index}-${partIndex}`}
              className={`flex ${
                entry.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <Card
                content={`${entry.role === "user" ? "User:" : "Gemini:"} ${
                  part.text
                }`}
              />
            </div>
          ))
        )}
        <div ref={endOfMessagesRef} />
      </div>

      {/* Bottom Portion [Input Area] */}
      <div className="flex justify-between items-center mt-2 mb-2 mx-4">
        <Voice />
        <input
          type="text"
          className="outline-none h-8 flex-grow rounded-tl-lg rounded-bl-lg ml-1 text-black text-sm font-mono px-3"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        {loader ? <Loader /> : <Button onClick={handleChat} />}
      </div>
    </div>
  );
};

export default Widget;
