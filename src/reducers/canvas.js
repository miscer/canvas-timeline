export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_CANVAS':
      return {
        ...state,
        element: action.element
      };

    default:
      return state;
  }
};
