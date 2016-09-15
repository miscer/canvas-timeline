import instadate from 'instadate';
import { createSelector } from 'reselect';

const COLUMN_WIDTH = 45;

export const columnWidthSelector = createSelector(
  state => state.zoom.ratio,
  ratio => COLUMN_WIDTH * ratio
);

export const visibleColumnsSelector = createSelector(
  state => state.timeframe,
  state => state.scroll,
  state => state.size,
  columnWidthSelector,
  (timeframe, scroll, size, columnWidth) => {
    const scrollOffset = Math.floor(scroll.x / columnWidth);
    const numColumns = Math.ceil(size.width / columnWidth);
    const columns = [];

    const pivotDate = new Date(timeframe.date);
    const todayDate = new Date();

    for (let i = 0; i < numColumns; i++) {
      const columnOffset = scrollOffset + i;
      const date = instadate.addDays(pivotDate, columnOffset);

      columns.push({
        date: date,
        width: columnWidth,
        offset: columnOffset * columnWidth,
        weekend: instadate.isWeekendDate(date),
        today: instadate.isSameDay(date, todayDate),
      });
    }

    return columns;
  }
)
