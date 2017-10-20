import { notification, message } from 'antd';
// import * as loginAction from '../actions/login';

export function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}

export function parseJSON(response) {
    return response.json()
}

export let headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Credentials': 'true',
})

export function myFetch(url, option) {

    let defaultOption = {
        credentials: 'include',
    }

    return fetch(url, Object.assign({}, defaultOption, option))
        .then(checkStatus)
        .then(parseJSON)
        .then(response => {
            if(response && (response.statusCode==405 || response.statusCode==401)){// 无权限 或者 过期
                // 清除标记cookie
                // loginAction.setUserID();
                // 刷新网页
                // window.location.reload(true);
                console.log('没有cookie就没有呗')
            } else if (response && !response.success || !response) {
                console.log('老子就是不报false怎么样！')
                // notification.error({
                //     message: `${url}:${response.success}`,
                //     description: response.message,
                //     duration: 0,
                // })
                // console.log(response);
                return response;
            } else if (response && response.success) {
                message.destroy();
                return response;
            } else {
                return Object.create(null);
            }
        }).catch(error => {
            // notification.error({
            //     message: `${url}:error`,
            //     description: JSON.stringify(error),
            //     duration: 0,
            // });
            // 清除用户伪标记，跳入登陆逻辑
            // debugger;
            // loginAction.setUserID();
            // window.location.reload(true);
        });
}

/**
 * 一维JS对象 转 formData
 * @param {*} data 
 */
export function serializeToFormData(data = {}) {
    // 过滤 null/undefined 转为 formData
    let formData = new FormData();
    Object.keys(data).filter(i => data[i] != null && data[i] != undefined).forEach(i => {
        formData.append(i, data[i]);
    });
    return formData;
}