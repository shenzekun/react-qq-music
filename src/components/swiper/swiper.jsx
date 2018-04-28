import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Swiper from '../../../node_modules/swiper/dist/js/swiper.js';
import './swiper.scss';
import { is, fromJS } from 'immutable';

class Swipe extends Component {
    static propTypes = {
        lists: PropTypes.array.isRequired
    };
    componentDidMount() {
        new Swiper('.swiper-container', {
            loop: true,
            pagination: {
                el: '.swiper-pagination'
            },
            autoplay: true
        });
    }
    shouldComponentUpdate(nextProps, nextState) {
        return (
            !is(fromJS(this.props), fromJS(nextProps))
        );
    }
    render() {
        return (
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    {this.props.lists.map(list => {
                        return (
                            <div className="swiper-slide" key={list.id}>
                                <a href={list.linkUrl}>
                                    <img src={list.picUrl} alt="轮播"/>
                                </a>
                            </div>
                        );
                    })}
                </div>
                <div className="swiper-pagination" />
            </div>
        );
    }
}

export default Swipe;
