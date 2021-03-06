import moment from 'moment';
import { context as contextSelector } from '../selectors/canvas';
import { visibleColumnsSelector } from '../selectors/timeline/columns';
import { positionSelector, sizeSelector } from '../selectors/timeline/header';

const HEADER_HEIGHT = 80;
const PIXEL_RATIO = window.devicePixelRatio;

export const render = (state) => {
  const ctx = contextSelector(state);
  const {width} = sizeSelector(state);
  const {left} = positionSelector(state);
  const columns = visibleColumnsSelector(state);
  const scroll = state.scroll;

  ctx.save();

  ctx.shadowBlur = 7 * PIXEL_RATIO;
  ctx.shadowColor = 'rgba(0,0,0,.12)';
  ctx.shadowOffsetY = 2 * PIXEL_RATIO;

  ctx.fillStyle = '#f8f8f8';
  ctx.fillRect(left, 0, width, HEADER_HEIGHT);

  ctx.restore();

  for (const column of columns) {
    const x = column.offset + left - scroll.x;
    renderDay(state, column, x, 0);
  }
};

const renderDay = (state, column, x, y) => {
  const ctx = contextSelector(state);
  const date = moment.utc(column.date);

  ctx.save();

  ctx.fillStyle = '#000';
  ctx.font = '12px Avenir';
  ctx.strokeStyle = '#ccc';
  ctx.lineWidth = 0.5;

  ctx.textAlign = 'center';

  ctx.fillText(
    date.format('dd'),
    x + column.width / 2,
    y + 50
  );

  ctx.fillText(
    date.format('D'),
    x + column.width / 2,
    y + 65
  );

  if (column.today) {
    ctx.fillStyle = 'rgba(0, 196, 255, 0.1)';
    ctx.fillRect(x, y, column.width, HEADER_HEIGHT);
  }

  if (date.isoWeekday() == 1) {
    ctx.beginPath();
    ctx.moveTo(x + 0.25, y);
    ctx.lineTo(x + 0.25, y + HEADER_HEIGHT);
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.fillStyle = '#a7a7a7';
    ctx.fillText(
      date.format('[W]W'),
      x + 10,
      y + 20
    );
  }

  ctx.restore();
};
