import React from 'react'
import './App.css'
import Banner from './components/Banner'
import Navbar from './components/Navbar'
import Row from './components/Row'
import { requests } from './request'

const App = React.memo(() => {
  return (
    <>
      <Navbar />
      <Banner />
      <div className="App">
        <Row
          title="NETFLIX ORIGINALS"
          fetchUrl={requests.fetchNetflixOriginals}
          isLargeRow
        />
        <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
        {/* <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} /> */}
        <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
        {/* <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} /> */}
        <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
        <Row title="DOcumentaries" fetchUrl={requests.fetchDocumentMovies} />
      </div>
    </>
  )
})

export default App
