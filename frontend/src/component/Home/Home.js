import React,{Fragment,useEffect} from 'react'
import {CgMouse} from "react-icons/cg";
import Product from "./Product.js";
import "./Home.css";
import MetaData from "../layout/MetaData";
import {getProduct} from "../../actions/productAction";
import {useSelector,useDispatch} from "react-redux";
import {useAlert} from "react-alert";
import Loader from '../layout/Loader/Loader.js';

// const product={
//   name:"Blue Tshirt",
//   images:[{url:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.meesho.com%2Ft-shirts-t-shirts-for-men-t-shirt-oversized-t-shirt-for-men-t-shirt-for-men-oversized-t-shirtmen-cotton-blend-tshirtcasual-t-shirt-baggy-t-shirt-baggy-t-shirt-for-men-men-baggy-t-shirts-back-print-anime%2Fp%2F4tz4ls&psig=AOvVaw0Fz40vYMo2S22p4JGFf8Ah&ust=1749005167393000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKDakZSe1I0DFQAAAAAdAAAAABAE"}],
//   price:"3000",
//   _id:"meKaif"
// }


const Home = () => {
  const alert=useAlert();
  const dispatch=useDispatch();
  const {loading,error,products,productsCount}=useSelector((state)=>state.products);
  // const {products}}=useSelector((action)=>action.products);
  

  useEffect(()=>{
    if(error){
      return alert.error(error);
    }
    dispatch(getProduct());
  },[dispatch]);


  return (   
      <Fragment>
        {loading?(
          <Loader/>
        ):(
          <Fragment>
      <MetaData title="Ecommercee"/>
        <div className="banner">
            <p>Welcome to Ecommerce</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>
                    <a href="#container">
                        <button >
                            Scroll <CgMouse/>
                            {/* scroll */}
                        </button>
                    </a>
        </div>
        <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
           
            {products&&products.map((product)=>
            <Product product={product} />
            )}
          </div>

      </Fragment>
   
        )}
      </Fragment>
  )
}

export default Home
