import {legacy_createStore as createStore,combineReducers,applyMiddleware} from "redux"
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { productDetailsReducer, productReducer } from "./reducers/productReducer";

const reducer=combineReducers({
    products:productReducer,
    productDetails:productDetailsReducer
});

let initialState={};

const middleware=[thunk];

const store=createStore(
    reducer,initialState,composeWithDevTools(applyMiddleware(...middleware))  
)

export default store;