import React from 'react';

import { Enhance } from '../../decorators/decorators';

export default Enhance(class Captcha extends React.Component {
    state = {
        captchaLabel: "",
        captchaInput: ""
    }

    constructor(props) {
        super(props);
    }

    componentWillMount = () => {

    }

    componentDidMount = () => {
        var captcha = Math.floor((Math.random() * 10000000) + 1);
        this.setState({
            captchaLabel: captcha
        });

        var canvas = this.canvasCode,
            ctx = canvas.getContext('2d');
        ctx.font='18px Arial';
        ctx.strokeText(captcha, 10, 18);
    }

    componentWillReceiveProps   = () => {

    }

    componentWillUpdate  = () => {

    }

    componentDidUpdate  = () => {

    }

    componentWillUnmount = () => {

    }

    /*
     *   Class Custom functions
     *
     * */
    handleChangeCaptcha = (e) => {
        e.preventDefault();
        this.setState({
            captchaInput: e.target.value
        });
    }

    render = () => {
        var divStyle = {
            display: this.props.show ? 'block' : 'none'
        }

        return (
            <div style={divStyle}>
                <div className="row margin">
                    <div className="input-field col s12">
                        <label className="center-align">Please verify you are human: <canvas ref={(ref) => this.canvasCode = ref} width="100" height="20"></canvas></label>
                    </div>
                </div>
                <div className="row margin">
                    <div className="input-field col s12">
                        <input ref="captcha" type="text" placeholder="Enter code" className="validate" onChange={this.handleChangeCaptcha}/>
                    </div>
                </div>
            </div>
        )
    }
})
