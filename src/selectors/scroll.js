import { createSelector } from 'reselect';
import { timelineHeight } from './timeline/sections';
import { sizeSelector as backgroundSize } from './timeline/background';

const BOTTOM_PADDING = 100;

export const minY = () => 0;

export const maxY = createSelector(
  timelineHeight,
  backgroundSize,
  (timeline, {height: background}) =>
    Math.max(0, timeline - background + BOTTOM_PADDING)
);
