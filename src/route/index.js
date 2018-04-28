import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import asyncComponent from '../utils/asyncComponent';
import recommend from '../pages/recommend/recommend';
// import rank from '../pages/rank/rank';
// import search from '../pages/search/search';

const rank = asyncComponent(() => import('../pages/rank/rank'));
const search = asyncComponent(() => import('../pages/search/search'));

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
