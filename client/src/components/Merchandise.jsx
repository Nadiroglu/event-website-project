import React from 'react'

const Merchandise = ({name, description, price, image_url}) => {
  return (
    <div>
        
          <h2>{name}</h2>
          <p>{description}</p>
          <span>{price}</span>
          <img src={image_url}></img>

    </div>
  )
}

export default Merchandise