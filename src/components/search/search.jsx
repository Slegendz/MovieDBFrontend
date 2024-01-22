import Card from "../card/card"

const Search = ({ search }) => {
  const IMG_PATH = "https://image.tmdb.org/t/p/w1280"

  return (
    <section className="w-full flex flex-col items-center justify-center">
      <Card movie={search} imgUrl={IMG_PATH} />
    </section>
  )
}

export default Search