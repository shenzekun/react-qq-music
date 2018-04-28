import * as search from './action-type';
import API from '../../config/api';

// 获取热门搜索关键词
export const getHotList = () => {
    return async dispatch => {
        try {
            let result = await API.hotList();
            dispatch({
                type: search.GET_HOT_LIST,
                data: result
            });
        } catch (err) {
            throw err;
        }
    };
};

// 显示 player
export const showPlayer = () => {
    return {
        type: search.SHOW_PLAYER,
        isShowPlayer: true
    };
};

// 隐藏 player
export const cancelPlayer = () => {
    return {
        type: search.CANCEL_PLAYER,
        isShowPlayer: false
    };
};

// 获取歌手
export const getSong = list => {
    return dispatch => {
        let artists = '';
        list.singer.forEach(singer => {
            artists += singer.name;
        });
        dispatch({
            type: search.GET_SONG,
            song: list,
            artist: artists
        });
    };
};

// 设置播放状态
export const setPlayState = status => {
    return {
        type: search.SET_PLAYING_STATE,
        isPlay: status
    };
};
