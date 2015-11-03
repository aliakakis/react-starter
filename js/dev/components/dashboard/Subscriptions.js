var React = require('react');
var ReactDOM = require('react-dom');

import { Router, Route, RouteHandler, Link, DefaultRoute } from 'react-router';
//var Link = Router.Link;

//var classnames = require('classnames');

var Subscriptions =  React.createClass({
    getInitialState: function() {
        return {
            "page": 0,
            "index": 0,
            "offset": 20,
            "sortBy": "Srv_User_UserName",
            "sortType": "DESC",
            "searchFields": {
                "Srv_Id": 0,
                "Srv_DisplayName": "",
                "Srv_User_UserName": "",
                "Srv_Type": "GOAZBF",
                "Srv_Units": 0,
                "Srv_Locked": false,
                "Srv_Status": true,
                "Srv_BillingId": "",
                "Srv_Billing_Customer_Id": "",
                "Srv_CreatedDate": "",
                "Srv_CreatedDate_SearchType": "",
                "Srv_UpdateDate": "",
                "Srv_UpdateDate_SearchType": "",
                "Srv_UpdatedBy_UserName": ""
            }
        };
    },
    componentWillMount : function() {

    },
    componentDidMount: function() {
        this._getCloudServices(JSON.parse(localStorage.getItem("GoDashProUser")).Token,
            this.state.index,
            this.state.offset,
            this.state.sortBy,
            this.state.sortType,
            this.state.searchFields);

    },
    componentWillUnmount : function() {

    },

    /*
     *   Class Custom functions
     *
     * */
    
    _getCloudServices: function(token, index, offset, sortBy, sortType, searchFields) {
        $.ajax({
            method: 'POST',
            url: '' + location.protocol + '//' + location.host + '/GODashPro/Srv_Api/WebAPIRest.svc/GetCloudServices?'+'v1='+token+'&v2='+index+'&v3='+offset+'&v4='+sortBy+'&v5='+sortType,
            cache: false,
            data: JSON.stringify({"searchFields": searchFields}),
            dataType: "json",
            contentType : 'application/json',
            success: function(data) {
                if (data.GetCloudServicesResult.Error.Found) {
                    Materialize.toast(data.GetCloudServicesResult.Error.Message, 4000);
                }
                else {
                    this._createDataTable(data);
                }
            }.bind(this),
            error: function(xhr, status, err) {
                Materialize.toast(err.toString(), 4000);
            }.bind(this)
        });
    },
    
    handleLogoutClick: function(event) {
        event.preventDefault();
        //console.log(event);
        //this.transitionTo('subscriptions');
    },

    render: function() {
        return (
            <div id="striped" className="section scrollspy">

            </div>
        );
    }
});

module.exports = Subscriptions;