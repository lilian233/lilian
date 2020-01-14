import {axios} from "&"

export function changeCount(payload){
    return {
        type:"changeCount",
        payload
    }
}
export async function getMobile({url}){
    const res = await axios.post(url);
    return {
        type:"changeUser",
        payload:{
            mobile:res.data.result
        }
    }
} 

export const changeUser = (payload)=>{
    return {
        type:"changeUser",
        payload
    }
}
export async function getGoodList({url,params}){
    const res = await axios.get(url,{params});
    return {
        type:"getGoodList",
        payload:res.data.result
    }
} 

export async function getGoodDetail({url,params}){
    const res = await axios.get(url,{params});
    return {
        type:"getGoodDetail",
        payload:res.data.result
    }
}
export async function getAddress({url,params}){
    const res = await axios.get(url,{params});
    return {
        type:"getAddress",
        payload:res.data.result
    }
}

export async function getSearch({url,params}){
    const res = await axios.post(url,{params});
    return {
        type:'getSearch',
        payload:res.data.result
    }
}
export async function addShopcar({url,params}){
    const res = await axios.post(url,{params});
    return {
        type:'addShopcar',
        payload:res.data.result
    }
}
export async function getShopCar({url,params}){
    const res = await axios.get(url,{params});
    return {
        type:"getShopCar",
        payload:res.data.result
    }
}
export async function delShopCar({url,params}){
    const res = await axios.post(url,{params})
    return {
        type:'delShopCar',
        payload:res.data.rusult
    }
}
export async function addCollection({url,params}){
    const res = await axios.post(url,{params});
    return {
        type:'addCollection',
        payload:res.data.result
    }
}