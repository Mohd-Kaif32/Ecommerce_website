import React from 'react'
import playStore from  "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png"
// import AppStore from "../../../images/AppStore.png";
import "./Footer.css"

const Footer = () => {
  return (
    <footer id="footer">
      <div class="leftFooter">
        <h4>Download Our App</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="AppStore" />
      </div>

      <div class="midFooter">
        <h1>ECOMMERCE</h1>
        <p>High Quality is our first priority</p>
        <p>Copyrights 2021 &copy; MeKaif</p>
      </div>

        <div class="rightFooter">
            <h4>Follow Us</h4>
            <a href="">Instagram</a>
            <a href="">Youtube</a>
            <a href="">Facebook</a>
        </div>

    </footer>
  )
}

export default Footer
