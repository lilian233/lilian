
import immutable from "immutable"

const defaultState = {

  addList:[],
  checkList:[]

}

export const shopcar = (state=defaultState,action)=>{
    switch(action.type){
            case "getShopCar":
                // return state.set("addressList", action.payload);
                return {...state,"addList": action.payload}
                break;
            case "delShopCar":
              return {}
              break;
              
        default:
        return state;
        break;
    }
}