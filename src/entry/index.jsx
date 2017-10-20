import Library from './test';
import moment from 'moment';
if (module.hot) {
    module.hot.accept('./test', function () {
        console.log('Accepting the updated test module!');
        Library.log();
    })
    console.log(`%c 本地开发环境运行正常 %c ${moment().format(`YYYY-MM-DD HH:mm:ss`)}`, 'background:#333;color:white', 'color:red');
}

require('babel-polyfill');
if (!window.Promise) {
    require('es6-promise').polyfill();
} else if (!window.fetch) {
    require('whatwg-fetch');
}
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
// import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect
} from 'react-router-dom';

import RootReducer from '../reducers/index';

import { Layout, Menu, Breadcrumb, Icon, Avatar, Button, notification } from 'antd';
notification.config({ top: 100, });
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import style from './style.less';
window.onerror = (errorMessage, scriptURI, lineNumber, columnNumber, errorObj) => {
    console.table({
        errorMessage: errorMessage,
        scriptURI: scriptURI,
        lineNumber: lineNumber,
        columnNumber: columnNumber,
        errorObj: errorObj,
    });
}

// let loggerMiddleware = createLogger();
const store = createStore(
    combineReducers(RootReducer),
    applyMiddleware(
        thunkMiddleware,
        // loggerMiddleware
    )
);

import PlayControl from '../view/musicPlayer/index';

class Home extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {status: true};
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e)
    {
        this.setState({status:!this.state.status});
    }
    render()
    {
        return (
            <div>
                <h1>React 音乐播放器</h1>
                <PlayControl />
            </div>
        );
    }
}

ReactDOM.render(<Home />, document.getElementById('root'));
