import {
    HashRouter as Hash,
    Route,
    Switch
} from "react-router-dom"
import React, { Component } from "react";
import MainLayout from "./views"
import store from "./store";
import { Provider } from "react-redux"
export class MainRouter extends Component {
    render() {
        return (
            <Provider store={store}>
                <Hash
                    basename=""
                >
                    <Route component={MainLayout} />
                </Hash>
            </Provider>

        )
    }
}