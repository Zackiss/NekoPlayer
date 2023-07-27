import React from "react";
import { useState, useEffect } from "react";
import "./styles.css"


const AlbumContainer = ({ albums, swapToAlbum }) => {

    useEffect(() => {
        const slider = document.querySelector('.scroll-items');
        let isDown = false;
        let startX;
        let scrollLeft;
        let clickEvent = null;

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
            }, 400);
        });
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
            clickEvent = null;
        });
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');

            if (clickEvent) {
                const album = clickEvent.target.closest('.scroll-items > div');
                if (album) {
                  const albumId = album.dataset.albumId;
                  swapToAlbum(albumId)
                  console.log(`Clicked album with ID ${albumId}`);
                }
              }
        
              clickEvent = null;
        });
        slider.addEventListener('mousemove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 3; //scroll-fast
            slider.scrollLeft = scrollLeft - walk;
            clickEvent = null;
        });
    }
    )

    return (
      <div className="scroll-items">
        {albums.map((album) => (
            <div key={album.id} data-album-id={album.id}>
                <img src={require('./album/' + album.coverImage)} alt={" "} draggable={false}></img>
            </div>
            ))
        }
      </div>
    );
  };
  
  export default AlbumContainer;