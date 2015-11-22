export default EventEmitter = (() => {
    var registeredEvents = {};

    return {
        // Register event
        "on": function(eventName, callback) {
            // First delete event if already registered then create again
            typeof registeredEvents[eventName] == "undefined" ? registeredEvents[eventName] = callback : (delete registeredEvents[eventName], registeredEvents[eventName] = callback);
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


