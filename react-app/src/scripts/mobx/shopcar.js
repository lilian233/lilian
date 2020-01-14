import { observable, action, computed, autorun } from "mobx"
import { axios } from "&"
class Shopcar {
    @observable carList = [];  // 购物车数据 
    // @observable carNum = 10;     // 购物车选中数量 
    // @observable carTotal = 18;   // 购物车总数量 
    @observable checkedList = [];
    @observable collectionList = [];
    // 结算购物车数据 
    @observable data = [
        {
            value: 0, label: 'doctor', price: 10, title: '仅限普通花束使用',
            msg1: '限2020-01-10至2020-02-31使用', msg2: '满300元可使用'
        },
        {
            value: 1, label: 'bachelor', price: 10, title: '仅限普通花束使用',
            msg1: '限2020-01-11至2020-02-31使用', msg2: '满300元可使用'
        },
    ];
    @action getCarList = async (url) => {
        const res = await axios.get(url);
        this.carList = res.data.result;
        console.log(this.carList)
    }
    @action getCollectionList = async (url) => {
        const res = await axios.get(url);
        this.collectionList = res.data.result;
        console.log(this.collectionList)
    }
    @action delSelect = () => {
        axios.post("/react/delSelect").then(res => {
            this.carList = this.carList.filter(item => !item.checked);
        })

    }
    @action delCollection = (id) => {
        axios.post("/react/delCollection", { id }).then(res => {
            this.collectionList = res.data.susult
        })

    }
    @action changeOneCount = (id, flag) => {

        axios.post("/react/changeCount", {
            id,
            flag
        }).then(res => {
            this.carList = this.carList.map((item) => {
                if (item.id == id) {
                    item.count += flag ? 1 : -1;
                }
                return item;
            })
        })
    }

    @action changeOneCountNum = (id, count) => {
        axios.post("/react/changeCount", {
            id,
            count
        }).then(res => {
            this.carList = this.carList.map((item) => {
                if (item.id == id) {
                    item.count = count;
                }
                return item;
            })
        })
    }

    @action changeOneChecked = (checked, id) => {
        axios.post("/react/changeChecked", {
            checked,
            id
        }).then(res => {
            this.carList = this.carList.map((item) => {
                if (item.id == id) {
                    item.checked = checked
                }
                return item;
            })
        })

    }
    @action getChecked = () => {
        axios.get("/react/getChecked").then(res => {
            // this.carList = this.carList.map((item)=>{
            //     if(item.id==id){
            //         item.checked = checked
            //     }
            //     return item;
            // })
            this.checkedList = res.data.result

        })

    }

    @action changeQuan = checked => {
        axios.post("/react/changeChecked", {
            checked,
        }).then(res => {
            this.quan = checked;
        })

    }
    @computed get carTotal() {
        var carTotal = 0;
        this.carList.forEach((item) => {
            carTotal += item.count;
        })
        return carTotal;
    }
    @computed get total() {
        var total = 0;
        this.carList.forEach((item) => {
            if (item.checked) {
                total += item.count * item.price;
            }
        })
        return total;
    }
    @computed get yhq() {
        var yh = 0;
        this.data.forEach((item) => {

            yh = item.price;

        })
        return yh;
    }
    @computed get totalcount() {
        var totalcount = 0;
        this.checkedList.forEach((item) => {
            if (item.checked) {
                totalcount += item.count * item.price;
            }
        })
        return totalcount;
    }
    @computed get carNum() {
        var carNum = 0;
        this.carList.forEach((item) => {
            if (item.checked) {
                carNum += item.count;
            }
        })
        return carNum;
    }
    @computed get quan() {
        var quan = true;
        this.carList.forEach(item => {
            if (!item.checked) {
                quan = false;
            }
        })
        return quan;
    }

    set quan(newVal) {
        this.carList = this.carList.map((item) => {
            item.checked = newVal;
            return item;
        })
    }
}
export default new Shopcar()