import { useState, useEffect } from 'react'
import instance from '../axios'
import YouTube from 'react-youtube'
import { API_KEY } from '../request'
import { BASE_URL, NO_IMAGE } from '../constants'
import './Row.scss'

export const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([])
  const [trailerUrl, setTrailerUrl] = useState('')

  const getMovieImage = (movie) => {
    if (movie.poster_path && movie.backdrop_path) {
      return (`${BASE_URL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`)
    }
    return NO_IMAGE
  }

  useEffect(() => {
    const fetchData = async () => {
      const request = await instance.get(fetchUrl)
      setMovies(request.data.results)
      return request
    }
    fetchData()
  }, [fetchUrl])

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  }

  const handleClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl('')
    } else {
      let trailerUrl = await instance.get(
        `/movie/${movie.id}/videos?api_key=${API_KEY}`
      )
      setTrailerUrl(trailerUrl.data.results[0]?.key)
    }
  }

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
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div >
  )
}

export default Row
