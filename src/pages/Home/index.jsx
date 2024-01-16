import styles from './style.module.css';
import React, { useContext, useEffect, useState } from 'react'
import DataContext from '../../context/DataContext';
import SingleSong from '../SingleSong';

export default function Home() {

  const { setLiked, searchSong, setSearchSong, songs, setSongs } = useContext(DataContext)

  useEffect(() => {
    const url = `https://yt-api.p.rapidapi.com/search?query=${searchSong}&type=video`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '3b2dbfb899msh8f44de0995da735p1837bejsn18051473c33d',
        'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
      }
    };
    fetch(url, options).then(response => {
      response.json().then(data => {
        console.log({ data })
        setSongs(data.data);
        console.log(data.data)
      });
    });
  }, [searchSong]);

  return (
    <div className={styles.songsList}>
      {!songs ? (
        <h1>עזבו לכו ליוטיוב</h1>
      ) : (
        songs.map((s, i) => (
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
