import "./index.scss"
import React, {Component} from "react"
import { 
    Button, 
    WhiteSpace, 
    WingBlank ,
    NoticeBar,
    List ,
    InputItem,
} from 'antd-mobile';
import Head from "~/components/head"
import {axios} from "&";

export const mReg = /^1(3|5|6|7|8|9)\d{9}$/;
export const cReg = /^\d{6}$/
var timer = null
export default class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            codeFlag:false,
            loginFlag:false,
            count:60,
            txt:"发送验证码",
            toggle:true
        }
    }
    handleCheckMobile=(mobile)=>{
        var code = this.code.state.value
        if(this.state.toggle){
            this.setState({
                codeFlag:mReg.test(mobile),
                loginFlag:cReg.test(mobile)&&cReg.test(code)
            })
        }
    }
    handleChangeCode=(code)=>{
        var mobile = this.mobile.state.value;
        this.setState({
            loginFlag:mReg.test(mobile)&&cReg.test(code)
        })
    }
    start=()=>{
        if(this.state.count>1){
            this.setState({
                count:--this.state.count,
                txt:`${this.state.count}s后发送`,
                codeFlag:false,
                toggle:false
            })
        }else{
            clearInterval(timer);
            timer=null
            this.setState({
                count:60,
                txt:'发送验证码',
                codeFlag:true,
                toggle:true
            })
        }
    }
    computedTime=()=>{
        this.start()
        timer = setInterval(this.start,1000);
    }
    handleSendCode=()=>{
        this.computedTime()
        axios.post("/react/aly/sendSms",{
            mobile:this.mobile.state.value
        }).then(res=>{

        })
    }
    handleSubmit=()=>{
        axios.post('/react/checkCode',{
            mobile:this.mobile.state.value,
            code:this.code.state.value
        }).then(res=>{
            if(!!res.data.type){
                sessionStorage.token = res.data.token;
                sessionStorage.mobile = this.mobile.state.value;
                clearInterval(timer);
                timer=null
                this.props.history.push("/main/mine");
                
                
            }else{
                sessionStorage.token = "";
                sessionStorage.mobile=""
            }
        })
    }

    render(){
        const {
            codeFlag,
            loginFlag,
            txt
        } = this.state
        return (
            <div className="bigbox">
                <Head title="验证码登录" show={true} login={true} search={true}/>
                <div className="l-box">
                <WingBlank>
                    <List>
                        <WhiteSpace/>
                        <InputItem
                            type="tel"
                            clear
                            placeholder="请输入手机号"
                            ref={el => this.mobile = el}
                            onChange={this.handleCheckMobile}
                             >手机号</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            type="number"
                            
                            placeholder="请输入验证码"
                            ref={el => this.code = el}
                            onChange={this.handleChangeCode}
                            >验证码</InputItem>
                        <Button
                        className="l-btn" 
                        inline 
                        size="small"
                        disabled={!codeFlag}
                        onClick={this.handleSendCode}
                        >{txt}</Button>
                            <WhiteSpace/>
                            <Button 
                            disabled={!loginFlag}
                            onClick={this.handleSubmit}
                            className="toLogin"
                            >立即登录</Button>
                    </List>
                </WingBlank>
                </div>
                
                
            </div>
        )
    }
}