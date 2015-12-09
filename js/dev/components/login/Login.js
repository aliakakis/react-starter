import React from 'react';
//import EventEmitter from '../../../lib/EventEmitter/EventEmitter';
import { Router, Route, Link } from 'react-router';
import Captcha from '../captcha/Captcha';
import ReactJQueryUI from '../../../lib/ReactJQueryUI/ReactJQueryUI';

/** Material UI imports */
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardExpandable from 'material-ui/lib/card/card-expandable';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';

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
            this._loginService(ReactDOM.findDOMNode(this.refs.username).value, ReactDOM.findDOMNode(this.refs.password).value, false);
        }
        else {
            if (this.captcha.state.captchaLabel == this.captcha.state.captchaInput) {
                this._loginService(ReactDOM.findDOMNode(this.refs.username).value, ReactDOM.findDOMNode(this.refs.password).value, false);
            }
            else {
                Materialize.toast("Please check captcha.", 4000);
            }
        }
    }

    _loginService = (username, password, decrypt) => {
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

    handleLoginClick = (e) => {
        e.preventDefault();
        this._loginUser();
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
            <Card>
                <CardTitle title="Title" subtitle="Subtitle"/>
                <CardActions>
                    <FlatButton label="Action1"/>
                    <FlatButton label="Action2"/>
                </CardActions>
                <Captcha ref={(ref) => this.captcha = ref} show={this.state.showCaptcha}/>
                <CardText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                    Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                </CardText>
            </Card>
        )
    }
}
