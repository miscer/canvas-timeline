const initialState = {
  x: 0,
  y: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SCROLL':
      return {
        ...state,
        x: state.x + action.dx,
        y: state.y + action.dy
      };

    default:
      return state;
  }
};
