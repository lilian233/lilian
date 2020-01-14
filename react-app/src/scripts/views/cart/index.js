import "./index.scss"
import React, { Component } from "react"
import Head from "~/components/head"
import { axios } from "&"
import {
    Button,
    Modal,
    Toast,
    List, Checkbox, Flex
} from "antd-mobile"
import { connect } from "react-redux"
import { getShopCar } from "../../actions";
import shopcar from "~/mobx/shopcar"
import { observer } from "mobx-react"
const CheckboxItem = Checkbox.CheckboxItem;
const alert = Modal.alert;
const showAlert = (that) => {
    const alertInstance = alert('提示', '请登录后访问购物车', [
        { text: '取消', onPress: () => that.props.history.go(-1), style: 'default' },
        { text: '登录', onPress: () => that.props.history.push("/login"), style: 'default' },
    ]);
    setTimeout(() => {
        // 可以调用close方法以在外部close
        console.log('auto close');
        alertInstance.close();
    }, 500000);
};
@connect(
    state => {
        return {
            addList: state.getIn(['shopcar', 'addList']),
            checkList: state.getIn(['shopcar', 'checkList'])

        }
    }
)
@observer

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: !!sessionStorage.token,
            mobile: null,
            styleFlag: 'defult'
        }
    }
    componentWillMount() {
        if (!sessionStorage.token) {
            showAlert(this);
        }
    }
    componentDidMount() {
        const {
            addList,
            dispatch
        } = this.props
        axios.post("/react/getMobile").then(res => {
            this.setState({
                mobile: res.data.result
            })
        })
        // dispatch(getShopCar({ url: '/react/getShopCar' }))
        if (sessionStorage.token) {
          
            shopcar.getCarList("/react/getShopCar");
        }


    }
    handleGotoLogin = () => {
        this.props.history.push('/login')
    }
    onChange = (e) => {
        console.log(e)
        shopcar.changeOneChecked(e.target.checked, e.target.id);

        // const{

        //     checkList
        // } = this.props
        // console.log(this.props.addList[val]);
        // console.log(e.target.checked)

        //     if(!!e.target.checked){

        //         this.props.checkList.push(this.props.addList[val])
        //     }else{
        //         this.props.checkList.map((item,i)=>{
        //         this.props.checkList.splice(item.id,1)

        //      const getIndex = ((arr,item)=>{
        //                 for(var i in arr){
        //                     if(arr[i] == item){
        //                     return i;
        //                     };
        //                 };
        //             });




        //             var idx =  getIndex(this.props.checkList,item.id);
        //             console.log(idx)
        //         })
        //     }

        //     console.log( this.props.checkList)
    }
    checkAll = (e) => {
        console.log(e.target.checked);
        // shopcar.quan =   e.target.checked;
        shopcar.changeQuan(e.target.checked);
    }
    reduce = (id, count) => {
        if (count > 1) {
            shopcar.changeOneCount(id, false);
        }
    }

    add = (id, count) => {

        shopcar.changeOneCount(id, true);
    }
    changeCount = (id, v) => {
        console.log(v.target.value);
        if (v.target.value > 1) {
            shopcar.changeOneCountNum(id, v.target.value * 1)
        }
    }
    delSelect = () => {
        shopcar.delSelect();
    }
    handleGotoShop = () => {
        this.props.history.push('/main/classify')

    }
    handleBuyIt=()=>{
        this.props.history.push('/buy')

    }
    render() {
        const {
            isLogin,
            mobile,

        } = this.state

        const {
            carList,
            quan,
            total,
            carNum
        } = shopcar;

        return (
            <div className="ss-bigbox">
                <Head title="购物车"></Head>
                {
                    isLogin && <div>

                        <div className="s-box" >
                            {carList.map((item, idx) => (
                                <ul className="tr" key={idx} id={item._id}>
                                <li style={{ width: "11%" }}>
                                <Checkbox
                                
                                        onChange={(e) => this.onChange(e)}
                                        checked={item.checked}
                                        id={item.id}

                                    ></Checkbox>
                                </li>
                                <li style={{ width: "20%" }}><img src={item.image} /></li>
                                <li style={{ width: "31%" }}>
                                    <p style={{ lineHeight: "18px", marginTop: '0.2rem',textAlign:'left' }}>{item.name}</p>
                                    <p style={{ lineHeight: "18px" ,textAlign:'left'}}>￥{item.price}</p>
                                </li>
                                <li style={{ width: "20%" }}>
                                    <span style={{ fontSize: '14px', marginRight: '3px' }} onClick={() => this.reduce(item.id, item.count)}>-</span>
                                    <input goodsid={item.id} type="text" value={item.count} onChange={(v) => { this.changeCount(item.id, v) }} style={{ width: "0.5rem", fontSize: '14px', textAlign: 'center', background: 'none', border: '0' }} />
                                    <span style={{ fontSize: '14px' }} onClick={() => this.add(item.id, item.count)}>+</span>
                                </li>
                                    <div className="s-total">¥{item.count * item.price}</div>
                            </ul>
                                // <div className="s-bigbox" key={idx}>


                                //     <Checkbox
                                //         className="s-check"
                                //         onChange={(e) => this.onChange(e)}
                                //         checked={item.checked}
                                //         id={item.id}

                                //     ></Checkbox>
                                //     <img src={item.image} alt="" className="s-img" />
                                //     <div className="s-name"> {item.name}</div>
                                //     <div className="s-smallbox">
                                //         <div className="s-price">¥{item.price}</div>
                                //         <div className="s-step">
                                //             <span style={{ fontSize: '22px', marginRight: '3px' }} onClick={() => this.reduce(item.id, item.count)}>-</span>
                                //             <input goodsid={item.goodId} type="text" value={item.count} onChange={(v) => { this.changeCount(item.id, v) }} style={{ width: "30px", fontSize: '16px', textAlign: 'center', background: 'none', border: '0' }} />
                                //             <span style={{ fontSize: '22px' }} onClick={() => this.add(item.id, item.count)}>+</span>
                                //         </div>
                                //     </div>
                                //     <div className="s-total">¥{item.count * item.price}</div>



                                // </div>
                            ))}

                        </div>
                        <div>
                            <p className="cc-heji">
                               <span className="cc-total"> 合计:<span style={{color:'darkgreen'}}> ¥{total}</span> </span>
                               <span className="cc-carNum" > 选中数量:<span style={{color:'darkgreen'}}>{carNum}</span> </span>
                            </p>
                           
                        </div>
                        <div className="dc-shop sc-bottom">
                        <Checkbox style={{ float: 'left', marginLeft: '2%', lineHeight: '30px', }} onClick={this.checkAll} checked={quan} ></Checkbox>
    
                        
                        <div className="dc-gotoShop">
    
                            <i className="iconfont icon-shop_car"></i>
                            <p onClick={this.handleGotoShop}>继续选购</p>
    
                        </div>
                        <div className="dc-add">
                            <Button className="dc-addCar" inline onClick={() => this.delSelect()}>移除选中</Button>
                            <Button className="dc-buy" inline onClick={() => this.handleBuyIt()}>立即下单</Button>
                        </div>
                    </div>
                    </div>
                }
                   
    
                </div>
        )
    }
}
export default Cart;