import { useState, useEffect } from "react"
import { Navbar, Movie, Review } from "./components"
import { Route, Routes, useNavigate } from 'react-router-dom'

function App() {
  const API_URL =
    "https://api.themoviedb.org/3/discover/movie?sort_by_popularity.desc&api_key=3373f7207d4c4ddbd19f3ed92182c635"
  const SEARCHAPI =
    'https://api.themoviedb.org/3/search/movie?&api_key=3373f7207d4c4ddbd19f3ed92182c635&query="'

  const [search, setSearch] = useState("")
  const [movie, setMovie] = useState([])
  const [count, setCount] = useState(1)
  const [searchResult, setSearchResult] = useState([])
  const navigate = useNavigate();
  
  const fetchItems = async () => {
    try {
      const response = await fetch(API_URL + `&page=${count}`)
      if (!response.ok) throw Error("Did not get api response")

      setCount(count + 1)
      const data = await response.json()
      console.log(data.results)
      const newMovies = [...movie, ...data.results]
      setMovie(newMovies)
    } catch (err) {
      console.log(err.message)
    }
  }

  const loadMore = async () => {
    const url = API_URL + `&page=${count}`
    console.log(url)
    setCount(count + 1)
    console.log(count)
    fetchItems(url)
  }

  const fetchSearchApi = async () => {
    try {
      const response = await fetch(`${SEARCHAPI}${search}`)
      if (!response.ok) throw Error("Did not get api response")

      const data = await response.json()
      console.log(data.results)
      setSearchResult(data.results)
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    fetchItems();
  }, [])

  useEffect(() => {
    fetchSearchApi();
  }, [search])

  return (
    <main className="min-h-screen w-full bg-[#131720] px-6 py-2 font-nunito text-white">
      <Navbar search={search} setSearch={setSearch} />
      <Routes>
        <Route path = "/" element = { <Movie movie={ search === "" ? movie : searchResult } loadMore={loadMore} /> } />
        <Route path = "/reviews/:id/:title/:img" element = { <Review />} />
      </Routes>
    </main>
  )
}

export default App
