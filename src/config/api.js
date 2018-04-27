import Server from './server';
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
            let result = await this.axios('get',RECOMMEND_URL);
            console.log(result);
            return result.data
        } catch(err) {
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
}

export default new API();