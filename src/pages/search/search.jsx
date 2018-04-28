import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header/header';
import './search.scss';
import { connect } from 'react-redux';
import { getHotList, showPlayer, getSong } from '../../store/search/action';
import API from '../../config/api';
import { trim, htmlDecode } from '../../utils/utils';
import Player from '../player/player';

class Search extends Component {
    static propTypes = {
        getHotList: PropTypes.func.isRequired,
        hotkeys: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            hotkeys: [], //获取黑色的 hotkey,
            history: [], // 放历史记录
            data: '', //获取红色的 hotkey
            keyword: '', // 获取用户的搜索内容
            getLastKeyword: '', // 获取用户上一次的搜索内容
            searchResult: [], //搜索结果
            isShowCancel: false, // 是否显示取消
            isShowDelete: false, // 是否显示取消
            isShowHistory: false, // 是否显示历史记录
            isShowSearchResults: false, //是否显示搜索结果
            fetching: false, //正在 fetch
            isLoad: true, //能否继续加载数据
            isGetHotKey: false // 是否获得 hotkey
        };
        // this.isGetHotKey = false; // 是否获得 hotkey
        this.songsObject = {}; // 存放歌曲,用来判断是否搜索改变了
        this.page = 1; //默认页数为1
        // this.isShowCancel = false; // 是否显示取消
        // this.isShowDelete = false; // 是否显示取消
        // this.isShowHistory = false; // 是否显示历史记录
        // this.isShowSearchResults = false; //是否显示搜索结果
        // this.fetching = false; //正在 fetch
        // this.isLoad = true; //能否继续加载数据
        //this.history = []; // 放历史记录
    }
    async componentDidMount() {
        window.addEventListener('scroll', this.onScroll.bind(this));
        await this.props.getHotList();
        const history = localStorage.getItem('SET_HISTORY_KEY')
            ? localStorage.getItem('SET_HISTORY_KEY').split(',')
            : [];
        this.setState({ isGetHotKey: true, history: history });
        // this.isGetHotKey = true;
        // this.history = history;
        if (this.props.hotkeys) {
            this.setState({
                hotkeys: this.shuffle(this.props.hotkeys.hotkey, 6),
                data: this.props.hotkeys
            });
        }
    }

    // 洗牌
    shuffle(array, count) {
        let arr = [];
        let len = Math.min(count, array.length);
        for (let i = 0; i < len; i++) {
            let temp = array;
            let random = Math.floor(Math.random() * temp.length);
            arr[i] = temp[random];
            array.splice(random, 1);
        }
        return arr;
    }

    // 重置
    reset() {
        this.page = 1;
        this.songsObject = {};
        this.setState({ searchResult: [], isLoad: true });
        // this.searchResult = [];
    }

    // 添加历史
    addHistory(keyword) {
        if (keyword) {
            let history = this.state.history;
            let index = history.indexOf(keyword);
            if (index === -1) {
                history.unshift(keyword);
                localStorage.setItem('SET_HISTORY_KEY', history);
                console.log(history);
                this.setState({ history: history });
            }
        }
    }

    handleChange = e => {
        this.setState({
            keyword: trim(e.target.value)
        });
    };

    // 用户按下 enter
    enter = e => {
        if (this.state.keyword) {
            this.setState({ isShowDelete: true });
            // this.isShowDelete = true;
        } else {
            this.setState({ isShowDelete: false });
            // this.isShowDelete = false;
            this.reset();
        }
        if (e.keyCode !== 13) return;
        this.setState({
            isShowHistory: false,
            isShowSearchResults: true
        });
        // this.isShowHistory = false;
        // this.isShowSearchResults = true;
        this.addHistory(this.state.keyword);
        this.search(this.state.keyword);
    };

    onClick = e => {
        //如果点击到了输入按钮
        if (e.target.matches('#search')) {
            this.setState({
                isShowCancel: true,
                isShowHistory: true
            });
            // this.isShowCancel = true;
            // this.isShowHistory = true;
        }
        //如果点击到了取消按钮
        if (e.target.matches('.search-cancel')) {
            this.setState({ isShowCancel: false, isShowDelete: false, isShowHistory: false });
            // this.isShowCancel = false;
            // this.isShowDelete = false;
            // this.isShowHistory = false;
            this.reset();
        }
        //如果点击到了删除按钮
        if (e.target.matches('.icon-delete')) {
            // this.isShowDelete = false;
            this.setState({ isShowDelete: false });
            this.reset();
        }
        // 如果匹配到了清除搜索记录
        if (e.target.matches('.record-delete')) {
            let history = [];
            // this.history = [];
            localStorage.setItem('SET_HISTORY_KEY', history);
            this.setState({ history: history });
        }
        //如果匹配到了单条记录的删除按钮
        if (e.target.matches('.icon.icon-close')) {
            let history = this.state.history;
            let index = history.indexOf(e.target.previousElementSibling.innerHTML);
            history.splice(index, 1);
            localStorage.setItem('SET_HISTORY_KEY', history);
            this.setState({ history: history });
        }
        //如果点到了热门搜索的关键词或者点到了搜索记录的歌
        if (e.target.matches('.tag-keyword') || e.target.matches('.record-con')) {
            // this.isShowDelete = true;
            // this.isShowCancel = true;
            // this.isShowHistory = false;
            // this.isShowSearchResults = true;
            this.setState(
                {
                    keyword: trim(e.target.innerHTML),
                    isShowDelete: true,
                    isShowCancel: true,
                    isShowHistory: false,
                    isShowSearchResults: true
                },
                () => {
                    this.addHistory(this.state.keyword);
                    this.search(this.state.keyword);
                }
            );
        }
    };

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
        window.removeEventListener('scroll', this.onScroll.bind(this));
    }

    // 搜索
    async search(keyword, page = 1) {
        //刚进来时 keyword为 undefined ，因为没有 enter
        if (keyword === undefined) keyword = '';
        if (keyword === '') return;
        //如果已经搜索过，并且没有改动 keyword 那么直接返回
        if (this.state.getLastKeyword === keyword && this.songsObject[page || this.page]) return;
        if (this.state.getLastKeyword !== keyword) this.reset();
        if (this.state.fetching || !this.state.isLoad) return;
        this.setState({ getLastKeyword: keyword });
        this.loading();
        let res = await API.searchList(keyword, page || this.page);
        this.page = res.song.curpage;
        this.songsObject[this.page] = res.song.list;
        if (this.state.searchResult) {
            let result = this.state.searchResult;
            this.setState({ searchResult: result.concat(res.song.list) });
            // this.searchResult = this.searchResult.concat(res.song.list);
        } else {
            this.setState({ searchResult: res.song.list });
            // this.searchResult = res.song.list;
        }
        // this.isLoad = res.message !== 'no results';
        this.setState({ isLoad: res.message !== 'no results' });
        this.accomplish();
    }

    // 全部渲染完成，没有歌了
    accomplish() {
        this.setState({ fetching: false });
        // this.fetching = false;
    }

    // 显示正在加载动画
    loading() {
        this.setState({ fetching: true });
        // this.fetching = true;
    }

    // 滚动事件
    onScroll(e) {
        if (this.state.isLoad) {
            if (
                document.documentElement.clientHeight + window.pageYOffset >
                document.body.scrollHeight - 100
            ) {
                this.search(this.state.keyword, this.page + 1);
            }
        } else {
            return window.removeEventListener('scroll', this.onScroll.bind(this));
        }
    }

    // 显示 player 的信息
    showPlayerDetail = list => {
        console.log(list);
        this.props.showPlayer();
        this.props.getSong({ ...list });
    };

    render() {
        return (
            <div>
                <Header />
                <div className="tab-contents">
                    <div className="search-view tab-content" onClick={this.onClick}>
                        <div className="search-bar">
                            <div className="input-wrap">
                                <input
                                    type="text"
                                    id="search"
                                    placeholder="搜索歌曲、歌单、专辑"
                                    onChange={this.handleChange}
                                    onKeyUp={this.enter}
                                    value={this.state.keyword}
                                />
                                <span className="icon-search" />
                                {this.state.isShowDelete ? (
                                    <span className="icon-delete">删除</span>
                                ) : null}
                            </div>
                            {this.state.isShowCancel ? (
                                <div className="search-cancel">取消</div>
                            ) : null}
                        </div>
                        {this.state.history.length > 0 && this.state.isShowHistory ? (
                            <div className="record-keys">
                                {this.state.history.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <div className="record-main">
                                                <span className="icon icon-clock" />
                                                <span className="record-con ellipsis">{item}</span>
                                                <span className="icon icon-close" />
                                            </div>
                                        </li>
                                    );
                                })}
                                <p className="record-delete">清除搜索记录</p>
                            </div>
                        ) : null}
                        {this.state.isShowSearchResults ? (
                            <div className="search-results">
                                <div className="song-list">
                                    {this.state.searchResult.map(list => {
                                        return (
                                            <div
                                                className="song-item"
                                                key={list.songid}
                                                onClick={this.showPlayerDetail.bind(this, list)}
                                            >
                                                <i className="icon icon-music" />
                                                <div className="song-name">
                                                    {htmlDecode(list.songname)}
                                                </div>
                                                <div className="song-artist">
                                                    {list.singer.map((artist, index) => {
                                                        return (
                                                            <span key={index}>
                                                                {htmlDecode(artist.name) + ' '}
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                {this.state.fetching ? (
                                    <div className="search-loading show">
                                        <i className="loading-icon" />
                                        <div className="loading-text">正在载入更多...</div>
                                    </div>
                                ) : null}
                                {this.state.isLoad ? null : (
                                    <div className="search-loading show">
                                        <div className="loading-done">已加载全部</div>
                                    </div>
                                )}
                            </div>
                        ) : null}
                        {!this.state.isShowHistory && !this.state.isShowSearchResults ? (
                            <div className="mod-search-result" id="hot-keys">
                                <h3 className="result-tit">热门搜索</h3>
                                {this.state.isGetHotKey ? (
                                    <div className="result-tags">
                                        <a
                                            href={this.state.data.special_url}
                                            className="tag tag-hot"
                                        >
                                            {this.state.data.special_key}
                                        </a>
                                        {this.state.hotkeys.map(hotkey => {
                                            return (
                                                <div className="tag tag-keyword" key={hotkey.n}>
                                                    {hotkey.k}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="search-loading show">
                                        <i className="loading-icon" />
                                        <div className="loading-text">正在加载...</div>
                                    </div>
                                )}
                            </div>
                        ) : null}
                    </div>
                    {this.props.isShowPlayer ? <Player /> : null}
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        hotkeys: state.getData.hotkeys,
        isShowPlayer: state.getData.isShowPlayer
    }),
    {
        getHotList,
        showPlayer,
        getSong
    }
)(Search);
