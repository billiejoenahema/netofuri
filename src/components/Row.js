import React, { useState, useEffect } from 'react'
import instance from '../axios'
import './Row.scss'

export const Row = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([])
  const base_url = 'https://image.tmdb.org/t/p/original'

  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(fetchUrl)
      setMovies(request.data.results)
      return request
    }
    fetchData()
  }, [fetchUrl])

  return (
    <div className="Row">
      <h2>{title}</h2>
      <div className="Row-posters">
        {movies.map((movie) => (
          < img
            key={movie.id}
            className="Row-poster"
            src={`${base_url}${movie.backdrop_path}`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  )
}

export default Row
