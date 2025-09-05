import React from 'react'
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Eid from "../../images/Eid.webp"
import NewProduct from "../../images/NewProduct.jpg"
import laptop from "../../images/laptop.avif";
import { Rating } from '@material-ui/lab';
import { useEffect } from 'react';

const ProductCard = ({product}) => {
//   const options={
//     edit:false,
//     color:"rgba(20,20,20,0.1)",
//     activeColor:"tomato",
//     size:window.innerWidth<600?20:25,
//     value:product.ratings,
//     isHalf:true,
// }
const options={
  size:"large",
  value:product.ratings,
  readOnly:true,
  precision:0.5,
}
useEffect(()=>{
  window.scrollTo({bottom:0,behavior:'smooth'},[])
})
console.log(product);
// console.log(product);
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
        <img src={ product.images[0]?.url || NewProduct } alt={product.name} />
        <p>{product.name}</p>
        <div>
            <Rating {...options}/>
            <span className='productCardSpan'>({product.numOfReviews} Reviews)</span>
        </div>
        <span>{`₹${product.price}`}</span>
      
    </Link>
  )
}

export default ProductCard;
