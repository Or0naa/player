import { useContext, useState } from 'react';
import styles from './style.module.css';
import DataContext from '../../context/DataContext';
import Home from '../Home';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');

  const{setSearchSong} = useContext (DataContext);
      const handleSearch = () => {
          setSearchSong(searchTerm);
      }
  
      return (
          <div >
              <input type='text' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              <button className={styles.search} onClick={handleSearch}>Search</button>
              <Home/>
          </div>
      );
  
}
