import moment from 'moment';
import { createSelector } from 'reselect';

const COLUMN_WIDTH = 45;

export const visibleColumnsSelector = createSelector(
  state => state.timeframe,
  state => state.scroll,
  state => state.size,
  (timeframe, scroll, size) => {
    const scrollOffset = Math.floor(scroll.x / COLUMN_WIDTH);
    const numColumns = Math.ceil(size.width / COLUMN_WIDTH);
    const today = moment.utc();
    const columns = [];

    for (let i = 0; i < numColumns; i++) {
      const columnOffset = scrollOffset + i;
      const date = moment.utc(timeframe.date).add(columnOffset, 'days');
      const weekday = date.isoWeekday();

      columns.push({
        date: date,
        width: COLUMN_WIDTH,
        offset: columnOffset * COLUMN_WIDTH,
        weekend: weekday == 6 || weekday == 7,
        today: date.isSame(today, 'day'),
      });
    }

    return columns;
  }
)
