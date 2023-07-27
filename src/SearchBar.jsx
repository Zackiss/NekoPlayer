import { useState, useEffect } from "react";
import React from "react";
import "./styles.css"

const SearchBar = ({ tracks, trackIndex, showSide, onIndexChange}) => {
  const [searchInput, setSearchInput] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const initTracks = tracks;

  const handleChange = (e) => {
    e.preventDefault();
    const input = e.target.value;
    setSearchInput(input);
  };

  const handletrackClick = (index) => {
    onIndexChange(index);
  };

  const filteredtracks = tracks.filter((track) =>
    track.title.includes(searchInput)
  );

  const displaytracks = searchInput.length > 0 ? filteredtracks : initTracks;

  useEffect(() => {
    function handleClickOutside(event) {
      const component = document.querySelector('.search-frame');
      const search = document.querySelector('.search');
      const back = document.querySelector(".button-back")

      if (isVisible && component && component.contains(event.target) && !search.contains(event.target)) {
        setIsVisible(false);
      } else if (!isVisible && component && component.contains(event.target) && !search.contains(event.target)) {
        setIsVisible(true);
      } else if (!isVisible && component && back && back.contains(event.target)) {
        setIsVisible(true);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isVisible]);

  return (
    <div className="search-frame" style={{ transform: isVisible ? 'translateX(0)' : 'translateX(-100%)', 
                                           transition: 'transform 0.3s ease-out' }}>
        <input
            type="search"
            className="search"
            placeholder="请输入搜索"
            onChange={handleChange}
            value={searchInput}
        />
        <div className="tb-content">
            <table className="search-table">
                <tbody>
                {displaytracks.map((track, index) => (
                    <tr key={track.title} onClick={() => handletrackClick(index)}>
                        <thread>
                            <td>{track.title}</td>
                            <td className="rest-td">{track.artist}</td>
                        </thread>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default SearchBar;