import "./index.scss"
import React, { Component } from "react"
// import {MySwipe} from "~/components/swipe";
import { Button } from "antd-mobile"
import {
    WingBlank,
    WhiteSpace,
    Carousel,
    Accordion,
    List
} from "antd-mobile"
import { Link } from "react-router-dom"
// const SwipeItem = MySwipe.Item;
var timer = null
export default class Guide extends Component {

    constructor() {
        super();
        this.state = {
            imgs: [
                require("@/assets/images/g1.jpg"),
                require("@/assets/images/g2.jpg"),
                require("@/assets/images/g3.jpg"),
                require("@/assets/images/g4.jpg"),
                require("@/assets/images/g5.jpg")

            ],
            count: 5,
            show: false,
            txt: ''
        }
    }

    // componentDidMount() {
    //     if (localStorage.visitCount) {
    //         localStorage.visitCount++;
    //         if (localStorage.visitCount > 3) {
    //             this.props.history.push("/main/home");
    //         }
    //     } else {
    //         localStorage.visitCount = 1;
    //     }
    // }


    handleGotoMain=(index)=>{
        if(index==this.state.imgs.length-1){
            // this.computedTime()
            this.props.history.push("/main/home");
        }
    }
    
    render() {
        const {
            imgs,
            show,
            txt
        } = this.state
        return (
            <div className="g-box">
                <Carousel
                    autoplay={true}
                    // infinite
                    autoplayInterval={2000}
                    dots={false}
                >
                    {imgs.map((item, i) => (
                        <div
                            key={i}
                          
                            style={{ display: 'inline-block', width: '100%'}}
                        >
                            <img
                            onClick={()=>this.handleGotoMain(i)}
                                src={item}
                                alt=""
                                style={{ width: '100%',height:"100%" ,verticalAlign: 'top' }}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));

                                }}
                                
                            />
                           
                        </div>
                    ))}
                </Carousel>

            </div>
        )
    }
}