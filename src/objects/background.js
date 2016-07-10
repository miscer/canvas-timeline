import { context as contextSelector } from '../selectors/canvas';
import { visibleColumnsSelector } from '../selectors/timeline/columns';
import { visibleSectionsSelector } from '../selectors/timeline/sections';
import { sizeSelector, positionSelector } from '../selectors/timeline/background';

export const render = (state) => {
  const ctx = contextSelector(state);
  const {width, height} = sizeSelector(state);
  const {left, top} = positionSelector(state);
  const sections = visibleSectionsSelector(state);
  const columns = visibleColumnsSelector(state);
  const scroll = state.scroll;

  ctx.save();
  ctx.strokeStyle = '#ccc';
  ctx.lineWidth = 0.5;

  for (const column of columns) {
    const x = column.offset + left - scroll.x;
    const y1 = top;
    const y2 = top + height;

    if (column.today) {
      ctx.fillStyle = 'rgba(0, 196, 255, 0.1)';
      ctx.fillRect(x, y1, column.width, height);
    } else if (column.weekend) {
      ctx.fillStyle = '#f5f5f5';
      ctx.fillRect(x, y1, column.width, height);
    }

    ctx.beginPath();
    ctx.moveTo(x + 0.25, y1);
    ctx.lineTo(x + 0.25, y2);
    ctx.stroke();
  }

  for (const section of sections) {
    const x1 = left;
    const x2 = left + width;
    const y = section.offset + section.height - scroll.y + top;

    ctx.beginPath();
    ctx.moveTo(x1, y + 0.25);
    ctx.lineTo(x2, y + 0.25);
    ctx.stroke();
  }

  ctx.restore();
}
