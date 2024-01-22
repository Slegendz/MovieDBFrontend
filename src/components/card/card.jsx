import CardInfo from "../cardInfo/cardInfo"
import { useState } from 'react'

const Card = ({ movie, imgUrl }) => {
  // const [width, setWidth] = useState(1/4);

  return (
    <div className="w-full px-7 py-2">
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        {movie.map((element) => (
          <div key={element.id} className="px-3 mb-3">
            <CardInfo {...element} imgUrl={imgUrl} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Card