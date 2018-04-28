import * as search from './action-type';
import API from '../../config/api';

// 缓存搜索历史
export const setHistoryKey = (keyword) => {
    return {
         type: search.SET_HISTORY_KEY,
         keyword
    }
}

export const getHotList = () => {
    return async dispatch => {
        try {
            let result = await API.hotList();
            dispatch({
                type: search.GET_HOT_LIST,
                data: result
            })
        }catch(err) {
            throw err;
        }
    }
}