var React = require('react');
var ReactDom = require('react-dom');
var shallowEqual = require('react-addons-shallow-compare');

function wrapWidget(name) {
    var displayName = 'React' + name[0].toUpperCase() + name.slice(1);

    return React.createClass({
        render: function() {
            return (
                <div>
                    {this.props.children}
                </div>
            );
        },

        componentDidUpdate: function(prevProps) {
            if (!shallowEqual(prevProps, this.props)) {
                this._runPlugin();
            }
        },

        componentDidMount: function() {
            this._runPlugin();
        },

        _runPlugin: function() {
            var $node = $(ReactDom.findDOMNode(this));
            $node[name](this.props);
            this.$ = $node;
        },

        displayName: displayName
    });
}

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

module.exports = ReactJQueryUI;