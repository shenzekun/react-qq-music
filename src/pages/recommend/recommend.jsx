import React, { Component } from 'react';
import Header from '../../components/header/header';
import Swipe from '../../components/swiper/swiper';
import Loading from '../../components/loading/loading';
import Lazyload from 'react-lazyload';
import API from '../../config/api';
import './recommend.scss';
import { dealNum } from '../../utils/utils';
import { is, fromJS } from 'immutable';
class Recommmend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radioList: [],
            songList: [],
            slider: [],
            isLoading: true
        };
    }
    async getRecommendList() {
        let result = await API.recommendList();
        this.setState({
            radioList: result.radioList,
            songList: result.songList,
            slider: result.slider,
            isLoading: false
        });
    }
    componentDidMount() {
        this.getRecommendList();
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
                        <Loading />
                    ) : (
                        <div className="rec-view tab-content">
                            {this.state.slider ? <Swipe lists={this.state.slider} /> : null}
                            <div className="radios">
                                <h2 className="title">电台</h2>
                                <div className="list">
                                    {this.state.radioList.map(radio => {
                                        return (
                                            <div className="list-item" key={radio.radioid}>
                                                <div className="list-media">
                                                    <Lazyload
                                                        placeholder={
                                                            <img
                                                                src={require('../../assets/default_pic.jpg')}
                                                                alt="默认图片"
                                                            />
                                                        }
                                                    >
                                                        <img src={radio.picUrl} alt="图片" />
                                                    </Lazyload>
                                                    <span className="icon icon_play" />
                                                </div>
                                                <div className="list-info">{radio.Ftitle}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="playlists">
                                <h2 className="title">热门歌单</h2>
                                <div className="list">
                                    {this.state.songList.map(list => {
                                        return (
                                            <div className="list-item" key={list.id}>
                                                <a
                                                    href={
                                                        'https://y.qq.com/w/taoge.html?ADTAG=myqq&from=myqq&channel=10007100&id=' +
                                                        list.id
                                                    }
                                                >
                                                    <div className="list-media">
                                                        <Lazyload
                                                            placeholder={
                                                                <img
                                                                    src={require('../../assets/default_pic.jpg')}
                                                                    alt="默认图片"
                                                                />
                                                            }
                                                        >
                                                            <img src={list.picUrl} alt="图片" />
                                                        </Lazyload>
                                                        <span className="listen_count">
                                                            <span className="icon icon_listen" />
                                                            {dealNum(list.accessnum)}
                                                        </span>
                                                        <span className="icon icon_play" />
                                                    </div>
                                                    <div className="list-info">
                                                        <div className="list_tit">
                                                            {list.songListDesc}
                                                        </div>
                                                        <div className="list-text" />
                                                    </div>
                                                </a>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Recommmend;
