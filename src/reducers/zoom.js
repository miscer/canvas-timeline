const initialState = {
  ratio: 1,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ZOOM':
      return {
        ...state,
        ratio: action.ratio,
      };
    default:
      return state;
  }
};
