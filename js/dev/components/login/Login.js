import React from 'react';
//import EventEmitter from '../../../lib/EventEmitter/EventEmitter';
import { Router, Route, Link } from 'react-router';
import Captcha from '../captcha/Captcha';
import ReactJQueryUI from '../../../lib/ReactJQueryUI/ReactJQueryUI';

import {observer} from 'mobx-react';
//import DevTools from 'mobx-react-devtools';
//<DevTools />
/**
 * Velocity animation
 *
 */
import VelocityComponent from 'velocity-react/velocity-component';
import VelocityTransitionGroup from 'velocity-react/velocity-transition-group';
import velocityHelpers from 'velocity-react/velocity-helpers';

@observer
export default class Login extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        username: "John Doe",
        password: ""
    };

    static defaultProps = {

    };

    static propTypes = {

    };

    /**
     *  WITH MATERIALIZE INITIALIZE ANY JQUERY
     *  COMPONENT IN THIS LIFECYCLE METHOD
     */
    componentDidMount = () => {
        if (Number(localStorage.getItem("LoginAttempts")) > 2) {
            this.setState({
                showCaptcha: true
            });
        }
    };

    /**
     *  Class Custom functions
     *
     */

    _handleLoginClick = (e) => {
        e.preventDefault();
        this.props.route.store.addItem("New User");
        //this._loginUser();
    };

    _loginUser = () => {
        if (!this.state.showCaptcha) {
            this._loginService(this.username.value, this.password.value);
        }
        else {
            if (this.captcha.state.captchaLabel == this.captcha.state.captchaInput) {
                this._loginService(this.username.value, this.password.value);
            }
            else {
                Materialize.toast("Please check captcha.", 4000);
            }
        }
    };

    _checkCaptcha = () => {
        localStorage.setItem("LoginAttempts", String(Number(localStorage.getItem("LoginAttempts")) + 1));
        if (Number(localStorage.getItem("LoginAttempts")) > 2) {
            this.setState({
                showCaptcha: true
            });
        }
    };

    _loginService = (username, password) => {
        $.ajax(
            {
                type: 'GET',
                url: "PLACE YOUR URL",
                cache: false,
                data: {
                    v1: username,
                    v2: password
                },
                dataType: "json",
                contentType : 'application/json; charset-uf8'
            }
            )
            .done((data) => {
                alert("success");
            })
            .fail((jqXhr) => {
                alert("error");
            })
            .always(() => {
                alert("complete");
            });
    };

    // jQuery UI event example as prop
    /*_start = (e, ui) => {
        console.log(e);
        console.log(ui);
    };*/

    render = () => {

        /**
         *  Replace with Draggable for a jQuery ui example
         *
         */

        /*<ReactJQueryUI.Draggable helper="clone" revert="invalid" start={this._start}>
            <h5 className="header center orange-text">Admin Console</h5>
          </ReactJQueryUI.Draggable>*/

        let items = this.props.route.store.items.map((value, key) => {
            return <div key={key}>Item {value}</div>;
        });

        return (
            <VelocityComponent animation={{ opacity: 1 }} duration={500} runOnMount={true}>
                <div id="login-page" className="row" style={{opacity: 0}}>
                    <div className="col s12 z-depth-2 card-panel">
                        <form className="login-form">
                            <div className="row">
                                <div ref={(ref) => this.headerTitle = ref} className="input-field col s12 center">
                                    <h5 className="header center orange-text">Admin Console</h5>
                                </div>
                            </div>
                            <div className="row margin">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">perm_identity</i>
                                    <input ref={(ref) => this.username = ref} type="text"/>
                                    <label htmlFor="username" className="center-align">Username</label>
                                </div>
                            </div>
                            <div className="row margin">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">lock_outline</i>
                                    <input ref={(ref) => this.password = ref} type="password"/>
                                    <label htmlFor="password">Password</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12 m12 l12">
                                    <input type="checkbox" id="remember-me"/>
                                    <label htmlFor="remember-me">Remember me</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12 m12 l12">
                                    <Captcha ref={(ref) => this.captcha = ref} show={true}/>
                                </div>
                            </div>
                            <div className="row">
                                {items}
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <a href="#" className="btn waves-effect waves-light col s12 orange" onClick={this._handleLoginClick}>Login</a>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s6 m6 l6">
                                    <p className="margin medium-small"><a href="page-register.html">Register Now!</a></p>
                                </div>
                                <div className="input-field col s6 m6 l6">
                                    <p className="margin right-align medium-small"><a href="page-forgot-password.html">Forgot password ?</a></p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </VelocityComponent>
        )
    };
}
