import moment from 'moment';
import { getHeaderLeft } from '../layout/timeline';
import { getColumnWidth } from '../layout/grid';

const HEADER_HEIGHT = 80;

export const render = (env) => {
  const {ctx, size} = env;
  const width = size.width - getHeaderLeft();

  ctx.fillStyle = '#f8f8f8';
  ctx.fillRect(getHeaderLeft(), 0, width, HEADER_HEIGHT);

  renderContent(env);
};

const renderContent = (env) => {
  const {ctx, scroll, size, timeframe} = env;

  const dayOffset = Math.floor(scroll.x / getColumnWidth());
  const pxOffset = scroll.x % getColumnWidth();

  let date = moment(timeframe.date).add(dayOffset, 'days');
  let x = getHeaderLeft() - pxOffset - getColumnWidth();

  while (x < size.width) {
    renderDay(env, date, x, 0);

    date.add(1, 'day');
    x += getColumnWidth();
  }
};

const renderDay = ({ctx}, date, x, y) => {
  ctx.save();

  ctx.fillStyle = '#000';
  ctx.font = '12px sans-serif';
  ctx.textAlign = 'center';

  ctx.fillText(
    date.format('dd'),
    x + getColumnWidth() / 2,
    y + 50
  );

  ctx.fillText(
    date.format('D'),
    x + getColumnWidth() / 2,
    y + 65
  );

  ctx.restore();
};
