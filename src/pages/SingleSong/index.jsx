import styles from './style.module.css';
import DataContext from '../../context/DataContext';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SingleSong({ song, loc }) {

  let { title, author, thumbnail, videoId, lengthText, description } = song;

  const {
    playNow,
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
    localStorage.setItem("songUrl", JSON.stringify(`https://www.youtube.com/watch?v=${videoId}`));
    localStorage.setItem("timeLine", JSON.stringify(lengthText));
    localStorage.setItem("songDescription", JSON.stringify(description));

    setSongUrl(`https://www.youtube.com/watch?v=${videoId}`);
    setTimeLine(lengthText);
    setPlayNow((prevPlayNow) => !prevPlayNow);
    setIsPlaying(!isPlaying);
    setLocation(loc);
    setSongDescription(description);
    console.log(description);
  };


  const handleLike = () => {
    if (liked && liked[videoId]) {
      removeLikedSong(videoId);
    } else {
      addLikedSong(videoId, title);
    }
  };

  const addLikedSong = (videoId, title) => {
    fetch('http://localhost:2500/likedSongs/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        songId: videoId, body: { song }
      }),
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setLiked([...result]);
      })
      .catch(error => {
        console.error('Error adding liked song:', error);
      });
  };

// פונקציה להסרת שיר מרשימת האהובים
const removeLikedSong = (videoId) => {
  fetch(`http://localhost:2500/likedSongs/${videoId}`, {
      method: 'DELETE',
  })
      .then(response => response.json())
      .then(result => {
          console.log(result);
setLiked([result])      })
      .catch(error => {
          console.error('Error removing liked song:', error);
      });
};

  const nav = useNavigate();
  const handleSongPage = () => {
    nav("/song/" + videoId, { state: song })
  };

  return (
    <div className={song}>
      {song.thumbnail && <img className={styles.songImg} src={song.thumbnail[0].url} onClick={handleSongPage} />}
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


