import moment from 'moment';
import { createSelector } from 'reselect';

const COLUMN_WIDTH = 45;

export const visibleColumnsSelector = createSelector(
  state => state.timeframe,
  state => state.scroll,
  state => state.size,
  (timeframe, scroll, size) => {
    const dayOffset = Math.floor(scroll.x / COLUMN_WIDTH);
    const numColumns = Math.ceil(size.width / COLUMN_WIDTH);
    const columns = [];

    for (let i = 0; i < numColumns; i++) {
      columns.push({
        date: moment(timeframe.date).add(dayOffset + i, 'days'),
        offset: (dayOffset + i) * COLUMN_WIDTH
      });
    }

    return columns;
  }
)
