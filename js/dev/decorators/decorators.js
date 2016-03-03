/*
 *   High order component example
 * */

import React from 'react';
import ReactDOM from 'react-dom';

export const enhance = ComposedComponent => class extends React.Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        enhanced: "yeap"
    };

    static propTypes = {
        enhanced: React.PropTypes.string
    };

    state = {
        data: null
    };

    componentDidMount = () => {
        this.setState({ data: 'Hello' });
    };

    render = () => {
        return <ComposedComponent {...this.props} {...this.state} />;
    };
};

