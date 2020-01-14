import "./index.scss"
import React, { Component } from "react";
import { axios } from "&";
import { connect } from "react-redux"
import { getGoodList, getGoodType } from "../../actions";
import {
    Link
} from "react-router-dom"
@connect(
    state => {
        return {
            goodList: state.getIn(['data', 'goodList']),

        }
    }
)
class Goods extends Component {
    constructor(props) {
        super(props)
        
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
            goodList,
            goodType
        } = this.props;
        return (
            <div className="bigbox1">
                {
                    goodList.map((good, i) => {
                        return (
                            <Link to={"/detail/"+good._id+"?name="+good.name} key={i} className="itemBox1">
                                <img src={good.image} alt="" />
                                <p className="text">  《{good.name}》<span className="desc">——{good.description}</span></p>
                                <div className="pbox">
                                    <span className="price">¥{good.price}.00</span>
                                    <span className="oldp">¥{good.oldPrice}</span>
                                    <span className="sell">{good.sellCount}人购买</span>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        )
    }
}
export default Goods;