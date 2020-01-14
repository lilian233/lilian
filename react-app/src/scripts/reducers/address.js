
import immutable from "immutable"

const defaultState = {
  addressList:[],
  delList:[],
  updateList:[],
  value:0,
  userList:{
      name:'aaa',
      tel:null,
      address:'aaa',
      xiangXiAddress:'aaa',
      bigaddress:'aaa',
      mobile:null,
      isDefault:false,
      id:null
  },
  searchList:[],

}

export const address = (state=defaultState,action)=>{
    switch(action.type){

        case "getAddress":
            // return state.set("addressList", action.payload);
            return {...state,"addressList": action.payload}
            break;
            case "getSearch":
                // return state.set("addressList", action.payload);
                return {...state,"searchList": action.payload}
                break;

        default:
        return state;
        break;
    }
}