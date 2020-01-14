import "./index.scss"
import React, { Component } from "react"
import { Drawer, List, NavBar, Icon } from 'antd-mobile';
import Head from "~/components/head"
import Goods from "~/components/goods"
import {
    Link
} from "react-router-dom"
import { axios } from "&";
import { connect } from "react-redux"
import { getGoodList, getGoodType } from "../../actions";
@connect(
    state => {
        return {
            goodList: state.getIn(['data', 'goodList']),

        }
    }
)
class Classify extends Component {
    state = {
        docked: true,
        list: ["分类", "生日", "表白", "纪念日", "问候", "开业", "探望", "玫瑰", "郁金香", "向日葵", "马蹄莲", "康乃馨",
            "百合", "洋桔梗", "雏菊", "绣球", "闺蜜", "基友", "爸爸", "妈妈", "领导", "客户", "同学"],
        name: "active",
        data: []
    }
    onDock = (d) => {
        this.setState({
            [d]: !this.state[d],
        });
    }
    componentDidMount() {
        const {
            dispatch,
            goodList,
            goodType
        } = this.props;
        if (!goodList.length > 0) {
            dispatch(getGoodList({ url: "/react/getGoods" }))
        }


    }
    render() {
        const {
            list,
            data
        } = this.state
        const {
            goodList,
            goodType
        } = this.props;
        const sidebar = (<List >
            {list.map((i, index) => {
                if (index === 0) {
                    return (<List.Item key={index}
                        // thumb="https://static.bloomapp.com.cn/09b18ab2c453f2a43c41.png?imageMogr2/auto-orient"
                        // multipleLine
                    >{i}</List.Item>);
                }
                return (<List.Item key={index}

                >{i}</List.Item>);
            })}
        </List>);
        return (
            <div style={{ height: '100%' }}>
                <Head title="商品分类"></Head>
                <Drawer
                    className="my-drawer"
                    style={{ minHeight: document.documentElement.clientHeight }}

                    sidebar={sidebar}
                    docked={this.state.docked}
                >
                    <div className="bigbox1">
                        {
                            goodList.map((good, i) => {
                                return (
                                    <Link to={"/detail/"+good._id+"?name="+good.name} key={i} className="itemBox2">
                                        <div>

                                            <img src={good.image} alt="" />
                                            <p className="text">  {good.name}</p>
                                            <div className="pbox">
                                                <span className="price">¥{good.price}.00</span>

                                                <span className="sell">{good.sellCount}人购买</span>
                                            </div>
                                        </div>
                                        <div>

                                            <img src={good.image} alt="" />
                                            <p className="text">  {good.name}</p>
                                            <div className="pbox">
                                                <span className="price">¥{good.price}.00</span>

                                                <span className="sell">{good.sellCount}人购买</span>
                                            </div>
                                        </div>
                                    </Link>

                                )
                            })
                        }
                    </div>
                </Drawer>

            </div>
        )
    }

}
export default Classify;