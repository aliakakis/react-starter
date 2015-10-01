var React = require('react/addons');
//var CustomEvents = require('../../../custom/EventSystem');

var Router = require('react-router');

var Captcha = require('../captcha/Captcha');

var Login =  React.createClass({
    mixins: [Router.State, Router.Navigation],
    getInitialState: function() {
        return {
            username: "John Doe",
            password: "",
            showCaptcha: false
        };
    },
    componentDidMount: function() {
        /*if (Number(localStorage.getItem("LoginAttempts")) > 2) {
            this.setState({
                showCaptcha: true
            });
        }*/
    },

    /*
     *  Class Custom functions
     * */
    _loginUser: function() {
        //console.log(this.refs.captcha);
        if (!this.state.showCaptcha) {
            this._loginService(React.findDOMNode(this.refs.username).value, React.findDOMNode(this.refs.password).value, false);
        }
        else {
            if (this.refs.captcha.state.captchaLabel == this.refs.captcha.state.captchaInput) {
                this._loginService(React.findDOMNode(this.refs.username).value, React.findDOMNode(this.refs.password).value, false);
            }
            else {
                Materialize.toast("Please check captcha.", 4000);
            }
        }
    },

    _loginService: function(username, password, decrypt) {
        $.ajax({
            method: 'GET',
            url: '' + location.protocol + '//' + location.host + '/GODashPro/Srv_Api/WebAPIRest.svc/LoginApiUser_UAIO',
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
                    localStorage.setItem("LoginAttempts", String(Number(localStorage.getItem("LoginAttempts")) + 1));
                    if (Number(localStorage.getItem("LoginAttempts")) > 2) {
                        this.setState({
                            showCaptcha: true
                        });
                    }
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
                Materialize.toast(err.toString(), 4000);
            }.bind(this)
        });
    },

    handleLoginClick: function(event) {
        event.preventDefault();
        this._loginUser();
    },

    render: function() {
        return (
            <div id="login-page" className="row">
                <div className="col s12 z-depth-2 card-panel">
                    <form className="login-form">
                        <div className="row">
                            <div className="input-field col s12 center">
                                <h5 className="header center orange-text">Admin Console</h5>
                            </div>
                        </div>
                        <div className="row margin">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">perm_identity</i>
                                <input ref="username" type="text"/>
                                <label htmlFor="username" className="center-align">Username</label>
                            </div>
                        </div>
                        <div className="row margin">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">lock_outline</i>
                                <input ref="password" type="password"/>
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
                                <Captcha ref="captcha" show={this.state.showCaptcha}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <a href="#" className="btn waves-effect waves-light col s12 orange" onClick={this.handleLoginClick}>Login</a>
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
        );
    }
});

module.exports = Login;