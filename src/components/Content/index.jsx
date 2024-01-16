import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import Home from '../../pages/Home'
import Search from '../../pages/Search'
import Favourites from '../../pages/Favourits'
import Login from '../../pages/Login'
import styles from './style.module.css'
import Player from '../Player'
import NotFound from '../../NotFound'
import SongPage from '../../pages/SingleSong/SongPage'

export default function Content() {
 
  return (
  
      <div className={styles.content}>
        <div>
          <nav className={styles.navLink}>
            <NavLink
              to={'/'}
              className={({ isActive }) => {
                return isActive ? styles.active : "";
              }}            >
              Home
            </NavLink>
  
            <NavLink
              to={'/favourites'}
              className={({ isActive }) => {
                return isActive ? styles.active : "";
              }}            >
              Favourites
            </NavLink>
  
            <NavLink
              to={'/login'}
              className={({ isActive }) => {
                return isActive ? styles.active : "";
              }}            >
              Login
            </NavLink>
  
            <NavLink
              to={'/Search'}
              className={({ isActive }) => {
                return isActive ? styles.active : "";
              }}              
            >
              Search
            </NavLink>
          </nav>
        </div>
        <div>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path="/song/:videoId" element={<SongPage />} />
          <Route path={'/Search'} element={<Search />} />
          <Route path={"/Favourites"} element={<Favourites />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/404"} element={<NotFound />} />
          <Route path={"*"} element={<NotFound />} />

        </Routes>
      </div>
    </div>
  )
}

