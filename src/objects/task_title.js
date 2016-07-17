import isEmpty from 'lodash/isEmpty';

const TITLE_FONT = 'bold 14px Avenir';
const PROJECT_FONT = '14px Avenir';

const TITLE_COLOR = '#000';
const PROJECT_COLOR = 'rgba(34, 34, 34, 0.5)';

const GRADIENT_START_COLOR = 'rgba(0, 0, 0, 0)';
const GRADIENT_END_COLOR = 'rgba(0, 0, 0, 1)';

const TASK_HEIGHT = 40;
const LINE_HEIGHT = 17;
const GRADIENT_WIDTH = 10;

const PIXEL_RATIO = window.devicePixelRatio;

const createTextCanvas = (width) => {
  const element = document.createElement('canvas');

  element.width = width * PIXEL_RATIO;
  element.height = TASK_HEIGHT * PIXEL_RATIO;

  const context = element.getContext('2d');

  context.scale(PIXEL_RATIO, PIXEL_RATIO);

  return [element, context];
}

const setCanvasTextProps = (context) => {
  context.textBaseline = 'top';
};

const fillTaskTitle = (context, taskTitle) => {
  if (!isEmpty(taskTitle)) {
    context.font = TITLE_FONT;
    context.fillStyle = TITLE_COLOR;
    context.fillText(taskTitle, 0, 0);
  }
};

const fillProjectName = (context, projectName) => {
  if (!isEmpty(projectName)) {
    context.font = PROJECT_FONT;
    context.fillStyle = PROJECT_COLOR;
    context.fillText(projectName, 0, LINE_HEIGHT);
  }
};

const createOverflowGradient = (context, gradientX) => {
  const gradient = context.createLinearGradient(
    gradientX, 0, gradientX + GRADIENT_WIDTH, 0);

  gradient.addColorStop(0, GRADIENT_START_COLOR);
  gradient.addColorStop(1, GRADIENT_END_COLOR);

  return gradient;
}

const cropOverflowingText = (context, maxWidth) => {
  const gradientX = maxWidth - GRADIENT_WIDTH;
  const gradient = createOverflowGradient(context, gradientX);

  context.fillStyle = gradient;
  context.globalCompositeOperation = 'destination-out';
  context.fillRect(gradientX, 0, GRADIENT_WIDTH, TASK_HEIGHT);
};

export const prepare = (taskTitle, projectName, maxWidth) => {
  const [canvas, context] = createTextCanvas(maxWidth);

  setCanvasTextProps(context);
  fillTaskTitle(context, taskTitle);
  fillProjectName(context, projectName);
  cropOverflowingText(context, maxWidth);

  return canvas;
};

export const render = (canvas, context, x, y) => {
  context.drawImage(
    canvas,
    x, y,
    canvas.width / PIXEL_RATIO,
    canvas.height / PIXEL_RATIO
  );
};
