const initialState = null;
const user = (state = initialState, action) => {
  switch (action.type) {
    case "SETUSER":
      state = action.payload;
      return state;

    case "REMOVEUSER":
      state = null;
      return state;

    default:
      return {
        state,
      };
  }
};

export default user;
