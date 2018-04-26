import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import recommend from '../pages/recommend/recommend'
export default class RouteConfig extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/" exact component={recommend} />
                    {/* <Route path="/record" component={record} />
                    <Route path="/helpcenter" component={helpcenter} />
                    <Route path="/production" component={production} />
                    <Route path="/balance" component={balance} /> */}
                    <Redirect to="/" />
                </Switch>
            </HashRouter>
        );
    }
}
