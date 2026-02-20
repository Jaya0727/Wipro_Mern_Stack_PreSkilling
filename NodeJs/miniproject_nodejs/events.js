const EventEmitter = require("events");
const emitter = new EventEmitter();
emitter.on("userLogin",(data) => {
  console.log(`EVENT: ${data.user} logged in`);
});
emitter.on("dataFetched",() => {
  console.log("EVENT: User data fetched");
});
module.exports = emitter;
