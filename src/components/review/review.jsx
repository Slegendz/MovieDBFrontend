import api from "../../api/posts"
import { useParams } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import ReviewPosts from "../reviewposts/reviewpost"
import { FaPen } from "react-icons/fa"

const Review = () => {
  const IMG_PATH = "https://image.tmdb.org/t/p/w1280"
  const { id, title, img } = useParams()
  const [reviewPost, setReviewPost] = useState([])
  const [newReview, setNewReview] = useState(false)
  const [username, setUsername] = useState("")
  const [userReview, setUserReview] = useState("")
  const ref = useRef()
  const tempRef = useRef()

  useEffect(() => {
    const getReviews = async (id) => {
      try {
        console.log(id)
        const response = await api.get(`/movie/${id}`)
        setReviewPost(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    getReviews(id)
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const movieId = id
      const newReview = { movieId, user: username, review: userReview }

      const response = await api.post(`/new`, newReview)
      const allReview = [...reviewPost, response.data]
      setUsername("")
      setReviewPost(allReview)
      setUserReview("")
    } catch (err) {
      console.log(err)
    }
  }

  const closeMenu = (e) => {
    if(newReview && !tempRef.current.contains(e.target) && !ref.current.contains(e.target))
      setNewReview(false)
  }

  document.addEventListener('mousedown', closeMenu);

  return (
    <div className="m-1 flex w-full flex-row rounded-lg bg-zinc-700 text-teal-300">
      <div className="flex h-[70vh] w-[30%] flex-col items-center justify-start rounded-lg bg-cyan-500 p-4">
        <h1 className="mt-2 text-center text-3xl font-bold text-cyan-900">
          {title}
        </h1>
        <img
          className="m-3 flex h-auto w-[80%] items-center rounded-md"
          src={IMG_PATH + "/" + img + ".jpg"}
          alt="Movie"
        />
      </div>

      <div className="w-full">
        <div className="relative flex items-center justify-center p-4 ">
          <h1 className="text-4xl text-amber-400"> Reviews </h1>
          <button
            ref = {tempRef}
            className={`absolute left-10 flex items-center justify-center rounded-lg bg-cyan-600 p-3 font-bold text-white transition-all duration-150 hover:bg-cyan-700`}
            // onMouseEnter={() => setNewReview(true)}
            // onMouseLeave={() => setNewReview(false)}
            onClick={() => setNewReview(!newReview)}
          >
            <FaPen className="mr-2 inline-block hover:scale-110" /> New Review
          </button>
          <div
            ref = {ref}
            className={`${
              newReview ? "h-[300px] opacity-100" : "h-0 opacity-0"
            } absolute left-[-100px] top-[120%] z-20 w-[400px] rounded-xl bg-teal-500 transition-all duration-700`}
          >
            <form
              className={`${
                newReview ? "h-full opacity-100" : "h-0 opacity-0"
              } flex flex-col items-center justify-center px-2 py-4 transition-all duration-700`}
              onSubmit={(e) => handleSubmit(e) && setNewReview(false)}
            >
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="UserName"
                className={`${
                  newReview ? "opacity-100" : "opacity-0"
                } text-md mb-3 w-[90%] rounded-xl px-4 py-1 text-black outline-none transition-all duration-[1.5s]`}
              />
              <textarea
                placeholder="Write your Review..."
                className={`${
                  newReview ? "opacity-100" : "opacity-0"
                } resize-none scrollbar-track-orange-300 scrollbar-thin scrollbar-thumb-lime-300 text-md mb-3 w-[90%] rounded-xl px-4 py-1 text-black outline-none transition-all duration-[1.5s]`}
                cols="30"
                rows="7"
                value={userReview}
                onChange={(e) => setUserReview(e.target.value)}
                required
              ></textarea>
              <button
                type="submit"
                className={`${
                  newReview ? "opacity-100" : "opacity-0"
                } rounded-md bg-white px-5 py-2 text-amber-400 transition-all duration-[1.5s]`}
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        <ReviewPosts
          reviewPost={reviewPost}
          userReview={userReview}
          setUserReview={setUserReview}
          user = {username}
          movieId = {id}
          setReviewPost={setReviewPost}
        />
      </div>
    </div>
  )
}

export default Review
