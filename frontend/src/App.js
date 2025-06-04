import logo from './logo.svg';
import './App.css';
import Header from "./component/layout/Header/Header.js"
import Footer from "./component/layout/Footer/Footer.js"
import React from "react";
import {BrowserRouter as Router,Route} from "react-router-dom";
import WebFont from "webfontloader";
import Home from "./component/Home/Home.js"
import Loader from './component/layout/Loader/Loader.js';
import productDetails from "./component/Product/ProductDetails.js"
function App() {
  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Drold","Chilanka"],
      }
    })
  },[])
  return <Router>
  <Header/>
  <Route exact path="/" component={Home}/>
  <Route exact path="/product/:id" component={productDetails}/>
  
  <Footer/>
  </Router>
    
 
}

export default App;
