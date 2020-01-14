
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom"
import React, { Component } from "react";
import PropTypes from "prop-types"

// import Guide from "./guide";
import Dizhi from "./dizhi";

import LazyLoad from "&/lazyload"
export default class MainLayout extends Component {
    getChildContext() {
        return {
            history: this.props.history
        }
    }
    render() {
        return (
            <div className="main">
                <Switch>
                    <Route path="/" exact render={() => (<Redirect to="/guide" />)} />
                    <Route path="/guide" component={LazyLoad(() => import("./guide"))} />
                    <Route path="/login" component={LazyLoad(() => import("./login"))} />
                    <Route path="/search" component={LazyLoad(() => import("./search"))} />
                    <Route path="/main" component={LazyLoad(() => import("./main"))} />
                    <Route path="/scan" component={LazyLoad(() => import("./scan"))} />
                    <Route path="/detail/:id" component={LazyLoad(() => import("./detail"))} />
                    <Route  path="/dizhi" component={Dizhi}  />
                    <Route path="/xinzengdizhi" component={LazyLoad(() => import("./xinzengdizhi"))} />
                    <Route path="/updatedizhi" component={LazyLoad(() => import("./updatedizhi"))} />
                    <Route path="/buy" component={LazyLoad(() => import("./buy"))} />
                    <Route path="/comments" component={LazyLoad(() => import("./comments"))} />
                    <Route path="/addcomment" component={LazyLoad(() => import("./addcomment"))} />
                    <Route path="/commentlist" component={LazyLoad(() => import("./commentList"))} />
                    <Route path="/collection" component={LazyLoad(() => import("./collection"))} />
                    <Route path="/chat" component={LazyLoad(() => import("./chat"))} />
                  
                    <Route render={()=>(<Redirect to="/guide" /> )} /> 
                </Switch>
            </div>
        )
    }
}

MainLayout.childContextTypes = {
    history: PropTypes.object
}
