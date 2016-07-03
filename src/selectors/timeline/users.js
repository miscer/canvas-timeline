import { createSelector } from 'reselect';

const USERS_WIDTH = 65;
const LOGO_HEIGHT = 80;

export const sizeSelector = createSelector(
  state => state.size,
  size => ({
    height: size.height - LOGO_HEIGHT,
    width: USERS_WIDTH
  })
);

export const positionSelector = () => ({
  left: 0,
  top: LOGO_HEIGHT
});
