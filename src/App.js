import { useEffect, useState } from "react";
import SearchIcon from './search.svg'
import MovieCard from "./MovieCard";
const API_URL = 'http://www.omdbapi.com?apikey=9c3bc3c4'

const movie1 = {
  "Title": "Amazing Spiderman Syndrome", 
  "Year": "2012", 
  "imdbID": "tt2586634", 
  "Type": "movie", 
  "Poster": "N/A"
}

function App() {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('Spiderman')
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json()
    console.log(data.Search)
    setMovies(data.Search)
  } 

  useEffect(()=>{
    searchMovies('Spiderman')
  }, [])
  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input 
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}
        />
        <img 
          src={SearchIcon}
          alt='search'
          onClick={()=>searchMovies(searchTerm)}
        />
      </div>

      {
        movies?.length > 0
        ? <div className="container">
            {movies.map(movie=><MovieCard key={movie.imdbID} movie1={movie} />)}
          </div>
        : <div className="empty">
            <h2>No movies found</h2>
        </div>
      }

    </div>
  );
}

export default App;
