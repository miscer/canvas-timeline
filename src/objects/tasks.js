import clamp from 'lodash/clamp';
import { context as contextSelector } from '../selectors/canvas';
import {
  positionSelector,
  visibleTasksSelector
} from '../selectors/timeline/tasks';
import { getColorFromId } from '../utils/color_map';
import {
  efficientPrepare as prepareTaskText,
  render as renderTaskText
} from './task_title';

const TASK_HEIGHT = 43;

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
  const {left} = positionSelector(state);
  const fontsLoaded = state.fonts;

  ctx.fillStyle = getColorFromId(task.color_id);
  ctx.fillRect(x, y, width - 2, TASK_HEIGHT);

  const maxTextWidth = width - 12;
  const {taskText, textWidth} = prepareTaskText(
    task.name,
    task.project && task.project.name,
    maxTextWidth,
    fontsLoaded
  );

  const textX = clamp(
    left + 5,
    x + 5,
    x + width - textWidth - 12
  );

  renderTaskText(taskText, ctx, textX, y + 5);

  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(x, y + 41, width - 2, 2);
};
