import React from 'react';
//import EventEmitter from '../../../lib/EventEmitter/EventEmitter';
import { Router, Route, Link } from 'react-router';
import Captcha from '../captcha/Captcha';
import ReactJQueryUI from '../../../lib/ReactJQueryUI/ReactJQueryUI';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        username: "John Doe",
        password: "",
        showCaptcha: false
    }

    static defaultProps = {

    }

    static propTypes = {

    }

    /**
     *  WITH MATERIALIZE CSS INITIALIZE ANY JQUERY
     *  COMPONENT IN THIS LIFECYCLE METHOD
     */
    componentDidMount = () => {
        if (Number(localStorage.getItem("LoginAttempts")) > 2) {
            this.setState({
                showCaptcha: true
            });
        }
    }

    /*
     *  Class Custom functions
     * */
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
    }

    _loginService = (username, password) => {
        $.ajax({
            method: 'GET',
            url: "PLACE YOUR URL",
            cache: false,
            data: {
                v1: username,
                v2: password,
                v3: decrypt
            },
            dataType: "json",
            contentType : 'application/json; charset-uf8',
            success: function(data) {
                if (data.HasError) {
                    this._checkCaptcha();
                    Materialize.toast(data.ErrorMessage, 4000);
                }
                else {
                    //Store user for all calls
                    localStorage.removeItem("LoginAttempts");
                    this.setState({
                        showCaptcha: false
                    });
                    localStorage.setItem("GoDashProUser", JSON.stringify({
                        "Token": data.Token,
                        "Usr_UserAvatar": data.userAvatar,
                        "Usr_Username": data.userUserName,
                        "Usr_Email": data.userEmail,
                        "Usr_FirstName": data.userFirstName,
                        "Usr_LastName": data.userLastName,
                        "Usr_CompanyName": data.userCompany,
                        "Usr_CountryCode": data.userCountryCode,
                        "isAdmin": data.isAdmin
                    }));

                    //Navigate to subscriptions
                    this.transitionTo('subscriptions');
                }
            }.bind(this),
            error: function(xhr, status, err) {
                this._checkCaptcha();
                Materialize.toast(err.toString(), 4000);
            }.bind(this)
        });
    }

    _checkCaptcha = () => {
        localStorage.setItem("LoginAttempts", String(Number(localStorage.getItem("LoginAttempts")) + 1));
        if (Number(localStorage.getItem("LoginAttempts")) > 2) {
            this.setState({
                showCaptcha: true
            });
        }
    }

    _handleLoginClick = (e) => {
        e.preventDefault();
        //this._loginUser();
        console.log(this.username.value, this.password.value);
    }

    // jQuery UI event example as prop
    /*_start = (e, ui) => {
        console.log(e);
        console.log(ui);
    };*/

    render = () => {
        /*
         *   Replace with Draggable for a jQuery ui example
         * */
        /*<ReactJQueryUI.Draggable helper="clone" revert="invalid" start={this._start}>
            <h5 className="header center orange-text">Admin Console</h5>
          </ReactJQueryUI.Draggable>*/

        return (
            <div id="login-page" className="row">
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
                                <Captcha ref={(ref) => this.captcha = ref} show={this.state.showCaptcha}/>
                            </div>
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
        )
    }
}
