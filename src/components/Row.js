import React, { useState, useEffect } from 'react'
import instance from '../axios'

export const Row = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(fetchUrl)
      setMovies(request.data.results)
      return request
    }
    fetchData()
  }, [fetchUrl])

  console.log(movies)

  return (
    <div className="Row" />
  )
}

export default Row
