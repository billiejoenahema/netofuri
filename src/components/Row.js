import { useState, useEffect } from 'react'
import instance from '../axios'
import YouTube from 'react-youtube'
import { API_KEY } from '../request'
import './Row.scss'

export const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([])
  const [trailerUrl, setTrailerUrl] = useState('')
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
