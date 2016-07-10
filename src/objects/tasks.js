import { context as contextSelector } from '../selectors/canvas';
import {
  positionSelector,
  visibleTasksSelector
} from '../selectors/timeline/tasks';
import { getColorFromId } from '../utils/color_map';

const TASK_HEIGHT = 43;
const PIXEL_RATIO = window.devicePixelRatio || 1;

const TEXT_CANVAS = document.createElement('canvas');
TEXT_CANVAS.width = 1000;
TEXT_CANVAS.height = 50;

const TEXT_CONTEXT = TEXT_CANVAS.getContext('2d');
TEXT_CONTEXT.scale(PIXEL_RATIO, PIXEL_RATIO);
TEXT_CONTEXT.textBaseline = 'top';

export const render = (state) => {
  const ctx = contextSelector(state);
  const {left, top} = positionSelector(state);
  const tasks = visibleTasksSelector(state);
  const scroll = state.scroll;

  ctx.save();

  for (const item of tasks) {
    renderTask(
      state,
      item.task,
      item.width,
      item.x + left - scroll.x,
      item.y + top - scroll.y
    );
  }

  ctx.restore();
};

const renderTask = (state, task, width, x, y) => {
  const ctx = contextSelector(state);
  const text = TEXT_CANVAS;

  ctx.fillStyle = getColorFromId(task.color_id);
  ctx.fillRect(x, y, width - 2, TASK_HEIGHT);

  prepareText(
    task.name,
    width - 12,
    '#000', 'bold 14px Avenir'
  );

  renderText(ctx, x + 5, y + 5);

  if (task.project != null) {
    prepareText(
      task.project.name,
      width - 12,
      'rgba(34, 34, 34, 0.5)',
      '14px Avenir'
    );

    renderText(ctx, x + 5, y + 22);
  }

  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(x, y + 41, width - 2, 2);
};

const prepareText = (text, maxWidth, color, font) => {
  const ctx = TEXT_CONTEXT;
  const {width, height} = TEXT_CANVAS;

  ctx.clearRect(0, 0, width, height);

  ctx.font = font;
  ctx.fillStyle = color;
  ctx.fillText(text, 0, 0);

  ctx.clearRect(maxWidth, 0, width - maxWidth, height);

  const gx = maxWidth - 10;
  const gradient = ctx.createLinearGradient(gx, 0, gx + 10, 0);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');

  ctx.fillStyle = gradient;
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillRect(gx, 0, 10, height);

  ctx.globalCompositeOperation = 'source-over';
};

const renderText = (ctx, x, y) => {
  const canvas = TEXT_CANVAS;

  ctx.drawImage(
    canvas,
    x, y,
    canvas.width / PIXEL_RATIO,
    canvas.height / PIXEL_RATIO
  );
};
