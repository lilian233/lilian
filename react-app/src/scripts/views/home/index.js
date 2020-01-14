import "./index.scss"
import React, {Component} from "react"
import Head from "~/components/head"
import Goods from "~/components/goods"
import {axios} from "&";
import {
    WingBlank,
    WhiteSpace,
    Carousel,
    Accordion,
    List
} from "antd-mobile"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
@connect(
    state=>{
        return{
            count:state.getIn(['data','count']),

        }
    }
)
class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            banner:[],
            guide:[
                require("@/assets/images/g6.jpg"),
                require("@/assets/images/g7.jpg"),
            ],
            gg:require("@/assets/images/g8.jpg"),
            goods:[]
        }
    }
  
    componentDidMount(){
        if(!this.state.banner.length>0){
            axios.get('/react/getBanner').then(res=>{
                console.log(res.data.result[0].img)
                this.setState({
                    banner:res.data.result[0].img
                })
            })
        }
        
        // axios.get("/react/getGoods").then(res=>{
        //     console.log(res.data.result)
            
        // })
    }
    onClick=()=>{
        this.props.history.push('/main/classify')
    }
    render(){
        const {
            banner,
            guide,
            gg,
            goods
        } = this.state
        const {
            dispatch,
            count
        } = this.props
        return (
            <div className="g-box">
                <Head title="首页"></Head>
              
                <Carousel
                autoplay={true}
                infinite
                autoplayInterval={2000}
               
                >
                {banner.map((item,i) => (
                    <Link
                    key={i}
                    to="/main/classify"
                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight ,overflow:"hidden"}}
                    >
                    <img
                        src={item}
                        alt=""
                        style={{ width: '100%', verticalAlign: 'top', height:"2.7rem" }}
                        onLoad={() => {
                        // fire window resize event to change height
                        window.dispatchEvent(new Event('resize'));
                       
                        }}
                    />
                    </Link>
                ))}
                </Carousel>
               
                <Carousel
               
                dots={false}
                >
                {guide.map((item,i) => (
                    <Link
                    key={i}
                    to="/main/classify"
                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight ,overflow:"hidden"}}
                    >
                    <img
                        src={item}
                        alt=""
                        style={{ width: '100%', verticalAlign: 'top', height:"1.7rem" }}
                        onLoad={() => {
                        // fire window resize event to change height
                        window.dispatchEvent(new Event('resize'));
                       
                        }}
                    />
                    </Link>
                ))}
                </Carousel>
                <WingBlank>
                <div>
                    <img src={gg} alt=""  style={{ width: '100%',height:"6rem" }} onClick={this.onClick}/>
                </div>
                </WingBlank>
                <WhiteSpace/>
                   
                <Goods></Goods>
            </div>
        )
    }
}
export default Home;