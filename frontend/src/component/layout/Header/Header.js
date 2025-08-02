import React from 'react';
import {ReactNavbar} from "overlay-navbar";
// import ReactNavbar from "overlay-navbar";
import logo from "../../../images/logo.png"
import {useHistory} from "react-router-dom"

console.log("ReactNavbar is", ReactNavbar);


const options={
burgerColorHover: "#eb4034",
  logo,
  logoWidth: "20vmax",
  navColor1: "white", 
  logoHoverSize: "10px",
  logoHoverColor: "#eb4034",

  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link5Text:"Search",

  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link5Url: "/search",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  nav5justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIconColor: "rgba(35, 35, 35,0.8)",
  // searchIcon: true,
  searchIconColor: "rgba(35, 35, 35,0.8)",
  cartIconColor: "rgba(35, 35, 35,0.8)",
  // profileIcon: true,
  profileIconColorHover: "#eb4034",
  searchIconColorHover: "#eb4034",

  // cartIcon: true,

  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",
}

const Header = () => {
    // console.log(ReactNavbar);
    const history = useHistory();
  return (
    <>
    
    <ReactNavbar
    {...options}
    />
    
    </>
    
    // <h1>Hii</h1>
  );
}

export default Header
