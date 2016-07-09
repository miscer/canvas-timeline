import { context as contextSelector } from '../selectors/canvas';
import {
  positionSelector,
  visibleTasksSelector
} from '../selectors/timeline/tasks';
import { getColorFromId } from '../utils/color_map';

const TASK_HEIGHT = 43;

export const render = (state) => {
  const ctx = contextSelector(state);
  const {left, top} = positionSelector(state);
  const tasks = visibleTasksSelector(state);
  const scroll = state.scroll;

  ctx.save();
  ctx.textBaseline = 'top';

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

  ctx.fillStyle = getColorFromId(task.color_id);
  ctx.fillRect(x, y, width - 2, TASK_HEIGHT);

  ctx.fillStyle = '#000';
  ctx.font = 'bold 14px Avenir';

  ctx.fillText(task.name, x + 5, y + 5);

  if (task.project != null) {
    ctx.fillStyle = 'rgba(34, 34, 34, 0.5)';
    ctx.font = '14px Avenir';

    ctx.fillText(task.project.name, x + 5, y + 22);
  }

  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(x, y + 41, width - 2, 2);
};
