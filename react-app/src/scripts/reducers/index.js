import {combineReducers} from "redux-immutable";

import {data} from "./data"
import {user} from "./user"
import {address} from "./address"
import {shopcar} from "./shopcar"
export const reducers = combineReducers({
  data:data,
  user:user,
  address:address,
  shopcar:shopcar
})