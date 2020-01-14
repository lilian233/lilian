import {stringify} from "querystring";
export const http = {
    get(url,{params}){
       const promise = new Promise(function(resolve,reject){
           const handle = function(){
               if(this.readyState !==4){
                   return ""
               }
               if(this.status == 200){
                    resolve({data:this.response})
               }else{
                    reject(new Error(this.statusText))
               }
           }
           var client = new XMLHttpRequest();
           params = stringify(params);
           client.open("GET",url+"?"+params);
           client.responseType = "json";
           client.setRequestHeader('Accept',"application/json");
           client.onreadystatechange = handle;
           client.send()
       }) 
       return promise
    }
}