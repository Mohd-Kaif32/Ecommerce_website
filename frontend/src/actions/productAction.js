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


export const getProduct = ()=>async(dispatch) => {
  // const dispatch=useDispatch()
  try {
    dispatch({type:ALL_PRODUCT_REQUEST});
    const {data}=await axios.get("/api/v1/products");
    dispatch({
        type:ALL_PRODUCT_SUCCESS,
        payload:data,
    })
  } catch (error) {
    console.log(error);
    dispatch({
        type:ALL_PRODUCT_FAIL,
        // console.log(error);
        payload:error.response,
    })
  }
}


export const getProductDetails = (id)=>async(dispatch) => {
  // const dispatch=useDispatch()
  try {
    dispatch({type:PRODUCT_DETAILS_REQUEST});
    const {data}=await axios.get(`/api/v1/product/${id}`);
    console.log(data);
    dispatch({
        type:PRODUCT_DETAILS_SUCCESS,
        payload:data.product,
    })
  } catch (error) {
    // console.log(error);
    console.log("kaif");
    dispatch({
        type:PRODUCT_DETAILS_FAIL,
        // console.log(error);
        payload:error.response.data.message,
    })
  }
}



export const clearErrors=()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
}
