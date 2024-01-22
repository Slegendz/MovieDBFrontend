import Card from "../card/card"

const Movie = ({ movie, loadMore }) => {
  const IMG_PATH = "https://image.tmdb.org/t/p/w1280"

  return (
    <section className="w-full flex flex-col items-center justify-center">
      <Card movie={movie} imgUrl={IMG_PATH} />
      <button
        onClick={loadMore}
        className="bg-cyan-500 px-8 rounded-xl m-3 py-3 text-center text-xl font-bold tracking-[0.1rem] text-white"
      >
        Load More
      </button>
    </section>
  )
}

export default Movie

//8e953b1
