export default (state = false, action) => {
  switch (action.type) {
    case 'FONTS_LOADED':
      return true;

    default:
      return state;
  }
};
