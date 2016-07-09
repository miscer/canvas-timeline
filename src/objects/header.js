import moment from 'moment';
import { context as contextSelector } from '../selectors/canvas';
import { visibleColumnsSelector } from '../selectors/timeline/columns';
import { positionSelector, sizeSelector } from '../selectors/timeline/header';

const HEADER_HEIGHT = 80;

export const render = (state) => {
  const ctx = contextSelector(state);
  const {width} = sizeSelector(state);
  const {left} = positionSelector(state);
  const columns = visibleColumnsSelector(state);
  const scroll = state.scroll;

  ctx.fillStyle = '#f8f8f8';
  ctx.fillRect(left, 0, width, HEADER_HEIGHT);

  for (const {date, offset} of columns) {
    const x = offset + left - scroll.x;
    renderDay(state, date, x, 0);
  }
};

const renderDay = (state, date, x, y) => {
  const ctx = contextSelector(state);

  ctx.save();

  ctx.fillStyle = '#000';
  ctx.font = '12px Avenir';
  ctx.textAlign = 'center';

  ctx.fillText(
    date.format('dd'),
    x + 22,
    y + 50
  );

  ctx.fillText(
    date.format('D'),
    x + 22,
    y + 65
  );

  ctx.restore();
};
