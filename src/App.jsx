import React, { useState, useEffect } from 'react';
import albums from "./tracks";
import AudioPlayer from "./AudioPlayer";
import Splash from './Splash';
import SearchBar from './SearchBar';
import ScrollAlbum from './ScrollAlbum'


function App() {
  const [loading, setLoading] = useState(true);
  const [albumPage, setAlbumPage] = useState(true);
  const [albumIndex, setAlbumIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const [showSide, setShowSide] = useState(false);
  const [tracks, setTracks] = useState(albums[0].tracks)

  const handleTrackIndex = (num) => {
    setTrackIndex(num);
  }

  const handleShowSide = (show) => {
    setShowSide(!show)
  }

  const handleSwapToAlbum = (albumIndex) => {
    setTracks(albums[albumIndex - 1].tracks)
    setAlbumPage(false)
  }

  const handleSwapBackAlbum = () => {
    setAlbumPage(true)
  }

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  
  return (
    <div className="App">
      {loading ? <Splash /> : 
          (albumPage ? <ScrollAlbum albums={albums} swapToAlbum={handleSwapToAlbum}/> :
            <>
              <AudioPlayer tracks={tracks} trackIndex={trackIndex} showSide={showSide} onIndexChange={handleTrackIndex} swapBackAlbum={handleSwapBackAlbum}/>
              <SearchBar tracks={tracks} trackIndex={trackIndex} onIndexChange={handleTrackIndex}/>
            </>
          )
      }
    </div>
  );
}

export default App;