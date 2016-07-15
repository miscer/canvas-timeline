const defaultState = {
  x: 0,
  y: 0
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_CURSOR_POSITION':
      return {
        x: action.x,
        y: action.y
      };
    default:
      return state;
  }
};
