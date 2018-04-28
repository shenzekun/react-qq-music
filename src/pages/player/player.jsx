import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './player.scss';
import { connect } from 'react-redux';
import { albumCoverUrl, songUrl } from '../../config/utils';
import { htmlDecode, formatTime, getSeconds } from '../../utils/utils';
import API from '../../config/api';
import { setPlayState, cancelPlayer } from '../../store/search/action';

class Player extends Component {
    static propTypes = {
        song: PropTypes.object.isRequired,
        artist: PropTypes.string.isRequired,
        isPlay: PropTypes.bool.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            fetching: false, // 是否正在加载
            duration: this.props.song.interval, //持续时间
            progressIntervalId: 0, // 进度条setInterval 返回的 id
            lyrics: [], //歌词
            index: 0, // 歌词页数
            progress: 0, //进度条
            elapsed: 0 //当前时间
        };
        this.isplay = false; // 是否 play
        this.lyricIntervalId = 0; // 歌词setInterval 返回的 id
        this.LINE_HEIGHT = 42; // 歌词的高度
    }
    async componentDidMount() {
        document.body.classList.add('noscroll');
        this.setState({ fetching: true });
        let res = await API.getLyrics(this.props.song.songid);
        this.setState({
            index: 0,
            lyrics: htmlDecode(res.lyric).match(/^\[\d{2}:\d{2}.\d{2}\](.+)$/gm)
        });
        this.setState({ fetching: false });
        console.log(res);
    }

    // 播放音频
    onPlay = () => {
        this.isplay = !this.isplay;
        // 如果是 play
        if (this.isplay) {
            if (this.state.fetching) return;
            this.refs.$audio.play();
            this.props.setPlayState(true);
            this.startLyrics();
            this.startProgress();
        } else {
            // 如果是 pause
            this.refs.$audio.pause();
            this.props.setPlayState(false); // 设置 play 的状态
            this.pauseLyrics();
            this.pauseProgress();
        }
    };

    // 开始歌词
    startLyrics() {
        this.pauseLyrics();
        this.lyricIntervalId = setInterval(this.updateLyrics.bind(this), 1000);
    }
    // 暂停歌词
    pauseLyrics() {
        clearInterval(this.lyricIntervalId);
    }

    //更新歌词
    updateLyrics() {
        let _this = this;
        if (this.refs.$audio && this.refs.$audio.ontimeupdate) {
            this.refs.$audio.ontimeupdate = function(e) {
                for (let i = 0, l = _this.state.lyrics.length; i < l; i++) {
                    if (
                        _this.refs.$audio.currentTime /*当前播放的时间*/ >
                        getSeconds(_this.state.lyrics[i]) - 0.5
                    ) {
                        _this.refs.$lyricsLines.children[_this.state.index].classList.remove(
                            'active'
                        );
                        _this.refs.$lyricsLines.children[i].classList.add('active');
                        _this.state.index = i;
                    }
                }
            };
            if (this.state.index > 2) {
                let y = -(this.state.index - 2) * this.LINE_HEIGHT;
                this.refs.$lyricsLines.style.transform = `translateY(${y}px)`;
            }
        }
    }

    // 重置歌词
    resetLyrics() {
        this.pauseLyrics();
        this.refs.$lyricsLines.children[this.index].classList.remove('active');
        this.setState({ index: 0 });
        // this.index = 0;
        this.refs.$lyricsLines.style.transform = `translateY(0)`;
        if (this.state.lyrics.length) {
            this.refs.$lyricsLines.children[this.state.index].classList.add('active');
        }
    }
    // 重新开始歌词
    restartLyrics() {
        this.resetLyrics();
        this.startLyrics();
    }

    // 当一首歌播放结束的时候重新播放
    onEnd() {
        this.refs.$audio.play();
        this.restartProgress();
        this.restartLyrics();
    }

    // 启动进度条
    startProgress() {
        this.pauseProgress();
        this.progressIntervalId = setInterval(this.updateProgress.bind(this), 50);
    }
    // 暂停进度条
    pauseProgress() {
        clearInterval(this.progressIntervalId);
    }
    // 更新进度条
    updateProgress() {
        this.setState(
            {
                elapsed: this.state.elapsed + 0.05
            },
            () => {
                this.setState({
                    progress: this.state.elapsed / this.state.duration
                });
            }
        );
        // this.elapsed += 0.05;
        // this.progress = this.elapsed / this.duration;
        this.refs.$progress.style.transform = `translateX(${this.state.progress * 100 - 100}%)`;
    }
    //重置进度条
    resetProgress(duration) {
        let $progress = this.pauseProgress();
        this.setState({
            elapsed: 0,
            progress: 0
        })
        // this.elapsed = 0;
        // this.progress = 0;
        this.refs.$progress.style.transform = 'translate(-100%)';
        if (duration) {
            this.setState({
                duration: +duration
            })
            // this.duration = +duration;
        }
    }
    // 重新开始进度条
    restartProgress() {
        this.resetProgress();
        this.startProgress();
    }

    //退出 player
    exit = () => {
        this.props.cancelPlayer();
        this.props.setPlayState(false);
        document.body.classList.remove('noscroll');
    };

    componentWillUnmount() {
        this.pauseLyrics();
        this.pauseProgress();
        this.setState = (state, callback) => {
            return;
        };      
    }

    render() {
        return (
            <div id="player" className="show">
                <div className="player-container">
                    <div className="player-header">
                        <img
                            src={albumCoverUrl(this.props.song.albummid)}
                            alt="图片"
                            className="album-cover"
                        />
                        <div className="song-info">
                            <div className="song-name">{htmlDecode(this.props.song.songname)}</div>
                            <div className="song-artist">{htmlDecode(this.props.artist)}</div>
                        </div>
                        <span
                            className={
                                this.props.isPlay
                                    ? 'icon-action icon-play icon-pause'
                                    : 'icon-action icon-play icon-play'
                            }
                            onClick={this.onPlay}
                        />
                    </div>
                    <div className="player-lyrics">
                        <div className="player-lyrics-lines" ref="$lyricsLines">
                            {this.state.lyrics !== 0
                                ? this.state.lyrics.map((list, index) => {
                                      // console.log(list);
                                      return (
                                          <div className="player-lyrics-line" key={index}>
                                              {list.slice(10)}
                                          </div>
                                      );
                                  })
                                : null}
                            {this.state.fetching ? (
                                <div className="player-lyrics-line">正在加载歌词,请等待...</div>
                            ) : null}
                        </div>
                    </div>
                    <div className="player-footer">
                        <div className="icon-list" onClick={this.exit} />
                        <div className="progress">
                            <div className="progress-time progress-elapsed">
                                {formatTime(this.state.elapsed)}
                            </div>
                            <div className="progress-bar">
                                <div className="progress-bar-progress" ref="$progress" />
                            </div>
                            <div className="progress-time progress-duration">
                                {formatTime(this.props.song.interval)}
                            </div>
                        </div>
                        <div className="action">
                            <a href="#" className="btn-download">
                                下载这首歌
                            </a>
                        </div>
                    </div>
                </div>
                <div
                    className="player-background"
                    style={{
                        backgroundImage: 'url(' + albumCoverUrl(this.props.song.albummid) + ')'
                    }}
                />
                <audio src={songUrl(this.props.song.songmid)} ref="$audio" onEnded={this.onEnd} />
            </div>
        );
    }
}

export default connect(
    state => ({
        song: state.getData.song,
        artist: state.getData.artist,
        isPlay: state.getData.isPlay
    }),
    {
        setPlayState,
        cancelPlayer
    }
)(Player);
