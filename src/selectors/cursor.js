import { createSelector } from 'reselect';
import {
  visibleTasksSelector,
  positionSelector as tasksPositionSelector
} from './timeline/tasks';

const positionSelector = createSelector(
  state => state.cursor,
  state => state.scroll,
  tasksPositionSelector,
  (cursor, scroll, tasks) => ({
    x: cursor.x + scroll.x - tasks.left,
    y: cursor.y + scroll.y - tasks.top,
  })
);

export const hoverTaskSelector = createSelector(
  positionSelector,
  visibleTasksSelector,
  ({x, y}, tasks) => {
    for (const item of tasks) {
      if (x >= item.x &&
          x < item.x + item.width &&
          y >= item.y &&
          y < item.y + item.height) {
        return item.task;
      }
    }

    return null;
  }
);

export const cursorSelector = createSelector(
  hoverTaskSelector,
  (task) => {
    if (task) {
      return 'pointer';
    } else {
      return 'default';
    }
  }
);
