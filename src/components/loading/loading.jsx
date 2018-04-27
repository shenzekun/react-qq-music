import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './loading.scss'
class Loading extends Component {
    render() {
        return (
            <div className="loading">
                <img src={require('../../assets/loading.gif')} alt="" />
                <p>正在加载中.....</p>
            </div>
        );
    }
}
export default Loading;
