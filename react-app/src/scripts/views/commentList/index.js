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
import moment from 'moment';

@observer
class CommentList extends Component {
    componentDidMount() {
        comment.getComment("/react/getComment");

    }
    onClick = () => {
        this.props.history.push('/main/mine')
    }
    render() {
        const {
            comments
        } = comment
        return (
            <div>
                <Head title="全部评论" show={true} search={true}></Head>
                <div className="ccc-listBox">
                    {
                        comments.map((item, i) => {
                            console.log(item.time)
                            return (
                                <div key={i}>
                                    <WingBlank size="lg">
                                        <WhiteSpace size="sm" />
                                        <Card>
                                            <Card.Header
                                                title={item.mobile}


                                            />
                                            <Card.Body>
                                                <img src={item.image} />
                                                {/* <div className="b-count">¥{item.price}</div> */}
                                                <div className="b-total">{item.comment}</div>
                                            </Card.Body>

                            <Card.Footer content={<div>{item.time.substring(0, 10)} {item.time.substring(11, 19)}</div>} />

                                        </Card>

                                    </WingBlank>


                                </div>
                            )
                        })
                    }

                </div>
                <Button onClick={this.onClick} className="goBackMine">返回个人中心</Button>
            </div>
        )
    }
}
export default CommentList