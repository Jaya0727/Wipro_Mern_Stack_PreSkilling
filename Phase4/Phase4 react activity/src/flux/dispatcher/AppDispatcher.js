const callbacks = [];

const AppDispatcher = {
  register(cb) {
    callbacks.push(cb);
  },

  dispatch(action) {
    callbacks.forEach((cb) => cb(action));
  }
};

export default AppDispatcher;