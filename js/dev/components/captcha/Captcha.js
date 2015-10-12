/*
*   ES2015 example
* */

import React from 'react';
import ReactDOM from 'react-dom';

/*
*   High order component example
* */
var Enhance = ComposedComponent => class extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: null };
    }
    componentDidMount() {
        this.setState({ data: 'Hello' });
    }
    render() {
        return <ComposedComponent {...this.props} data={this.state.data} />;
    }
};

export default class Captcha extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            captchaLabel: "",
            captchaInput: ""
        };
    }
    componentWillMount() {

    }
    componentDidMount() {
        var captcha = Math.floor((Math.random() * 10000000) + 1);
        this.setState({
            captchaLabel: captcha
        });

        var canvas = ReactDOM.findDOMNode(this.refs.canvasCode),
            ctx = canvas.getContext('2d');
        ctx.font='18px Arial';
        ctx.strokeText(captcha, 10, 18);
    }
    componentWillUnmount() {

    }

    /*
     *   Class Custom functions
     *
     * */
    handleChangeCaptcha(event) {
        event.preventDefault();
        this.setState({
            captchaInput: event.target.value
        });
    }

    render() {
        var divStyle = {
            display: this.props.show ? 'block' : 'none'
        };

        return (
            <div style={divStyle}>
                <div className="row margin">
                    <div className="input-field col s12">
                        <label className="center-align">Please verify you are human: <canvas ref="canvasCode" width="100" height="20"></canvas></label>
                    </div>
                </div>
                <div className="row margin">
                    <div className="input-field col s12">
                        <input ref="captcha" type="text" placeholder="Enter code" className="validate" onChange={this.handleChangeCaptcha}/>
                    </div>
                </div>
            </div>
        );
    }
}
