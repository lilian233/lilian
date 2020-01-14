import "./index.scss"
import React, { Component } from "react"
import Head from "~/components/head"
import comment from "~/mobx/comment"
import { observer } from "mobx-react"
import {
    List,
    Card, WingBlank, WhiteSpace,
    Button,
    TextareaItem,
    Radio
} from "antd-mobile"

@observer
class Addcomments extends Component {
    state = {
        value: 3,
    };

    handleChange = value => {
        this.setState({ value });
    };

    onClick = () => {
        if (this.textarea.state.value) {

            comment.addComment(this.textarea.state.value, comment.commentList)
            this.props.history.push('./commentlist')

        } else {
            console.log(66)
        }
    }
    render() {


        const {

            commentList
        } = comment
        return (
            <div>
                <Head title="发表评论" show={true} search={true}></Head>

                <div className="d-box">
                    <img src={commentList.image} className="d-img" />
                    <p className="d-name">{commentList.name}</p>
                    <p className="d-desc">{commentList.description}</p>
                    <p className="d-oldPrice">原价：<span>¥{commentList.oldPrice}.00</span></p>
                    <p className="d-pbox"><span className="d-price">¥{commentList.price}.00</span><span className="d-sell">已售{commentList.sellCount}份</span></p>

                </div>
                <List renderHeader={() => '发表你的评论'}  className="aa-addBox">

                    <TextareaItem
                        className="aa-add"
                        ref={el => this.textarea = el}
                        onChange={this.onChange}
                        rows={5}
                        count={100}
                    />





                    <Button className="cc-button" inline onClick={this.onClick}>提交评论</Button>

                </List>
            </div>
        )
    }
}
export default Addcomments