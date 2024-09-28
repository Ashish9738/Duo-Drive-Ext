import React from "react";
import useSpeechToText from "react-hook-speech-to-text";
import micImage from "../assets/mic.jpg";

const TalkToPeer = () => {
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    resetTranscript,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  if (error)
    return (
      <p className="error-message">
        Web Speech API is not available in this browser 🤷‍
      </p>
    );

  const handleListen = () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-black text-white">
      <div className="talk-container relative mb-4">
        <img
          src={micImage}
          alt="Microphone"
          className="mic-icon h-20 w-20 cursor-pointer relative z-10"
          onClick={handleListen}
        />
      </div>
      <p className="mb-2">
        {isRecording ? "Listening..." : "Click the mic to start speaking"}
      </p>
      <div className="transcript-container w-full max-w-md p-4 bg-gray-800 rounded-lg">
        <p className="mb-2">Transcript:</p>
        <ul className="min-h-[100px] bg-gray-700 p-2 rounded">
          {results.map((result) => (
            <li key={result.timestamp}>{result.transcript}</li>
          ))}
          {interimResult && <li className="interim-result">{interimResult}</li>}
        </ul>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={resetTranscript}
      >
        Reset
      </button>
    </div>
  );
};

export default TalkToPeer;
