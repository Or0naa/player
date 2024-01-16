import { useState } from 'react';
import Layout from './components/Layout'
import DataContext from './context/DataContext';

export default function App() {
  const [searchSong, setSearchSong] = useState(localStorage.searchSong ? JSON.parse(localStorage.searchSong) : "להקה צבאית");
  const [songs, setSongs] = useState([])
  const [playNow, setPlayNow] = useState(false)
  const [songUrl, setSongUrl] = useState()
  const [liked, setLiked] = useState({})
  const [location, setLocation] = useState(0)
  const [timeLine, setTimeLine] = useState(0)
  const [songDescription, setSongDescription] = useState("")
  const [user, setUser] = useState(localStorage.user ? JSON.parse(localStorage.user) : "")


  const contextValue = {
    songs,
    setSongs,
    playNow,
    setPlayNow,
    songUrl,
    setSongUrl,
    searchSong,
    setSearchSong,
    liked,
    setLiked,
    location,
    setLocation,
    timeLine,
    setTimeLine,
    songDescription,
    setSongDescription,
    user,
    setUser

  };



  return (
    <DataContext.Provider value={contextValue}>
      <Layout />
    </DataContext.Provider>
  )
}
