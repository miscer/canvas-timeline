const initialState = {
  x: 0,
  y: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SCROLL':
      return {
        ...state,
        x: action.x,
        y: action.y
      };

    default:
      return state;
  }
};
