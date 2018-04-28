import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './rank.scss';
import LazyLoad from 'react-lazyload';
import Header from '../../components/header/header';
import Loading from '../../components/loading/loading';
import API from '../../config/api';
import { is, fromJS } from 'immutable';
import { dealNum } from '../../utils/utils';

class Rank extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rankList: [],
            isLoading: false
        };
    }
    async getRankList() {
        let result = await API.rankList();
        this.setState({ rankList: result.topList, isLoading: true });
    }
    componentDidMount() {
        this.getRankList();
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
        return (
            !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
        );
    }
    render() {
        return (
            <div>
                <Header />
                <div className="tab-contents">
                    {this.state.isLoading ? (
                        <div className="rank-view tab-content">
                            <ul className="toplist">
                                {this.state.rankList.map(item => {
                                    return (
                                        <li className="top-item" key={item.id}>
                                            <div className="top-item-media">
                                                <a
                                                    href={
                                                        'https://y.qq.com/w/toplist.html?ADTAG=myqq&from=myqq&channel=10007100&id=' +
                                                        item.id +
                                                        '&type=top'
                                                    }
                                                >
                                                    <LazyLoad
                                                        height={100}
                                                        placeholder={
                                                            <img
                                                                src={require('../../assets/default_pic.jpg')}
                                                                alt="占位符"
                                                            />
                                                        }
                                                    >
                                                        <img src={item.picUrl} alt="图片" />
                                                    </LazyLoad>
                                                    <span className="listen_count">
                                                        <i className="icon icon-listen" />
                                                        {dealNum(item.listenCount)}
                                                    </span>
                                                </a>
                                            </div>
                                            <a
                                                href={
                                                    'https://y.qq.com/w/toplist.html?ADTAG=myqq&from=myqq&channel=10007100&id=' +
                                                    item.id +
                                                    '&type=top'
                                                }
                                            >
                                                <div className="top-item-info">
                                                    <h3 className="top-item-title ellipsis">
                                                        {item.topTitle}
                                                    </h3>
                                                    <ul className="top-item-list">
                                                        {item.songList.map((song, index) => {
                                                            return (
                                                                <li
                                                                    className="top-item-song"
                                                                    key={index}
                                                                >
                                                                    <i className="song-index">
                                                                        {index + 1}
                                                                    </i>
                                                                    <span className="song-name">
                                                                        {song.songname}
                                                                    </span>- {song.singername}
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </div>
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ) : (
                        <Loading />
                    )}
                </div>
            </div>
        );
    }
}

export default Rank;
