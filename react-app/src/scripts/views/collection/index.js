import "./index.scss"
import React, { Component } from "react"
import Head from "~/components/head"
import shopcar from "~/mobx/shopcar"
import { observer } from "mobx-react"
import {
    List,
    Card, WingBlank, WhiteSpace,
    Button,
    TextareaItem,
    Radio,

} from "antd-mobile"

import moment from 'moment';

@observer
class Collection extends Component {
    componentDidMount() {
        const {
            collectionList
        } = shopcar


        shopcar.getCollectionList("/react/getCollectionList");


    }
    onClick = (id) => {
        console.log(id)
        shopcar.delCollection(id)
    }
    render() {
        const {
            collectionList
        } = shopcar
        return (

            <div>
                <Head title="我的收藏" show={true} search={true}></Head>
                <div>
                    <div className="cc-bigbox1">
                        {
                            collectionList && collectionList.map((good, i) => {
                                return (
                                    <div key={i} className="cc-itemBox2" >
                                        <div>

                                            <img src={good.image} alt="" />
                                            <p className="ccc-text">  {good.name}</p>
                                            <div className="ccc-pbox">
                                                <span className="ccc-price">¥{good.price}.00</span>

                                                <span className="ccc-sell">{good.sellCount}人购买</span>
                                            </div>
                                            <Button className="ccc-del" onClick={() => this.onClick(good.id)}>删除收藏</Button>
                                        </div>

                                    </div>

                                )
                            })

                        }
                        

                    </div>
                </div>
            </div>
        )
    }
}
export default Collection