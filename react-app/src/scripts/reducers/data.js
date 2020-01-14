
import immutable from "immutable"

const defaultState = immutable.fromJS({
    banner: [],
    count: 2020,
    city: "美丽的京山",
    goodList: [],
    goodDetail: {
        count:0
    },
    detailImg1:
        require("@/assets/images/detail1.jpg"),
    detailImg2:
        require("@/assets/images/detail2.jpg"),
    detailImg3:
        require("@/assets/images/detail3.jpg"),
    detailImg4:
        require("@/assets/images/detail4.jpg"),
    detailImg5:
        require("@/assets/images/detail5.jpg")


})

export const data = (state = defaultState, action) => {
    console.log(action)
    switch (action.type) {

        case "changeCount":
            return state.update("count", x => x + action.payload);
            break;

        case "getGoodList":
            return state.set("goodList", action.payload);
            break;

        case "getGoodDetail":

            return state.set("goodDetail", action.payload);
            break;





        default:
            return state;
            break;
    }
}