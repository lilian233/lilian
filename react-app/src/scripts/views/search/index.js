import "./index.scss"
import React, {Component} from "react"
import Head from "~/components/head"
import {axios} from "&"
import {
    getSearch
} from "../../actions"
import{
    WingBlank,
    SearchBar,
    Tag
} from "antd-mobile"
import {
    Link
} from "react-router-dom"
import {connect} from "react-redux"
@connect(
    state=>{
        return{
            searchList:state.getIn(["address",'searchList'])
        }
    }
)
class Search extends Component{
    state={
        keyList:[],
       
    }
    handleSubmit(keyword){
        const {
            dispatch,
            searchList
        } = this.props
        console.log(keyword)
        this.state.keyList.push(keyword)
        console.log(this.state.keyList)
        sessionStorage.keyList =  this.state.keyList
        
        dispatch(getSearch({ url: "/react/getSearch",params:{keyword} })).then(res=>{

        })


    }

    render(){
       const {
        searchList,
        
       } = this.props
       console.log(searchList)
        return (
            
            <div>
                <Head title="搜索" show={true} search={true}></Head>
               <WingBlank>
                    <SearchBar placeholder="请输入关键字" onSubmit={this.handleSubmit.bind(this)}  />    
                </WingBlank>
                {/* <div className="tag-container">
                    <Tag data-seed="logId">Basic</Tag>
                    <Tag selected>Selected</Tag>
                    <Tag disabled>Disabled</Tag>
                    <Tag >Callback</Tag>
                    <Tag small>Small and Readonly</Tag>
                    
                </div> */}
                <div className="bigbox1">
                        {
                            searchList.map((good, i) => {
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
                                     
                                    </Link>

                                )
                            })
                        }
                    </div>
            </div>
        )
    }
}
export default  Search;