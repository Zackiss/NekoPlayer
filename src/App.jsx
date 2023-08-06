import React, { useState, useEffect } from 'react';
import albums from "./tracks";
import AudioPlayer from "./AudioPlayer";
import Splash from './Splash';
import SearchBar from './SearchBar';
import ScrollAlbum from './ScrollAlbum'


function App() {
  const [loading, setLoading] = useState(true);
  const [albumPage, setAlbumPage] = useState(true);
  const [trackIndex, setTrackIndex] = useState(0);
  const [showSide, setShowSide] = useState(false);
  const [tracks, setTracks] = useState(albums[0].tracks)
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);

  const handleTrackIndex = (num) => {
    setTrackIndex(num);
  }

  const handleSwapToAlbum = (albumIndex) => {
    setTracks(albums[albumIndex - 1].tracks)
    setAlbumPage(false)
  }

  const handleSwapBackAlbum = () => {
    setAlbumPage(true)
  }

  useEffect(() => {
    const backgroundImage = new Image();
    backgroundImage.src = 'https://source.unsplash.com/random/1920x1080/?wallpaper,landscape';

    backgroundImage.onload = () => {
      setBackgroundLoaded(true);
    };
  }, []);

  useEffect(() => {
    // Run your function after the background image has loaded
    if (backgroundLoaded) {
      console.log('Background image loaded');
      setLoading(false);
      // Run your function here
    }
  }, [backgroundLoaded]);
  
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