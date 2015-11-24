export default EventEmitter = (() => {
    var registeredEvents = {};

    return {
        // Register event
        on: (eventName, callback) => {
            // First delete event if already registered then create again
            typeof registeredEvents[eventName] == "undefined" ? registeredEvents[eventName] = callback : (delete registeredEvents[eventName], registeredEvents[eventName] = callback);
        },
        // Broadcast event
        emit: (eventName) => {
            registeredEvents[eventName]();
        },
        // Delete event
        off: (eventName) => {
            delete registeredEvents[eventName];
        }
    };
})();


