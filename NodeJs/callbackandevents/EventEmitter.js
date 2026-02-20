// single event multiple listeners
const EventEmitter = require("events");
const emitter = new EventEmitter();
//Listener ----> can be used for single event like the first one and the same event can be used for multiple listeners but the event is only one
emitter.on("Order Placed" , (orderId)=>{
    console.log(`Order ${orderId} processed`)
});
emitter.on("Order Placed" , (orderId)=>{
    console.log(`Email sent for order ${orderId}`)
});
emitter.on("Order Placed" , (orderId)=>{
    console.log(`Inventory updated for order ${orderId}`)
});

// Emit event
emitter.emit("Order Placed" , 101);

/*
Multiple listeners
emitter.on("order placed" ,() => console.log("Email Sent"));
emitter.on("order placed" ,() => console.log("Inventory Updated"));
emitter.on("order placed" ,() => console.log("Logs Created for Auditing"));
*/