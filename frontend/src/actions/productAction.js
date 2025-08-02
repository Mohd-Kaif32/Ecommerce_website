import React from 'react'
import axios from "axios";
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,

    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,

    CLEAR_ERRORS
} from "../constants/productConstants";
// import { useDispatch } from 'react-redux';


export const getProduct = (keyword="",currentPage=1,price=[0,25000],category,ratings=0)=>async(dispatch) => {
  // const dispatch=useDispatch()
  try {
    dispatch({type:ALL_PRODUCT_REQUEST});

    let link=`/api/v1/products?keyword=${keyword}&page=${currentPage}`;
    //&price[gte]=${price[0]}&price[lte]=${price[1]}

    if(category){
      link=`/api/v1/products?keyword=${keyword}&page=${currentPage}&category=${category}&ratings[gte]=${ratings}`;
    }
    console.log("API Request:", link);
//     let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

// if (category) {
//   link += `&category=${category}`;
// }

    const {data}=await axios.get(link);

    
    
    dispatch({
        type:ALL_PRODUCT_SUCCESS,
        payload:data,
    })
  } catch (error) {
    // console.log(error);
    dispatch({
        type:ALL_PRODUCT_FAIL,
        
        payload:error.response.data.message,
    })
  }
}


export const getProductDetails = (id)=>async(dispatch) => {
  // const dispatch=useDispatch()
  try {
    
    dispatch({type:PRODUCT_DETAILS_REQUEST});
    
    const {data}=await axios.get(`/api/v1/product/${id}`);
    
   
    
    dispatch({
        type:PRODUCT_DETAILS_SUCCESS,
        payload:data.product,
    })
  } catch (error) {
    
   
      
    dispatch({
        type:PRODUCT_DETAILS_FAIL,

    
        payload:error.response.data.message,
    })
  }
}



export const clearErrors=()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
}
