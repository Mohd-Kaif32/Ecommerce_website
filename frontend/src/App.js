import logo from './logo.svg';
import './App.css';
import Header from "./component/layout/Header/Header.js"
import Footer from "./component/layout/Footer/Footer.js"
import React from "react";
import {BrowserRouter as Router,Route} from "react-router-dom";
import WebFont from "webfontloader";
import Home from "./component/Home/Home.js"
import Loader from './component/layout/Loader/Loader.js';
import ProductDetails from "./component/Product/ProductDetails.js"
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from './component/User/LoginSignUp.js';
import store from "./store";
import { loadUser } from './actions/userAction.js';
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import  updateProfile  from './component/User/UpdateProfile.js';
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import NotFound from "./component/layout/Not Found/NotFound";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from './component/Admin/NewProduct.js';
import UpdateProduct from './component/Admin/UpdateProduct.js';
import OrderList from './component/Admin/OrderList.js';
import ProcessOrder from './component/Admin/ProcessOrder.js';
import UsersList from './component/Admin/UsersList.js';
import UpdateUser from './component/Admin/UpdateUser.js';
import ProductReviews from './component/Admin/ProductReviews.js';


function App() {

    const {isAuthenticated,user} = useSelector(state=>state.user);


  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Drold","Chilanka"],
      }
    });
    store.dispatch(loadUser());
  },[])
  return <Router>
  <Header/>

  {isAuthenticated && <UserOptions user={user}/>}
  <Route exact path="/" component={Home}/>
  <Route exact path="/product/:id" component={ProductDetails}/>
  <Route exact path="/products" component={Products}/>
  <Route  path="/products/:keyword" component={Products}/>


  <Route exact path="/search" component={Search}/>


  <ProtectedRoute exact path="/account" component={Profile}/>  
  <ProtectedRoute exact path="/me/update" component={updateProfile}/>  

  <ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />

      <Route exact path="/password/forgot" component={ForgotPassword} />

        <Route exact path="/password/reset/:token" component={ResetPassword} />

  <Route exact path="/login" component={LoginSignUp} />
  <Route exact path="/cart" component={cart}/>
  <ProtectedRoute exact path="/shipping" component={Shipping}/>

  <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder}/>
  {/* <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        /> */}
        <Route exact path="/process/payment" component={Payment}/>

         <ProtectedRoute exact path="/orders" component={MyOrders}/>
         <ProtectedRoute exact path="/orders/:id" component={OrderDetails}/>

         <ProtectedRoute isAdmin={true} exact path="/admin/dashboard" component={Dashboard} />

         <ProtectedRoute
          exact
         
          path="/admin/products"
          isadmin={true}
          
          component={ProductList}
        />

        <ProtectedRoute
          exact
          path="/admin/product"
          isAdmin={true}
          component={NewProduct}
        />

        <ProtectedRoute
          exact
          path="/admin/product/:id"
          isAdmin={true}
          component={UpdateProduct}
        />

        <ProtectedRoute
        exact
        path="/admin/orders"
        isAdmin={true}
        component={OrderList}
        />

        <ProtectedRoute
        exact
        path="/admin/order/:id"
        isAdmin={true}
        component={ProcessOrder}
        />

        <ProtectedRoute
        exact
        path="/admin/users"
        isAdmin={true}
        component={UsersList}
        />

        <ProtectedRoute
        exact
        path="/admin/user/:id"
        isAdmin={true}
        component={UpdateUser}
        />

        <ProtectedRoute
        exact
        path="/admin/reviews"
        isAdmin={true}
        component={ProductReviews}
        />


  <Footer/>
  </Router>

 
    
 
}

export default App;
