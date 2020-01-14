import { observable, action, computed, autorun } from "mobx"
import { axios } from "&"
class Comment {
    @observable goodList = [];  // 结算购物车数据 
    @observable commentList = {};  // 单条商品 
    @observable comments = [];  // 结算购物车数据 
    


    @action getGoodList = async (url) => {
        const res = await axios.get(url);
        this.goodList = res.data.result;
        console.log(this.goodList)
    }
    
    @action getComment = async (url) => {
        const res = await axios.get(url);
        this.comments = res.data.result;
        console.log(this.comments)
    }
    @action getCommentList = (idx) => (

        this.goodList.forEach((item, i) => {
            if (i == idx) {
                this.commentList = item
            }

        })
    )
    @action addComment = (comment,commentList) => {

        axios.post("/react/addComment", {
            comment,
            commentList
        }).then(res => {
            // this.carList = this.carList.map((item) => {
            //     if (item.id == id) {
            //         item.count += flag ? 1 : -1;
            //     }
            //     return item;
            // })
        })
    }

}
export default new Comment()