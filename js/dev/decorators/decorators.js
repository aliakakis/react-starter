/*
 *   High order component example
 * */

import React from 'react';
import ReactDOM from 'react-dom';

export var Enhance = ComposedComponent => class extends React.Component {
    state = {
        data: null
    }

    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.setState({ data: 'Hello' });
    }

    _test = () => {
        console.log("hi");
    }

    render = () => {
        return <ComposedComponent {...this.props} {...this.state} />;
    }
};

