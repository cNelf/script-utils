class EventEmitter {
  _eventHandlers = {};

  on(eventName, handler) {
    if (!this._eventHandlers.eventName) {
      this._eventHandlers.eventName = [];
    }

    this._eventHandlers.eventName.push(handler);
  }

  off(eventName, handler) {
    const handlers = this._eventHandlers.eventName;
    if (!handlers) {
      return;
    }
    for (let i = 0; i < handlers.length; i++) {
      if (handlers[i] === handler) {
        handlers.splice(i--, 1);
      }
    }
  }

  trigger(eventName, ...args) {
    if (!this._eventHandlers.eventName) {
      return;
    }

    this._eventHandlers.eventName.forEach((handler) => {
      handler.apply(this, args);
    });
  }
}

module.exports = EventEmitter;
