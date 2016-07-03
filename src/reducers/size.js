const initialState = {
  width: 300,
  height: 200,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SIZE':
      return {
        width: action.width,
        height: action.height
      };

    default:
      return state;
  }
};
