function login(cb){
    setTimeout(()=>{
        console.log("Login success");
        cb();
    },2000)
}
function fetchProfile(cb){
    setTimeout(()=>{
        console.log("Profile fetched");
        cb();
    },2000)
}
function fetchOrders(cb){
    setTimeout(()=>{
        console.log("Orders Fetched");
        cb();
    },2000)
}
function loginPromise(){
    return new Promise((resolve) => {
        login(resolve);
    });
}
function fetchProfilePromise(){
    return new Promise((resolve) => {
        fetchProfile(resolve);
    });
}
function fetchOrdersPromise(){
    return new Promise((resolve) => {
        fetchOrders(resolve);
    });
}
loginPromise()
    .then(() => fetchProfilePromise())
    .then(() => fetchOrdersPromise())
    .then(() => {
        console.log("All done");
    })
    .catch((err) => {
        console.log("Error:", err);
    });