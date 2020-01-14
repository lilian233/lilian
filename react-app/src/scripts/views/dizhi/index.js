import "./index.scss"
import React, { Component } from "react";
import Head from "~/components/head"
import { connect } from "react-redux"
import { getAddress } from "../../actions";
import { List, Radio ,Button } from 'antd-mobile';
import {axios} from "&"
import address from "~/mobx/address"
import { observer } from "mobx-react"
const RadioItem = Radio.RadioItem;
@connect(
    state => {
        return {
            addressList: state.getIn(['address', 'addressList']),
            delList: state.getIn(['address', 'delList']),
            updateList:state.getIn(['address','updateList'])
        }
    }
)
@observer
class Address extends Component {
    state = {
        value: 0,
        
      };
    componentDidMount() {
        const {
            dispatch,
            addressList,
          
        } = this.props;
        console.log(addressList)
        dispatch(getAddress({ url: '/react/getAddress' }))
    }
    onChange = (value,id,e) => {
        console.log(id);
        console.log(e.target.checked)
        this.setState({
          value,
        });
        const {
            addressList
        } = address
        address.changeAddChecked(e.target.checked, id);
        setTimeout(()=>{

            this.props.history.go(0)
        },1000)

      };
    handleGoAdd=()=>{
        this.props.history.push('/xinzengdizhi')
    }
    handleGotoBuy=()=>{
        this.props.history.push('/buy')

    }
    handleDel=(s)=>{
        const {
            
            delList
        } = this.props;
        console.log(this.props.addressList[s])  
        delList.splice(0) 
        delList.push(this.props.addressList[s])
        console.log(delList)
        axios.post('/react/delAddress').then(res=>{
            if(!!res.data.type){               
                this.props.history.go(0)
            }
        })

    }
    handleUpdate=(v)=>{
        const {
            addressList,

            updateList
        } = this.props
        console.log(addressList)  
        updateList.splice(0) 
        updateList.push(this.props.addressList[v])
        sessionStorage.updateList=JSON.stringify(updateList)
      
      
            this.props.history.push('/updatedizhi')

   
        

    }
    render() {
        const {
            addressList,
            delList
        } = this.props
        console.log(this.props)
        const { value } = this.state;
        const data = [
          { value: 0, label: 'doctor' },
          { value: 1, label: 'bachelor' },
        ];
        return (
            <div className="d-addbox">
                <Head title="收货地址" search={true} show={true}></Head>
                <List className="a-list">
                    {
                        addressList.map((add, i) => {
                            return (
                                <div key={i} className="a-smallBox">
                                    <RadioItem key={i} checked={add.isDefault} onChange={(e) => this.onChange(i,add._id,e)}>
                                        <p>{add.name} <span>{add.tel}</span></p>
                                        <p>{add.address}</p>
                                       
                                   </RadioItem>                              
                                </div>
                            )
                        })
                    }
                </List>
                <Button className="d-queren" onClick={this.handleGotoBuy}>确认收货地址</Button>
                <Button className="d-adda"  onClick={this.handleGoAdd}>新增收货地址</Button>
                <div className="dd-box">
            <Button className="d-del" inline onClick={()=>this.handleDel(this.state.value)}>删除收货地址</Button>
                <Button className="d-update" inline onClick={()=>this.handleUpdate(this.state.value)}>修改收货地址</Button>
            
                
                </div>

            </div>
        )
    }

}
export default Address;