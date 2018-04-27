import axios from 'axios';
import { baseUrl } from './api';
/**
 * @description 主要params参数
 * @params method {string} 方法名
 * @params url {string} 请求地址  例如：/login
 * @params baseURL {string} 请求地址统一前缀 ***需要提前指定***  例如：http://xxx.com
 * @params timeout {number} 请求超时时间 默认 30000
 * @params params {object}  get方式传参key值
 * @params headers {string} 指定请求头信息
 * @params withCredentials {boolean} 请求是否携带本地cookies信息默认开启
 * @params validateStatus {func} 默认判断请求成功的范围 200 - 300
 * 注意：params中的数据会覆盖method url 参数，所以如果指定了这2个参数则不需要在params中带入
 * @export
 * @return {Promise}
 * @class Server
 */
export default class Server {
    axios(method, url, params) {
        return new Promise((resolve, reject) => {
            if (typeof params !== 'object') params = {};
            let _option = params;
            _option = {
                method,
                url,
                timeout: 30000,
                params: null,
                data: null,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                baseURL: baseUrl,
                withCredentials: false, //是否携带cookies发起请求
                validateStatus: function(status) {
                    return status >= 200 && status < 300; // default
                },
                ...params
            };
            axios.request(_option).then(
                res => {
                    resolve(typeof res.data === 'object' ? res.data : JSON.parse(res.data));
                },
                error => {
                    if (error.response) {
                        reject(error.response);
                    } else {
                        reject(error);
                    }
                }
            );
        });
    }
}
