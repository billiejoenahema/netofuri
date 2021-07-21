import { useState, useEffect } from 'react'
import instance from '../axios'
import './Row.scss'

export const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([])
  const baseUrl = 'https://image.tmdb.org/t/p/original'
  const noImage = `${process.env.PUBLIC_URL}/no_image.jpeg`
  const getMovieImage = (movie) => {
    if (movie.poster_path && movie.backdrop_path) {
      return (`${baseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`)
    }
    return noImage
  }

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
            className={`Row-poster ${isLargeRow && 'Row-poster-large'}`}
            src={getMovieImage(movie)}
            alt={movie.name}
          />
        ))}
      </div>
    </div >
  )
}

export default Row
