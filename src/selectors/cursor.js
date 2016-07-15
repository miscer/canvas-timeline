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

export const hoverTask = createSelector(
  positionSelector,
  visibleTasksSelector,
  ({x, y}, tasks) => {
    for (const task of tasks) {
      if (x >= task.x &&
          x < task.x + task.width &&
          y >= task.y &&
          y < task.y + task.height) {
        return task;
      }
    }

    return null;
  }
);

export const cursorSelector = createSelector(
  hoverTask,
  (task) => {
    if (task) {
      return 'pointer';
    } else {
      return 'default';
    }
  }
);
