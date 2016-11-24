const EventEmitter = require('events');

class AppEmitter extends EventEmitter {}

const evt = new AppEmitter();