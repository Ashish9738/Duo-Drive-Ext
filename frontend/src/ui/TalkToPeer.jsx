import React, { useState, useCallback, useEffect } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import micImage from "../assets/mic.jpg";
import axios from "axios";
import { URL } from "../utils/constant";
import Loader from "../components/Loader";

const TalkToPeer = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [persistentTranscript, setPersistentTranscript] = useState("");

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

  useEffect(() => {
    if (interimResult) {
      setTranscript(interimResult);
    }
  }, [interimResult]);

  useEffect(() => {
    if (results.length > 0 && results[results.length - 1].isFinal) {
      setPersistentTranscript(
        (prev) => prev + " " + results[results.length - 1].transcript
      );
    }
  }, [results]);

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
      stopSpeechToText();
      const fullTranscript = persistentTranscript + " " + transcript;
      setPersistentTranscript(fullTranscript.trim());
      setTranscript("");
      generateResponse(fullTranscript.trim());
    } else {
      setPersistentTranscript("");
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
          className="mic-icon h-[54px] w-[54px] relative z-10"
        />
      </div>

      <div className="relative mb-2 h-10 flex items-center justify-center">
        {isProcessing ? (
          <Loader />
        ) : (
          <div
            onClick={handleToggleConversation}
            className="start-text px-4 py-2 text-white cursor-pointer select-none"
          >
            {isRecording ? "Stop Listening" : "Start Conversation"}
          </div>
        )}
      </div>

      <div className="w-full max-w-md p-4 bg-gray-600 rounded-lg mb-2">
        <p className="mb-1">Transcript:</p>
        <div className="h-[100px] overflow-y-auto bg-gray-500 p-2 rounded">
          {persistentTranscript}
          {transcript && <span className="text-gray-400"> {transcript}</span>}
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
