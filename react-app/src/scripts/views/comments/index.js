import "./index.scss"
import React, { Component } from "react"
import Head from "~/components/head"
import comment from "~/mobx/comment"
import { observer } from "mobx-react"
import {
    List,
    Card, WingBlank, WhiteSpace,
    Button,
    Result, Icon,
    Modal,
    Radio
} from "antd-mobile"
@observer
class Comments extends Component {
    componentDidMount() {
        comment.getGoodList("/react/getGoods");
        comment.getComment("/react/getComment");
    }
    handleGotoComment = (i) => {
        console.log(i)
        comment.getCommentList(i)
        this.props.history.push('/addcomment')

    }
    render() {
        const {
            goodList,
            commentList
        } = comment
        return (
            <div>
                <Head title="评论" show={true} search={true}></Head>
                <div className="cc-bigbox">
                {
                    goodList.map((item, i) => {
                        return (
                            <div key={i} className="cc-smallbox">
                                <WingBlank size="lg">
                                    <WhiteSpace size="sm" />
                                    <Card>
                                        <Card.Header
                                            title={item.name}
                                        // thumb={item.image}

                                        />
                                        <Card.Body>
                                            <img src={item.image} />
                                            <div className="b-count"><p>¥{item.price}</p></div>

                                        </Card.Body>
                                        <Card.Footer content={item.description} />
                                    </Card>

                                </WingBlank>

                                <Button className="cc-button" inline onClick={() => this.handleGotoComment(i)}>去评论</Button>
                            </div>
                        )
                    })
                }
                </div>
                
              
            </div>
        )
    }
}
export default Comments