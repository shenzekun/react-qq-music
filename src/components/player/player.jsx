import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './player.scss';

class Player extends Component {
    state = {};
    render() {
        return (
            <div id="player">
                <div class="player-container">
                    <div class="player-header">
                        <img src="getAlbumCover(song.albummid)" alt="图片" class="album-cover" />
                        <div class="song-info">
                            <div class="song-name" v-html="song.songname" />
                            <div class="song-artist" v-html="artist" />
                        </div>
                        <span class="icon-action icon-play" />
                    </div>
                    <div class="player-lyrics">
                        <div class="player-lyrics-lines" ref="lyricsLines">
                            <div
                                class="player-lyrics-line"
                                v-for="list in lyrics"
                                v-show="lyrics.length !== 0"
                            >
                                {list.slice(10)}
                            </div>
                            <div class="player-lyrics-line" v-show="fetching">
                                正在加载歌词,请等待...
                            </div>
                        </div>
                    </div>
                    <div class="player-footer">
                        <div class="icon-list" />
                        <div class="progress">
                            <div class="progress-time progress-elapsed">{elapsed}</div>
                            <div class="progress-bar">
                                <div class="progress-bar-progress" ref="$progress" />
                            </div>
                            <div class="progress-time progress-duration">{song.interval}</div>
                        </div>
                        <div class="action">
                            <a href="#" class="btn-download">
                                下载这首歌
                            </a>
                        </div>
                    </div>
                </div>
                <div class="player-background" />
                <audio src="getSongUrl(song.songmid)" ref="audio" />
            </div>
        );
    }
}

export default Player;
