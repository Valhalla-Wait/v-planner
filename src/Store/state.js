import { createStore, combineReducers, applyMiddleware } from "redux";
import userReducer from "./Reducers/UserReducer";
import matchListReducer from "./Reducers/MatchList";
import LikedVendors from "./Reducers/LikedVendors";
import DetailVendor from "./Reducers/VendorInfoReducer";
import chatReducer from "./Reducers/Chat";
import vendorsReducer from "./Reducers/Admin/VendorsReducer"
import clientsReducer from "./Reducers/Admin/ClientsReducer"
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from "redux-thunk";
import quotesReducer from "./Reducers/Quotes";

const reducers = combineReducers({
  userInfo: userReducer,
  matchList: matchListReducer,
  myVendors: LikedVendors,
  vendorMore:DetailVendor,
  chat:chatReducer,
  quotes: quotesReducer,
  vendors: vendorsReducer,
  clients: clientsReducer,
});
const reduxDevTools = composeWithDevTools(
    applyMiddleware(thunk)
)
export const store = createStore(reducers,reduxDevTools);
