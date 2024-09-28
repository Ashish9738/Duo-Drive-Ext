import Voice from "../components/Voice";
import Button from "../components/Button";
import { useState } from "react";
import axios from "axios";
import { URL } from "../utils/constant";
import Card from "../components/Card";

const Widget = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);

  const handleChat = async () => {
    const data = {
      prompt: input,
    };
    try {
      const response = await axios.post(`${URL}/chat`, data);
      const newHistory = [...history, ...response.data.history];
      setHistory(newHistory);
      setInput("");
    } catch (error) {
      console.error("Failed to get the error", error);
    }
  };

  return (
    <div className="h-[300px] w-[500px] bg-black relative flex flex-col">
      {/* Response Display */}
      <div className="flex-grow overflow-y-auto p-2">
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
        <Button onClick={handleChat} />
      </div>
    </div>
  );
};

export default Widget;
