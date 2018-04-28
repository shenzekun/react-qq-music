import Server from './server';
import { searchUrl, lyricsUrl } from './utils';
export const baseUrl = 'https://shenzekun-qmusic-api.now.sh';
export const RECOMMEND_URL = `${baseUrl}`;
export const TOPLIST_URL = `${baseUrl}/top`;
export const SEARCH_URL = `${baseUrl}/search`;
export const LYRICS_URL = `${baseUrl}/lyrics`;
export const HOTKEYS_URL = `${baseUrl}/hotkey`;

class API extends Server {
    /**
     * @description 获取推荐页数据
     * @returns
     * @memberof API
     */
    async recommendList() {
        try {
            let result = await this.axios('get', RECOMMEND_URL);
            return result.data;
        } catch (err) {
            throw err;
        }
    }

    /**
     * @description 获取排名歌单
     * @param {any} params
     * @returns
     * @memberof API
     */
    async rankList() {
        try {
            let result = await this.axios('get', TOPLIST_URL);
            return result.data;
        } catch (err) {
            throw err;
        }
    }

    /**
     * @description 获取热门搜索关键词
     * @returns
     * @memberof API
     */
    async hotList() {
        try {
            let result = await this.axios('get', HOTKEYS_URL);
            return result.data;
        } catch (err) {
            throw err;
        }
    }

    /**
     * @description 获取搜索内容
     * @param {any} keyword
     * @param {any} page
     * @returns
     * @memberof API
     */
    async searchList(keyword, page) {
        try {
            let result = await this.axios('get', searchUrl(keyword, page));
            if (result.message === 'query error') {
                throw result.message
            } else {
                console.log(result);
                return result.data;
            }
        } catch (err) {
            throw err;
        }
    }

    /**
     * @description 获取歌词
     * @param {any} songid 
     * @returns 
     * @memberof API
     */
    async getLyrics(songid) {
        try {
            let result = await this.axios('get', lyricsUrl(songid));
            console.log(result);
            return result;
        } catch (err) {
            throw err;
        }
    }
}

export default new API();
