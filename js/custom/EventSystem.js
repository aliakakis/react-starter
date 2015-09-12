var CustomEvents = (function() {
    var registeredEvents = {};

    return {
        // Register event
        "on": function(eventName, callback) {
            registeredEvents[eventName] = callback;
        },
        // Broadcast event
        "emit": function(eventName) {
            registeredEvents[eventName]();
        },
        // Delete event
        "off": function(eventName) {
            delete registeredEvents[eventName];
        }
    };
})();

module.exports = CustomEvents;

