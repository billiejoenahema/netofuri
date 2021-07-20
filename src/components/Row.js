import React, { useState, useEffect } from 'react'
import instance from '../axios'
import './Row.scss'

export const Row = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([])
  const baseUrl = 'https://image.tmdb.org/t/p/original'
  const noImage = `${process.env.PUBLIC_URL}/no_image.jpeg`

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
            src={movie.backdrop_path ? `${baseUrl}${movie.backdrop_path}` : noImage}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  )
}

export default Row
