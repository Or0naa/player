import { useContext, useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import DataContext from '../../context/DataContext';
import styles from './style.module.css';

export default function Player() {
  const { 
    playNow,
    setPlayNow,
    songUrl,
    setSongUrl,
     songs,
      location, 
      setLocation, 
      timeLine, 
      setTimeLine, 
      songDescription, 
      setSongDescription
     } = useContext(DataContext);
  const [isMute, setIsMute] = useState(false);
  const [repeatSong, setRepeatSong] = useState(false);


  const handleMute = () => {
    setIsMute(!isMute);
  };

  const handleStop = () => {
    console.log("stop");

  };


  const handlePlayPause = () => {
    setPlayNow(!playNow);
  };
  const hendleBackward = () => {
    if (location > 0) {
      setSongUrl("https://www.youtube.com/watch?v=" + songs[location - 1].videoId);
      setLocation(location - 1)
      setTimeLine(songs[(location - 1)].lengthText
      )

    }
  }
  const hendleNext = () => {
    if (songs.length > location) {
      setSongUrl("https://www.youtube.com/watch?v=" + songs[location + 1].videoId);
      setLocation(location + 1)
      setTimeLine(songs[(location + 1)].lengthText
      )

    }
  }

  const hendleRepeat = () => {
    console.log("repeat?" + repeatSong)
    setRepeatSong(!repeatSong)

  }
  useEffect(() => {
    const storedSongUrl = localStorage.getItem("songUrl")?.trim();
const storedTimeLine = localStorage.getItem("timeLine")?.trim();
const storedSongDescription = localStorage.getItem("songDescription")?.trim();


    console.log("Stored Song URL:", storedSongUrl);
    console.log("Stored Time Line:", storedTimeLine);
    console.log("Stored Song Description:", storedSongDescription);
  
    if (storedSongUrl && storedTimeLine && storedSongDescription) {
      setSongUrl(storedSongUrl);
      setTimeLine(storedTimeLine);
      setSongDescription(storedSongDescription);
    }
    else{
      setSongUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
      setTimeLine("0:00")
      setSongDescription("להקה צבאית")
    }
  }, []);


  // useEffect(() => {
  //   if (songs.length > 0) {
  //     setSongUrl("https://www.youtube.com/watch?v=" + songs[0].videoId);
  //     setTimeLine(songs[0].lengthText
  //     )
  //   }
  // }, [songs]);
  // console.log(timeLine)


  return (
    <div className={styles.playerContainer}>
      <ReactPlayer url={songUrl} playing={playNow} controls width="0" height="0" />

      <div className={styles.player}>
        <div className={styles.description}>
          <p>{songDescription}</p>
        </div>
        <div className={styles.leftSide}>
          <button onClick={handleStop}>{<i className="fa-solid fa-stop"></i>}</button>
          <button className={repeatSong ? styles.repeat : ""} onClick={hendleRepeat}>
            <i className="fa-solid fa-repeat"></i>
          </button>


          {/* 
            <button >{<i className="fa-solid fa-backward"></i>}</button>
          */}
          <button onClick={hendleBackward}>{<i className="fa-solid fa-backward-fast"></i>}</button>
        </div>
        <button className={styles.playButton} onClick={handlePlayPause}>
          {playNow ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>}
        </button>

        <div className={styles.rightSide}>
          <button onClick={hendleNext}>{<i className="fa-solid fa-forward"></i>}</button>
          {/* <span>
            <button>{<i className="fa-solid fa-forward-fast"></i>}</button>
          </span> */}
          <button onClick={handleMute}>
            {isMute ? <i className="fa-solid fa-volume-xmark"></i> : <i className="fa-solid fa-volume-high"></i>}
          </button>
          <button>{<i className="fa-solid fa-shuffle"></i>}</button>
        </div>
      </div>
    </div>
  );
}

