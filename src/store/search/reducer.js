import * as search from './action-type';
const initState = {
    hotkeys: {}, // 热门关键词
    isShowPlayer: false, // 是否显示 player
    song: {}, // 歌的信息
    artist: '', // 歌的作者
    isPlay: false // 是否播放
};
export const getData = (state = initState, action = {}) => {
    switch (action.type) {
        case search.SHOW_PLAYER:
            return {
                ...state,
                ...{ isShowPlayer: action.isShowPlayer }
            };
        case search.CANCEL_PLAYER:
            return {
                ...state,
                ...{ isShowPlayer: action.isShowPlayer }
            };
        case search.GET_HOT_LIST:
            return {
                ...state,
                ...{ hotkeys: action.data }
            };
        case search.GET_SONG:
            return {
                ...state,
                ...{
                    song: action.song,
                    artist: action.artist
                }
            };
        case search.SET_PLAYING_STATE:
            return {
                ...state,
                ...{
                    isPlay: action.isPlay
                }
            };
        default:
            return state;
    }
};
