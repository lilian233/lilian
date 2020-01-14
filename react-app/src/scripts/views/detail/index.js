import "./index.scss"
import React, { Component } from "react";
import Head from "~/components/head"
import { connect } from "react-redux"
import { getGoodList, getGoodDetail ,addShopcar,addCollection} from "../../actions";
import { Tag, WingBlank,Button,Modal} from 'antd-mobile';
const alert = Modal.alert;
const showAlert = (that) => {
    const alertInstance = alert('提示', '请登录后访问购物车', [
      { text: '取消', onPress: () =>  console.log(666), style: 'default' },
      { text: '登录', onPress: () => that.props.history.push("/login"),style: 'default'  },
    ]);
    setTimeout(() => {
      // 可以调用close方法以在外部close
      console.log('auto close');
      alertInstance.close();
    }, 500000);
  };
  const goAlert = (that) => {
    const alertInstance = alert('加入成功', '去购物车结算', [
      { text: '再逛逛', onPress: () => console.log(666), style: 'default' },
      { text: '去看看', onPress: () => that.props.history.push("/main/cart"),style: 'default'  },
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
            goodDetail: state.getIn(['data', 'goodDetail']),
            detailImg1: state.getIn(['data', 'detailImg1']),
            detailImg2: state.getIn(['data', 'detailImg2']),
            detailImg3: state.getIn(['data', 'detailImg3']),
            detailImg4: state.getIn(['data', 'detailImg4']),
            detailImg5: state.getIn(['data', 'detailImg5']),

        }
    }
)
class Detail extends Component {
    componentDidMount() {
        const {
            dispatch,
            goodList,
            goodDetail,
            match,
            detailImg1,
            detailImg2,
            detailImg3,
            detailImg4,
            detailImg5
        } = this.props;
        console.log(this.props)
        dispatch(getGoodDetail({ url: '/react/getGoodDetail', params: { _id: match.params.id } }))
    }
    handleAddCar=()=>{
        const {
            goodDetail,
            dispatch
        } = this.props
        if(!sessionStorage.token){
            showAlert(this);            
        }
        console.log(goodDetail)
        dispatch(addShopcar({ url: '/react/addShopcar', params: {goodDetail } }))
        goAlert(this)
    }
    handleBuyIt=()=>{
        if(!sessionStorage.token){
            showAlert(this);
            
        }else{
            this.props.history.push('/main/cart')

        }
    }
    handleAddCollect=()=>{
        const {
            goodDetail,
            dispatch
        } = this.props
        if(!sessionStorage.token){
            showAlert(this);            
        }
        console.log(goodDetail)
        dispatch(addCollection({ url: '/react/addCollection', params: {goodDetail } }))
        
    }
    render() {
        const {
            item,
            location,
            match,
            goodDetail,
            detailImg1,
            detailImg2,
            detailImg3,
            detailImg4,
            detailImg5
        } = this.props;
        return (
            <div className="d-main">
                <Head title={new URLSearchParams(location.search).get('name').slice(0, 12)} show={true} search={true} ></Head>
                {/* <h2>goodID == {match.params.id} --{}</h2> */}
                <div className="d-box">
                    <img src={goodDetail.image} className="d-img" />
                    <p className="d-name">{goodDetail.name}</p>
                    <p className="d-desc">{goodDetail.description}</p>
                    <p className="d-oldPrice">原价：<span>¥{goodDetail.oldPrice}.00</span></p>
                    <p className="d-pbox"><span className="d-price">¥{goodDetail.price}.00</span><span className="d-sell">已售{goodDetail.sellCount}份</span></p>
                    <div> <Tag data-seed="logId">配送</Tag><span className="d-sort">该商品支持全国主要城市及近郊配送</span></div>
                    <img src={detailImg1} className="detailImg1" />

                </div>


                <div className="d-detail">
                    <img src={detailImg2} className="detailImg2" />
                    <img src={goodDetail.image} className="d-img" />
                    <img src={detailImg3} className="detailImg3" />
                    <div className="thh">
                        <h3>退换货说明：</h3>
                        <p>鲜花不接受7天无理由退换货,如需开具发票或其他问题,请联系鲜花客服</p>
                        <p>TEL：<span>400-000-8797</span></p>
                        <div className="xhx"><hr /></div>
                        <p>iOS/安卓搜索：Bloom</p>
                        <p>微信公众号：鲜花BLOOM</p>
                        <p>网站：https://www.bloomapp.com.cn/</p>

                    </div>
                    <img src={detailImg4} className="detailImg4" />
                    <img src={detailImg5} className="detailImg5" />

                </div>
                <div className="d-shop">
                    <div className="d-gotoShop">
                        <i className="iconfont icon-goodsfill"></i>
                        <p onClick={this.handleAddCollect}>收藏</p>
                    </div>
                    <div className="d-add">
                    <Button  className="d-addCar" inline onClick={()=>this.handleAddCar()}>加入购物车</Button>
                    <Button className="d-buy" inline onClick={()=>this.handleBuyIt()}>立即购买</Button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Detail;



