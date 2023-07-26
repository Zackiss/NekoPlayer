import React, { useState, useEffect } from 'react';
import tracks from "./tracks";
import AudioPlayer from "./AudioPlayer";
import Splash from './Splash';
import SearchBar from './SearchBar';

function App() {
  const [loading, setLoading] = useState(true);
  const [trackIndex, setTrackIndex] = useState(0);
  const [showSide, setShowSide] = useState(false);

  const handleTrackIndex = (num) => {
    setTrackIndex(num);
  }

  const handleShowSide = (show) => {
    setShowSide(show)
  }

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setLoading(false);
      document.addEventListener('click', handleClickOutside);
    }, 2000);
  }, []);

  const handleClickOutside = (event) => {
    if (!event.target.closest('body')) {
      // Do something when clicking outside of the body element
      handleShowSide(!showSide)
    }
  }
  
  return (
    <div className="App">
      {loading ? <Splash /> : (
        <>
          <SearchBar tracks={tracks} trackIndex={trackIndex} showSide={showSide} onIndexChange={handleTrackIndex}/>
          <AudioPlayer tracks={tracks} trackIndex={trackIndex} onIndexChange={handleTrackIndex}/>
        </>
      )
      }
    </div>
  );
}

export default App;