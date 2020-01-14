import "./index.scss"
import React, { Component } from "react"
import Head from "~/components/head"
import Chat from 'chat-react';
import { observer } from "mobx-react"

const customEmoticon = [{
    timestamp: new Date(),
    userInfo: {
        avatar: "http://img.binlive.cn/6.png",
        name: "系统客服",
        userId: "1544365758856"
    },
    value: "您好，请问有什么可以帮您？",
    error: true //设置消息状态为失败，显示错误状态图标
}]
@observer
class MyChat extends Component {
    state = {
        inputValue: '',
        messages: [],
        timestamp: new Date().getTime()
    }
    setInputfoucs = () => {
        this.chat.refs.input.inputFocus();  //set input foucus
    }
    setScrollTop = () => {
        this.chat.refs.message.setScrollTop(1200);  //set scrollTop position
    }
    sendMessage = (v) => {
        const { value } = v;
        if (!value) return;
        const { messages = [] } = this.state;
        customEmoticon.push(v);
        this.setState({ customEmoticon, timestamp: new Date().getTime(), inputValue: '' });
        console.log(customEmoticon)
    }
    render() {

        const { inputValue, customEmoticon, timestamp } = this.state;
        const{
            mobile,
            pic

        } = JSON.parse(localStorage.userInfo)
        const userInfo = {
            avatar: pic,
            userId: mobile,
            name: mobile
        }
        console.log(mobile)
        return (
            <div>
                <Head title="联系客服" show={true} search={true}></Head>
                

                <Chat
                    ref={el => this.chat = el}
                    className="my-chat-box"
                    dataSource={customEmoticon}
                    userInfo={userInfo}
                    value={this.state.inputValue}
                    sendMessage={this.sendMessage}
                    timestamp={this.state.timestamp}
                    placeholder="请输入"
                    messageListStyle={{ width: '100%', height: window.outerHeight }}
                />

            </div>

        )
    }
}
export default MyChat