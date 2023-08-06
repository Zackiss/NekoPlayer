import React from "react";
import { useState, useEffect } from "react";


const AudioControls = ({
  isPlaying,
  onPlayPauseClick,
  onPrevClick,
  onNextClick,
  swapBackAlbum
}) => {
  const [pressed, setPressed] = useState(false);
  const [showButtonBack, setButtonBack] = useState(false);
  const [startShown, setStartShown] = useState(false);

  const mouseDown = (press) => {
    setPressed(press);
    setStartShown(press);
  }
  
  const mouseUp = (press) => {
    setPressed(press);
    setStartShown(press);
  }

  //handleLongPress
  useEffect(() => {
    const timer = pressed
      ? setTimeout(() => {
          console.log(pressed, "got pressed!");
          swapBackAlbum();
        }, 2150)
      : null;
    return () => {
      setButtonBack(false);
      clearTimeout(timer);
    }
  }, [pressed]);

  useEffect(() => {
    const timer_ = startShown
      ? setTimeout(() => {
          setButtonBack(startShown);
          console.log(startShown, "got shown!");
        }, 600)
      : null;
    return () => clearTimeout(timer_);
  }, [pressed]);

  return (
    <div className="audio-controls">
    <button
      type="button"
      className="prev"
      aria-label="Previous"
      onClick={onPrevClick}
    >
    </button>
    {isPlaying ? (
      <button
        type="button"
        className="pause"
        onClick={() => onPlayPauseClick(false)}
        aria-label="Pause"
      >
        <div className="sonar-wrapper">
          <div className="sonar-emitter">
            <div className="sonar-wave">
            </div>
          </div>
        </div>
      </button>
    ) : (
      <button
        type="button"
        className="play"
        onClick={() => onPlayPauseClick(true)}
        onMouseDown={() => mouseDown(true)}
        onMouseUp={() => mouseUp(false)}
        aria-label="Play"
      >
        <div 
          className={showButtonBack ? "button-back" : "hidden"}
        >
        </div> 
      </button>
    )}
    <button
      type="button"
      className="next"
      aria-label="Next"
      onClick={onNextClick}
    >
    </button>
  </div>
  )
}

export default AudioControls;
