import { useState, useRef } from "react"
import api from "../../api/posts"

const ReviewPosts = ({
  reviewPost,
  userReview,
  setUserReview,
  user,
  movieId,
  setReviewPost,
}) => {
  const [post, setPost] = useState([])

  const getPost = async (id) => {
    try {
      const response = await api.get(`/${id}`)
      setPost(response.data)
      setUserReview(response.data.review)
    } catch (err) {
      console.log(err)
    }
  }

  const handleEdit = async (id) => {
    const editReview = { movieId, user, review: userReview }

    try {
      const response = await api.put(`/${id}`, editReview)
      setPost([])
      const updatedReviewPost = reviewPost.map((review) =>
        review._id === id ? { ...review, review: userReview } : review
      )
      setUserReview("")
      setReviewPost(updatedReviewPost)
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/${id}`)
      const updatedReviewPost = reviewPost.filter(
        (review) => review._id !== id
      );
      setReviewPost(updatedReviewPost);
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      {reviewPost.length == 0 && (
        <h2 className="flex h-[80%] items-center justify-center text-center text-4xl">
          No Reviews
        </h2>
      )}
      <div className="grid grid-cols-3 px-4 py-2">
        {reviewPost.map((review) => {
          return (
            <div
              key={review._id}
              className="mx-2 mb-4 flex min-h-[180px] flex-col rounded-lg bg-gradient-to-tl from-amber-400 to-green-600"
            >
              <h2 className="h-[20%] rounded-t-lg border-b-2 border-b-amber-400 bg-pink-500 p-1 text-center text-xl font-semibold text-white opacity-80">
                {review.user}
              </h2>

              {post._id === review._id ? (
                <textarea
                  className={`mb-3 resize-none rounded-xl bg-cyan-500 bg-opacity-60 px-4 py-1 text-md text-white outline-none`}
                  cols="30"
                  rows="5"
                  value={userReview}
                  onChange={(e) => setUserReview(e.target.value)}
                  required
                ></textarea>
              ) : (
                <p className="text-md h-[60%] p-3 text-white">
                  {review.review.length <= 120
                    ? review.review
                    : `${review.review.slice(0, 120)}...`}
                </p>
              )}

              <div className="h-[20%] px-3">
                <button
                  className="mr-3 rounded-lg bg-rose-400 px-3 py-1 shadow-sm shadow-rose-200"
                  onClick={() => getPost(review._id)}
                >
                  Edit
                </button>
                {post._id !== review._id && (
                  <button
                    className="mr-3 rounded-lg bg-rose-400 px-3 py-1 shadow-sm shadow-rose-200"
                    onClick={() => handleDelete(review._id)}
                  >
                    Delete
                  </button>
                )}
                {post._id === review._id && (
                  <button
                    className="mr-3 rounded-lg bg-rose-400 px-3 py-1 shadow-sm shadow-rose-200"
                    onClick={() => handleEdit(review._id)}
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default ReviewPosts
