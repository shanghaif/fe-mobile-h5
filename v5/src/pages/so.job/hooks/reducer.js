const reducer = (state, { type, payload }) => {
  if (type && payload) {
    return {
      ...state,
      ...payload,
    };
  }
  return state;
};

export default reducer;
