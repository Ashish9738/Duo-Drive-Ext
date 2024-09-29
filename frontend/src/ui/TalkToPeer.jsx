import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import micImage from "../assets/mic.jpg";
import axios from "axios";
import { URL } from "../utils/constant";

const TalkToPeer = () => {
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
    crossBrowser: true,
    speechRecognitionProperties: {
      interimResults: true,
    },
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState(null);
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    if (results.length > 0) {
      setTranscript(results[results.length - 1].transcript);
    }
  }, [results]);

  const stopListening = () => {
    stopSpeechToText();
    sendCurrentSpeech();
  };

  const sendCurrentSpeech = () => {
    if (transcript.trim()) {
      generateResponse(transcript.trim());
    }
  };

  const generateResponse = async (text) => {
    setIsProcessing(true);
    setResponse(null);

    const data = { prompt: text };
    try {
      const res = await axios.post(`${URL}/chat`, data);
      console.log("Received response:", res.data);
      setResponse(res.data.response);
    } catch (error) {
      console.error("Failed to get the response", error);
      setResponse("Error getting response from server.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleToggleConversation = () => {
    if (isRecording) {
      stopListening();
    } else {
      setTranscript("");
      setResponse(null);
      startSpeechToText();
    }
  };

  if (error) {
    return <p>Web Speech API is not available in this browser: {error}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-black text-white">
      <div className="talk-container relative mt-2">
        <img
          src={micImage}
          alt="Microphone"
          className={`mic-icon ${
            isProcessing ? "h-[80px] w-[80px]" : "h-[54px] w-[54px]"
          } relative z-10`}
        />
        {isProcessing && (
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="loader"></div>
          </div>
        )}
      </div>

      <button
        onClick={handleToggleConversation}
        className="start-button mb-2"
        disabled={isProcessing}
      >
        {isRecording ? "Stop Listening" : "Start Conversation"}
      </button>

      <div className="w-full max-w-md p-4 bg-gray-600 rounded-lg mb-2">
        <p className="mb-1">Transcript:</p>
        <div className="h-[100px] overflow-y-auto bg-gray-500 p-2 rounded">
          {transcript}
          {interimResult && (
            <span className="text-gray-400"> {interimResult}</span>
          )}
        </div>
      </div>

      {response && (
        <div className="response-box w-full max-w-md p-4 bg-blue-600 rounded-lg mt-2">
          <p className="mb-1">Response:</p>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default TalkToPeer;
