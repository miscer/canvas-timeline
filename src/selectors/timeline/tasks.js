import moment from 'moment';
import { createSelector } from 'reselect';
import { gridSelector } from '../grid';

const LOGO_HEIGHT = 80;
const LOGO_WIDTH = 65;
const ROW_HEIGHT = 45;
const COLUMN_WIDTH = 45;
const SECTION_PADDING = 25;

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

export const allTasksSelector = createSelector(
  gridSelector,
  state => state.timeframe,
  (grid, timeframe) => {
    const date = moment.utc(timeframe.date);

    const tasks = [];
    let y = 0;

    for (const {rows} of grid) {
      for (const row of rows) {
        for (const task of row) {
          const start = moment.utc(task.start_date);
          const end = moment.utc(task.end_date);

          const offset = start.diff(date, 'days');
          const width = end.diff(start, 'days') + 1;

          tasks.push({
            task, y,
            x: offset * COLUMN_WIDTH,
            width: width * COLUMN_WIDTH,
            height: ROW_HEIGHT,
          });
        }

        y += ROW_HEIGHT;
      }

      if (rows.length == 0) {
        y += ROW_HEIGHT;
      }

      y += SECTION_PADDING;
    }

    return tasks;
  }
)

const viewportSelector = createSelector(
  sizeSelector,
  state => state.scroll,
  (size, scroll) => ({
    x1: scroll.x,
    x2: scroll.x + size.width,
    y1: scroll.y,
    y2: scroll.y + size.height
  })
);

export const visibleTasksSelector = createSelector(
  allTasksSelector,
  viewportSelector,
  (tasks, viewport) => tasks.filter(item => !(
    item.x > viewport.x2 ||
    (item.x + item.width) < viewport.x1 ||
    item.y > viewport.y2 ||
    (item.y + item.height) < viewport.y1
  ))
);
