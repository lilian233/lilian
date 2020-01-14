import "./index.scss"
import React, { Component } from "react"
import Head from "~/components/head"
import {
    Button,
    Toast,
    Modal,
    Grid,
    Icon,
    Result
} from "antd-mobile"
import {
    NavLink
} from "react-router-dom"
import { axios } from "&"
import UploadImg from "~/components/uploadImg"
const alert = Modal.alert;
const showAlert = (that) => {
    const alertInstance = alert('提示', '请登录后访问', [
        { text: '取消', onPress: () => console.log(66), style: 'default' },
        { text: '登录', onPress: () => that.props.history.push("/login"), style: 'default' },
    ]);
    setTimeout(() => {
        // 可以调用close方法以在外部close
        console.log('auto close');
        alertInstance.close();
    }, 500000);
};
const server = [
    { icon: 'check-circle', txt: '收货地址' },
    { icon: 'check-circle-o', txt: '联系客服' },
    { icon: 'check-circle', txt: '开票说明' },
    { icon: 'check-circle-o', txt: '评价记录' },
    { icon: 'check-circle', txt: '售后记录' },
    { icon: 'check-circle-o', txt: '意见反馈' }
]
const jilu = [
    { icon: 'ellipsis', txt: '待付款' },
    { icon: 'ellipsis', txt: '待收货' },
    { icon: 'ellipsis', txt: '待评价' },
    { icon: 'ellipsis', txt: '我的收藏' },
]
const data = server.map((val, i) => ({
    icon: (<Icon type={val.icon} color="#35643b" />),
    text: val.txt,
}));
const list = jilu.map((val, i) => ({
    icon: (<Icon type={val.icon} color="#35643b" />),
    text: val.txt,
}));
export default class Mine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: !!sessionStorage.token,
            mobile: null,
            modal1: false,
            modal2: false,
            avatar: require("@/assets/images/avatar3.jpg"),
            wx: require("@/assets/images/erweimawx.jpg"),
            zfb: require("@/assets/images/erweimazfb.jpg"),

            yh: [
                { txt: "充值", path: "/mine/chongzhi", name: "chongzhi", icon: "icon-hongbao" },
                { txt: "优惠券", path: "/mine/youhui", name: "youhui", icon: "icon-youhui" },
                { txt: "余额", path: "/mine/yue", name: "yue", icon: "icon-jizhang" },
            ],
            server: [
                { icon: '', txt: '收货地址' },
                { icon: '', txt: '联系客服' },
                { icon: '', txt: '开票说明' },
                { icon: '', txt: '评价记录' },
                { icon: '', txt: '售后记录' },
                { icon: '', txt: '意见反馈' }
            ],


        }
    }
    componentDidMount() {
        axios.post("/react/getMobile").then(res => {
            this.setState({
                mobile: res.data.result
            })
        })

    }
    handleGotoLogin = () => {
        this.props.history.push('/login')
    }

    handleLoginOut = () => {
        // sessionStorage.mobile = "",
        sessionStorage.clear()

        this.props.history.go(0)

    }
    handleGoto = (index, i) => {
        console.log(i)
        if (i == 0) {
            this.props.history.push('/dizhi')
        }
        if (i == 1) {
            this.props.history.push('/chat')
        }
        if (i == 3) {
            this.props.history.push('/commentlist')

        }
    }
    handleLoad = (index, i) => {
        console.log(i)
        if (i == 0) {
            this.props.history.push('/buy')
        }
        if (i == 2) {
            this.props.history.push('/comments')

        }
        if (i == 3) {
            this.props.history.push('/collection')

        }
     
    }
    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }

    // onClick = (idx) => {
    //     if (idx == 0) {

    //         this.showModal('modal1')
    //     }


    // }
    handleClickYh = () => {
        showAlert(this);
    }
    render() {
        const {
            isLogin,
            mobile,
            avatar,
            yh,
            server,
            value,
            wx,
            zfb

        } = this.state

        return (
            <div className="mine-box">
                <Head title="个人中心"></Head>
                {
                    isLogin && <div>
                        <div className="m-headCar">
                            <UploadImg className="img" />
                            <h2>欢迎您：{mobile}</h2>
                            <Button onClick={this.handleLoginOut} inline className="m-loginOut">退出登录</Button>
                            <div className="yhq">
                                {
                                    yh.map((yh, i) => {
                                        return (
                                            <div key={i} className="yhqitem" >

                                                <div onClick={i==0&&this.showModal('modal1')} >
                                                    <i className={"iconfont " + "yhicon "+yh.icon}> </i>
                                                    <p> {yh.txt} </p>

                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <Grid data={list} hasLine={false} onClick={this.handleLoad} />
                        <div className="m-jgg">
                            <Grid data={data} activeStyle={false} columnNum={3} onClick={this.handleGoto} />
                        </div>
                        <Modal
                            visible={this.state.modal1}
                            transparent
                            maskClosable={false}
                            onClose={this.onClose('modal1')}
                            title="充值"
                            footer={[{ text: 'Ok', onPress: () => { console.log('充值失败'); this.onClose('modal1')(); } }]}
                            wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                            afterClose={() => { alert('充值失败'); }}
                        >
                            <div style={{ height: 350, overflow: 'scroll' }}>
                                微信充值<br />
                                <img src={wx} style={{ width: "100%", overflow: 'scroll' }} /><br />
                                支付宝充值<br />
                                <img src={zfb} style={{ width: "100%", overflow: 'scroll' }} /><br />
                                <br />
                            
                            </div>
                        </Modal>
                        
                    </div>
                }
                {
                    !isLogin && <div>
                        <div className="m-headCar">
                            <img src={avatar} alt="" className="img" />
                            <h2>你还没有登录,请马上登录</h2>
                            <Button onClick={this.handleGotoLogin} inline className="m-gotoLogin">登录</Button>
                            <div className="yhq">

                                {
                                    yh.map((yh, i) => {
                                        return (
                                            <div key={i} className="yhqitem" >

                                                <div onClick={this.handleClickYh} >
                                                    <i className={"iconfont " + yh.icon}> </i>
                                                    <p> {yh.txt} </p>

                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <Grid data={list} hasLine={false} onClick={this.handleClickYh} />

                        <div className="m-jgg">
                            <Grid data={data} activeStyle={false} columnNum={3} onClick={this.handleClickYh} />
                        </div>
                    </div>
                }
            </div>
        )
    }
}