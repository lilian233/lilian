import "./index.scss"
import React, { Component } from "react"
import Head from "~/components/head"
import { axios } from "&"
import {
    List,
    Card, WingBlank, WhiteSpace,
    Button,
    Result, Icon,
    Modal,
    Radio
} from "antd-mobile"


import shopcar from "~/mobx/shopcar"
import address from "~/mobx/address"

import { observer } from "mobx-react"
const Item = List.Item;
const RadioItem = Radio.RadioItem;
@observer
class BuyIt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal1: false,
            modal2: false,
            thq: 0

        };
    }
    componentDidMount() {
        const {
            addressList
        } = address
        shopcar.getChecked()


        address.getAddress()


    }

    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }
    onClose = key => () => {
        const {
            yhq
        } = shopcar;
        this.setState({
            [key]: false,
        });
        this.setState({
            thq: -yhq,
        });


    }
    handleChangeAdd = () => {
        this.props.history.push('/dizhi')
    }
    onChange = (i, e) => {
        console.log(e.target)
        console.log(i)
        this.setState({
            value: i,
        });

    }
    render() {
        const { value, thq } = this.state;

        const {

            checkedList,
            totalcount,
            data,
            yh
        } = shopcar;
        const {
            addressList,
            youhui

        } = address
        return (
            <div>
                <Head title="结算" search={true} show={true}></Head>
                {addressList && <div>
                    <WingBlank size="lg">
                        <WhiteSpace size="sm" />
                        <Card>
                            <Card.Header
                                title='收货地址'
                            // thumb={item.image}

                            />
                            <Card.Body>
                                <div>
                                    <span>{addressList.name}</span>
                                    <span>{addressList.tel}</span>


                                </div>
                                <div>
                                    {addressList.address}
                                </div>
                            </Card.Body>
                            <Card.Footer extra='更换地址' onClick={this.handleChangeAdd} />
                        </Card>

                    </WingBlank>
                </div>
                }
                {!addressList && <div>
                    <WingBlank size="lg">
                        <WhiteSpace size="sm" />
                        <Card>
                            <Card.Header
                                title='收货地址'
                            // thumb={item.image}

                            />
                            {/* <Card.Body>
                                <div>
                                   


                                </div>
                                
                            </Card.Body> */}
                            <Card.Footer extra='+新增地址' onClick={this.handleChangeAdd} />
                        </Card>

                    </WingBlank>
                </div>
                }
                <div className="b-bottom">


                    {
                        checkedList.map((item, i) => {
                            return (
                                <div key={i}>
                                    <WingBlank size="lg">
                                        <WhiteSpace size="sm" />
                                        <Card>
                                            <Card.Header
                                                title={item.name}
                                            // thumb={item.image}

                                            />
                                            <Card.Body>
                                                <img src={item.image} />
                                                <div className="b-count"><p>¥{item.price}</p>数量 {item.count}</div>
                                                <div className="b-total">¥{item.price * item.count}</div>
                                            </Card.Body>
                                            <Card.Footer content='全国包邮免配送费' extra='不支持七天无理由退换货' />
                                        </Card>

                                    </WingBlank>


                                </div>
                            )
                        })
                    }
                    <WhiteSpace/>
                     <WingBlank>
                    <List className="my-list">                       
                        <Item className=" b-yhqxz" extra={<div>¥{thq}</div>} arrow="horizontal" multipleLine onClick={this.showModal('modal2')}>优惠券</Item>                      
                    </List>
                    </WingBlank>
                    <div className="buyit"><Button inline className="payit" onClick={this.showModal('modal1')}>立即支付¥{totalcount + thq}</Button></div>
                </div>
                <Modal
                    visible={this.state.modal1}
                    transparent
                    maskClosable={false}
                    onClose={this.onClose('modal1')}
                    title="支付失败"
                    footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                    afterClose={() => { this.props.history.push('/main/mine') }}
                >
                    <div style={{ height: 100, overflow: 'scroll' }}>
                        <Result
                            img={<Icon type="cross-circle-o" className="spe" style={{ fill: '#F13642' }} />}

                            message="余额不足"
                        />
                    </div>
                </Modal>
                <Modal
                    popup
                    visible={this.state.modal2}
                    onClose={this.onClose('modal2')}
                    animationType="slide-up"

                >
                    <List renderHeader={() => <div>选择优惠券</div>} className="popup-list">
                        {data.map((i, index) => (
                            <RadioItem key={index} checked={value === i.value} onChange={(e) => this.onChange(i.value, e)}>
                                <ul className="tr"  >

                                    <li style={{ width: "20%", float: 'left', marginTop: '0.6rem' }}><span style={{ lineHeight: "20px", textAlign: 'left', color: 'red' }}>￥{i.price}</span> </li>
                                    <li style={{ width: "31%", float: 'left' }}>
                                        <p style={{ lineHeight: "16px", marginTop: '0.2rem', textAlign: 'left', fontSize: '14px' }}>{i.title}</p>
                                        <p style={{ lineHeight: "16px", marginTop: '0.2rem', textAlign: 'left', fontSize: '14px' }}>{i.msg1}</p>
                                        <p style={{ lineHeight: "16px", marginTop: '0.2rem', textAlign: 'left', fontSize: '14px' }}>{i.msg2}</p>

                                    </li>


                                </ul>
                            </RadioItem>
                        ))}
                        <List.Item>
                            <Button className="checkYhq" onClick={this.onClose('modal2')}>确认选择</Button>
                        </List.Item>
                    </List>
                </Modal>
            </div>
        )
    }
}
export default BuyIt;