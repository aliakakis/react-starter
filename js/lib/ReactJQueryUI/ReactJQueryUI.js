import React from 'react';
import ReactDOM from 'react-dom';
import shallowEqual from 'react-addons-shallow-compare';

var wrapWidget = (name) => {
    var displayName = 'React' + name[0].toUpperCase() + name.slice(1);

    return class extends React.Component {
        constructor(props) {
            super(props);
        }

        render = () => {
            return this.props.children;
        };

        componentDidUpdate = (prevProps) => {
            if (!shallowEqual(prevProps, this.props)) {
                this._runPlugin();
            }
        };

        componentDidMount = () => {
            this._runPlugin();
        };

        _runPlugin = () => {
            var $node = $(ReactDOM.findDOMNode(this));
            $node[name](this.props);
            this.$ = $node;
        };

        displayName: displayName;
    }
};

var WIDGETS = {
    Accordion: 'accordion',
    Autocomplete: 'autocomplete',
    Button: 'button',
    DatePicker: 'datepicker',
    Draggable: 'draggable',
    Droppable: 'droppable',
    Menu: 'menu',
    ProgressBar: 'progressbar',
    Resizable: 'resizable',
    Selectable: 'selectable',
    Sortable: 'sortable',
    Slider: 'slider',
    Spinner: 'spinner',
    Tabs: 'tabs',
    Tooltip: 'tooltip'
};

var ReactJQueryUI = {};

for (var key in WIDGETS) {
    ReactJQueryUI[key] = wrapWidget(WIDGETS[key]);
}

export default ReactJQueryUI;


