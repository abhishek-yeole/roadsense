import React, { useState, useEffect, useMemo } from "react";

const Voice = () => {
  const [voices, setVoices] = useState([]);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(0);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [text, setText] = useState("");
 
  const speech = useMemo(() => {
    const synth = new SpeechSynthesisUtterance();
    synth.lang = "en";
    return synth;
  }, []);
  speech.lang = "en";
  speech.rate = rate;
  speech.volume = volume;
  speech.pitch = pitch;
  speech.voice = voices[selectedVoiceIndex];

  useEffect(() => {
    speechSynthesis.onvoiceschanged = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
      speech.voice = availableVoices[selectedVoiceIndex];
    };
  }, [selectedVoiceIndex, speech]);

  const handleVoiceChange = (event) => {
    const newIndex = event.target.value;
    setSelectedVoiceIndex(newIndex);
    speech.voice = voices[newIndex];
  };

  const handleStart = () => {
    speech.text = text;
    window.speechSynthesis.speak(speech);
  };

  const handlePause = () => {
    window.speechSynthesis.pause();
  };

  const handleResume = () => {
    window.speechSynthesis.resume();
  };

  const handleCancel = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <div className="container mt-5 bg-dark">
      <h1 className="text-light">Text to Speech</h1>
      <p className="lead text-light mt-4">Select Voice</p>
      <select
        id="voices"
        className="form-select bg-secondary text-light"
        onChange={handleVoiceChange}
        value={selectedVoiceIndex}
      >
        {voices.map((voice, index) => (
          <option key={index} value={index}>
            {voice.name}
          </option>
        ))}
      </select>
      <div className="d-flex mt-4 text-light">
        <div>
            <p className="lead">Volume</p>
            <input
            type="range"
            min="0"
            max="1"
            value={volume}
            step="0.1"
            id="volume"
            onChange={(e) => setVolume(e.target.value)}
            />
            <span id="volume-label" className="ms-2">{volume}</span>
        </div>
        <div className="mx-5">
            <p className="lead">Rate</p>
            <input
            type="range"
            min="0.1"
            max="10"
            value={rate}
            id="rate"
            step="0.1"
            onChange={(e) => setRate(e.target.value)}
            />
            <span id="rate-label" className="ms-2">{rate}</span>
        </div>
        <div>
            <p className="lead">Pitch</p>
            <input
            type="range"
            min="0"
            max="2"
            value={pitch}
            step="0.1"
            id="pitch"
            onChange={(e) => setPitch(e.target.value)}
            />
            <span id="pitch-label" className="ms-2">{pitch}</span>
        </div>
        </div>
      <textarea
        className="form-control bg-dark text-light mt-5"
        cols="30"
        rows="10"
        placeholder="Type here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <div className="mb-5">
        <button className="btn btn-success mt-5 me-3" onClick={handleStart}>
          Start
        </button>
        <button className="btn btn-warning mt-5 me-3" onClick={handlePause}>
          Pause
        </button>
        <button className="btn btn-info mt-5 me-3" onClick={handleResume}>
          Resume
        </button>
        <button className="btn btn-danger mt-5 me-3" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Voice;
