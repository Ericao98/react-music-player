import React from 'react';
import { connect } from 'react-redux';
import * as testAction from '../../actions/test'

import { Table,Modal } from 'antd';

import style from './style.less';

class PlayControl extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {progress: 0, totalTime: 20, status: true};
        this.progressAdder = this.progressAdder.bind(this);
        this.controlButton = this.controlButton.bind(this);
        this.resetButton = this.resetButton.bind(this);
    }
    progressAdder()
    {
        if (this.state.progress < this.state.totalTime)
        {
            this.setState({progress: this.state.progress + 0.1});
        }
        else
        {
            this.setState({status: false});
            this.componentWillUnmount();
        }
    }
    controlButton(e)
    {
        this.state.status ? this.componentWillUnmount() : this.componentDidMount();
        this.setState({status: !this.state.status});
    }
    resetButton(e)
    {
        if (!this.state.status)
            this.componentDidMount();
        this.setState({progress: 0, status: true});
    }
    componentDidMount()
    {
        this.timerID = setInterval(this.progressAdder, 100);
    }
    componentWillUnmount()
    {
        clearInterval(this.timerID);
    }
    render()
    {
        return (
            <div className="progress">
                <div className="progressing" style={{width: Math.floor(this.state.progress) / this.state.totalTime * 100 + '%'}}></div>
                <div>
                    {Math.floor(this.state.progress)}s / {this.state.totalTime}s
                </div>
                <div>
                    <br />
                    <a className="button" onClick={this.resetButton}>上一曲</a>
                    <a className="button" onClick={this.controlButton}>{this.state.status ? "暂停" : "继续"}</a>
                    <a className="button" onClick={this.resetButton}>下一曲</a>
                </div>
            </div>
        );
    }
}

export default PlayControl;
