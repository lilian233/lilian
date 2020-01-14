import "./index.scss"
import React, { Component } from "react";
import Head from "~/components/head"
import { connect } from "react-redux"
import { getAddress } from "../../actions";
import {axios} from "&"
import { List, InputItem, WhiteSpace, Picker } from 'antd-mobile';
const CustomChildren = props => (
    <div
        onClick={props.onClick}
        style={{ backgroundColor: '#fff', paddingLeft: 15 }}
    >
        <div className="test" style={{ display: 'flex', height: '45px', lineHeight: '45px', position: 'relative', borderBottom: 0 }}>
            <div style={{ flex: 0.28, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{props.children}</div>
            <div style={{  flex: 0.8,textAlign: 'left', color: '#999', marginRight: 15 }}>{props.extra}</div>
        </div>
    </div>
);

let antdDistrict = [];

let districtData = require('&/area.json');

@connect(
    state => {
        return {
            userList:state.getIn(['address','userList'])
        }
    }
)
class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pickerValue: [],
            bingAddress1:[],
            
        };
    }
    componentDidMount(){
        
    }
    handleClick=()=>{
        const {
            userList
        } = this.props
       
    if(this.state.pickerValue!=''){
        var a1;
        var a2;
        var a3
           a1= antdDistrict.filter(value=>{
                return value.value== this.state.pickerValue[0]
            })
                            
        console.log(a1)
        this.state.bingAddress1.push(a1[0].label)
           
          a2= a1[0].children.filter(val=>{
                console.log(val)
                return val.value== this.state.pickerValue[1]
            })
        a2.map((ixx,i)=>{
            this.state.bingAddress1.push(ixx.label)
   
            a3=ixx.children.filter(val=>{
                console.log(val)
                return val.value== this.state.pickerValue[2]
            })
        })
        a3.map((value,i)=>{
            this.state.bingAddress1.push(value.label)
        })
        var bingAddress=this.state.bingAddress1.toString()
        console.log(bingAddress)
      
    }
    userList.bigaddress=bingAddress
    userList.name=this.autoFocusInst.state.value
    userList.tel=this.inputRef.state.value
    userList.xiangXiAddress = this.xiangxi.state.value
    userList.mobile=sessionStorage.mobile
    userList.address=bingAddress+' '+this.xiangxi.state.value
    console.log(userList) 
    
    axios.post('/react/addAddress',userList).then(res=>{
        if(!!res.data.type){

            this.props.history.push('/dizhi')
       
        }else{
           
        }
    })
    }
    render() {
        const {
            userList
        } = this.props

        Object.keys(districtData).forEach((index) => {
            let itemLevel1 = {};
            let itemLevel2 = {};
            itemLevel1.value = districtData[index].code;
            itemLevel1.label = districtData[index].name;
            itemLevel1.children = [];
            let data = districtData[index].cities;
            Object.keys(data).forEach((index) => {
                itemLevel2.value = data[index].code;
                itemLevel2.label = data[index].name;
                itemLevel2.children = [];
                let data2 = data[index].districts;
                let itemLevel3 = {};
                itemLevel3.children = [];
                Object.keys(data2).forEach((index) => {
                    itemLevel3.value = index;
                    itemLevel3.label = data2[index];
                    itemLevel2.children.push(itemLevel3);
                    itemLevel3 = {};
                });
                itemLevel1.children.push(itemLevel2);
                itemLevel2 = {};
            });
            antdDistrict.push(itemLevel1)
          

        });
      
   
        return (
            <div>
                <Head title="新增地址" show={true} search={true}></Head>
                <List >
                    <InputItem

                        clear
                        placeholder="2到6位中文"
                        ref={el => this.autoFocusInst = el}
                    >收货人</InputItem>
                    <InputItem

                        clear
                        placeholder="请输入正确的手机号格式"
                        ref={el => this.inputRef = el}
                    >手机号</InputItem>
                    <Picker
                        title="选择地区"
                        extra="请选择(可选)"
                        data={antdDistrict}
                        value={this.state.pickerValue}
                        onChange={v => this.setState({ pickerValue: v })}
                        onOk={v => this.setState({ pickerValue: v })}
                        onClick={() => { console.log('xx') }}
                    >

                        <CustomChildren className="a-childOne">省市区</CustomChildren>

                    </Picker>
                    <InputItem

                        clear
                        placeholder="请输入详细地址"
                        ref={el => this.xiangxi = el}
                    >详细地址
                    </InputItem>
                    <List.Item>
                        <div
                            style={{ width: '100%', color: '#1b522d', textAlign: 'center' }}
                            onClick={this.handleClick}
                        >
                            确认新增
                        </div>
                    </List.Item>
                </List>
            </div>
        )
    }
}
export default Address;