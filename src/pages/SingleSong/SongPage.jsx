import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import DataContext from '../../context/DataContext';
import styles from './style.module.css';

export default function SongPage() {
  const { state } = useLocation();
  const song = state;
  console.log(song);
  let { title, author, thumbnail, videoId, lengthText, description } = song

  const {
    setSongUrl,
    setPlayNow,
    setLiked,
    setLocation,
    setTimeLine,
    liked,
     setSongDescription
  } = useContext(DataContext);
  const [isPlaying, setIsPlaying] = useState(false);


  const handlePlay = () => {
    setSongUrl(`https://www.youtube.com/watch?v=${videoId}`);
    setTimeLine(lengthText);
    setPlayNow((prevPlayNow) => !prevPlayNow);
    setLocation(0);
    setSongDescription(description)
    console.log(description)
  };

  const handleLike = () => {
    fetch(`http://localhost:2500/likedSongs/${videoId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((result) => {
        setLiked(result);
      })
      .catch((error) => {
        console.error('Error removing liked song:', error);
      });
  };

 

  return (
    <div className={song}>
      {song.thumbnail && <img className={styles.songImg} src={song.thumbnail[0].url} />}
      <h3 className={styles.songTitle}>{title}</h3>
      <div className={styles.songActions}>
        <i className={`fa fa-play iconH ${isPlaying ? "playing" : ""}`}
          onClick={() => { handlePlay() }}
        ></i>

        <i className={`fa fa-heart iconH ${liked ? "liked" : ""}`}
          aria-hidden="true"
          onClick={() => { handleLike() }}
        ></i></div>
    </div>
  )
}


