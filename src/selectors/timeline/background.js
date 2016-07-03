import { createSelector } from 'reselect';

const LOGO_HEIGHT = 80;
const LOGO_WIDTH = 65;

export const sizeSelector = createSelector(
  state => state.size,
  size => ({
    height: size.height - LOGO_HEIGHT,
    width: size.width - LOGO_WIDTH
  })
);

export const positionSelector = () => ({
  left: LOGO_WIDTH,
  top: LOGO_HEIGHT
});
