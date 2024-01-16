import { useState } from 'react';
import styles from './style.module.css';

export default function Favourites() {
  const [liked, setLiked] = useState ([]);
  return (
    <div>
      {liked.length===0 ? (
        <h1>עוד אין מועדפים</h1>
      ) : (
        liked.map((s, i) => (
          <SingleSong
            key={s.videoId}
            song={s}
            loc={i}
          />
        ))
      )}
    </div>
  )
}

