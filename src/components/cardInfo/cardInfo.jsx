import { useState } from "react"
import { Link} from 'react-router-dom'

const CardInfo = ({ id, poster_path, title, overview, vote_average, imgUrl }) => {
  const [showMore, setShowMore] = useState(false);
  let img = "";

  if(poster_path){
    img = poster_path.split('/').pop().split('.')[0];
  }

  return (
    <div className={`${showMore ? "bg-[#22314a] transition duration-700" : ''} flex relative flex-col items-center justify-center rounded-xl bg-[#151f30] p-4 text-center`}>
      <div className="relative">
        <img
          src={imgUrl + poster_path}
          alt="title"
          className={`${showMore ? "" : ''} h-160 w-80 rounded-2xl`}
        />
        <div className="absolute bottom-0 flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 opacity-90 text-white border-2 ">
            <p className="font-bold"> {Math.round(vote_average * 10)} </p>
        </div>
      </div>

      <h3 className="mt-4 text-xl">
        {title.length > 28 ? `${title.slice(0, 28)}...` : title}
      </h3>

      {showMore && (
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 animate-open-div flex flex-col items-center w-[80%]">
          <div className="animate-open-bar mb-4 flex h-1 w-1/2 rounded-sm bg-teal-500 shadow-md shadow-cyan-400"></div>
          <p className="text-md"> {overview} </p>
        </div>
      )}

      <button
        className="mt-3 cursor-pointer text-teal-500 outline-none hover:scale-110 hover:text-opacity-[0.8]"
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? "Show Less" : "Show More"}
      </button>

      <Link to = {`/reviews/${id}/${title}/${img}`} className = "text-teal-600"> Review </Link>
    </div>
  )
}

export default CardInfo
