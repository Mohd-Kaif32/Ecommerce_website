import React from 'react'
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Eid from "../../images/Eid.webp"


const Product = ({product}) => {
  const options={
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    size:window.innerWidth<600?20:25,
    value:product.ratings,
    isHalf:true,
}

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
        <img src={Eid} alt={product.name} />
        <p>{product.name}</p>
        <div>
            <ReactStars {...options}/>
            <span>({product.numOfReviews} Reviews)</span>
        </div>
        <span>{product.price}</span>
      
    </Link>
  )
}

export default Product
