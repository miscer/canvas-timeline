import { createSelector } from 'reselect';

export const context = createSelector(
  state => state.canvas.element,
  element => element.getContext('2d')
);
