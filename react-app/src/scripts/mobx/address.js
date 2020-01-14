import {observable, action, computed, autorun} from  "mobx"
import {axios} from "&"
class Address {
    @observable addressList = {} ; 
    @observable youhui = 0 ; // 选中地址数据 
    @action changeAddChecked = (checked,id)=>{
        axios.post("/react/changeAddChecked",{
            checked,
            id
        }).then(res=>{
            // this.addressList = this.addressList .map((item)=>{
            //     if(item.id==id){
            //         item.checked = checked
            //     }
            //     return item;
            // })
        })
        
    }
    @action getAddress = ()=>{
        axios.get('/react/getCheckedAddress').then(res=>{
            this.addressList=res.data.result
        })
    }

}
export default new Address()