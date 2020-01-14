import {createHashHistory} from "history"; 
export {msg} from "./msg"
export {config} from "./config"

export const commonCss={
    all:{
        padding:0,
        maigin:0
    },
    three:{
        color:"red",
        fontSize:40,
        backgroundColor:"#eee",
        
    }
}

export const commonJS = {
    move(){
        console.log('这是鼠标滑动事件')
    },
    touch(){
        console.log('这是触摸事件')
    }
}
export {axios,baseURL} from "./axios"
export const history = new createHashHistory();




