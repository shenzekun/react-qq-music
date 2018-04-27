import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import recommend from '../pages/recommend/recommend'
import rank from '../pages/rank/rank';
import search from '../pages/search/search';

// TODO: 添加异步加载组件
export default class RouteConfig extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/" exact component={recommend} />
                    <Route path="/rank" component={rank} />
                    <Route path="/search" component={search} />
                    <Redirect to="/" />
                </Switch>
            </HashRouter>
        );
    }
}
