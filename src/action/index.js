export const setUser = (data) => {
  return {
    type: "SETUSER",
    payload: data,
  };
};
export const removeUser = () => {
  return {
    type: "REMOVEUSER",
  };
};
