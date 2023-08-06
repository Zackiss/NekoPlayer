import React from "react";
import { useEffect } from "react";
import "./styles.css"


const AlbumContainer = ({ albums, swapToAlbum }) => {

  useEffect(() => {
    const slider = document.querySelector('.scroll-items');
    let isDown = false;
    let startX;
    let scrollLeft;
    let clickEvent = null;

    document.addEventListener('contextmenu', (e) => {
        // stop long touch hold from poping up context menus
        return false;
      }
    );

    slider.scrollTo({
      left: 500,
      behavior: "smooth",
    });

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        clickEvent = e;
        setTimeout(() => {
          if (isDown) {
            clickEvent = null;
          }
        }, 500);
      }
    );
    
    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
        clickEvent = null;
      }
    );

    slider.addEventListener('mouseup', (e) => {
      isDown = false;
      slider.classList.remove('active');
      const blank = document.querySelector(".no-image")

      if (clickEvent && blank && !blank.contains(e.target)) {
          const album = clickEvent.target.closest('.scroll-items > div');
          if (album) {
            const albumId = album.dataset.albumId;
            swapToAlbum(albumId)
            console.log(`Clicked album with ID ${albumId}`);
          }
        }

      clickEvent = null;
      }
    );

    slider.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;
        clickEvent = null;
        }
      );

    // for mobile touch
    slider.addEventListener('touchstart', (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.touches[0].pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      clickEvent = e;
      setTimeout(() => {
        if (isDown) {
          clickEvent = null;
        }
      }, 500);
    });
    
    slider.addEventListener('touchcancel', () => {
      isDown = false;
      slider.classList.remove('active');
      clickEvent = null;
    });
    
    slider.addEventListener('touchend', (e) => {
      isDown = false;
      slider.classList.remove('active');
      const blank = document.querySelector(".no-image");
    
      if (clickEvent && blank && !blank.contains(e.target)) {
        const album = clickEvent.target.closest('.scroll-items > div');
        if (album) {
          const albumId = album.dataset.albumId;
          swapToAlbum(albumId);
          console.log(`Clicked album with ID ${albumId}`);
        }
      }
    
      clickEvent = null;
    });
    
    slider.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.touches[0].pageX - slider.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      slider.scrollLeft = scrollLeft - walk;
      clickEvent = null;
    });
    }
  )

    return (
      <div className="scroll-items">
        <div className="no-image"></div>
        {albums.map((album) => (
            <div key={album.id} data-album-id={album.id}>
              <img src={require('./album/' + album.coverImage)} alt={" "} draggable={false}></img>
            </div>
            )
          )
        }
        <div className="no-image"></div>
      </div>
    );
  };
  
  export default AlbumContainer;