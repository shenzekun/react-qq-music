import * as search from './action-type';
const initState = {
    hotkeys: {}, // 热门关键词
    keyword: ''
};
export const getData = (state = initState, action = {}) => {
    switch (action.type) {
        case search.SET_HISTORY_KEY:
            return {
                ...state,
                ...{ keyword: action.keyword }
            };
        case search.GET_HOT_LIST:
            return {
                ...state,
                ...{hotkeys: action.data}
            };
        default:
            return state;
    }
};
