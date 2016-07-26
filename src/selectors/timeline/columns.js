import instadate from 'instadate';
import { createSelector } from 'reselect';

const COLUMN_WIDTH = 45;

export const visibleColumnsSelector = createSelector(
  state => state.timeframe,
  state => state.scroll,
  state => state.size,
  (timeframe, scroll, size) => {
    const scrollOffset = Math.floor(scroll.x / COLUMN_WIDTH);
    const numColumns = Math.ceil(size.width / COLUMN_WIDTH);
    const columns = [];

    const pivotDate = new Date(timeframe.date);
    const todayDate = new Date();

    for (let i = 0; i < numColumns; i++) {
      const columnOffset = scrollOffset + i;
      const date = instadate.addDays(pivotDate, columnOffset);

      columns.push({
        date: date,
        width: COLUMN_WIDTH,
        offset: columnOffset * COLUMN_WIDTH,
        weekend: instadate.isWeekendDate(date),
        today: instadate.isSameDay(date, todayDate),
      });
    }

    return columns;
  }
)
