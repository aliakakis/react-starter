import React from 'react';

import { Enhance } from '../../decorators/decorators';

export default Enhance(class Captcha extends React.Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        show: false
    };

    static propTypes = {
        show: React.PropTypes.bool
    };

    state = {
        captchaLabel: "",
        captchaInput: ""
    };

    componentWillMount = () => {

    };

    componentDidMount = () => {
        let captchaValue = Math.floor((Math.random() * 10000000) + 1);
        this.setState({
            captchaLabel: captchaValue
        });

        var canvas = this.canvasCode,
            ctx = canvas.getContext('2d');
        ctx.font='14px Arial';
        ctx.strokeText(captchaValue, 10, 18);
    };

    componentWillReceiveProps   = () => {

    };

    componentWillUpdate  = () => {

    };

    componentDidUpdate  = () => {

    };

    componentWillUnmount = () => {

    };

    /**
     *  Class Custom functions
     *
     */
    _handleChangeCaptcha = (e) => {
        e.preventDefault();
        this.setState({
            captchaInput: e.target.value
        });
    };

    render = () => {
        let divStyle = {
            display: this.props.show ? 'block' : 'none'
        };

        return (
            <div style={divStyle}>
                <div className="row margin">
                    <div className="input-field col s12">
                        <label className="center-align">Please verify you are human:
                            <canvas ref={(ref) => this.canvasCode = ref} width="100" height="20"></canvas>
                        </label>
                    </div>
                </div>
                <div className="row margin">
                    <div className="input-field col s12">
                        <input type="text" placeholder="Enter code" className="validate" onChange={this._handleChangeCaptcha}/>
                    </div>
                </div>
            </div>
        )
    };
})
