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

const setCanvasTextProps = (context, font, color) => {
  context.textBaseline = 'top';
  context.font = font;
  context.fillStyle = color;
};

const setCanvasTextPropsForTitle = (context) => {
  setCanvasTextProps(context, TITLE_FONT, TITLE_COLOR);
};

const setCanvasTextPropsForProject = (context) => {
  setCanvasTextProps(context, PROJECT_FONT, PROJECT_COLOR);
};

const measureTaskTextWidth = (context, taskTitle, projectName) => {
  setCanvasTextPropsForTitle(context);
  const taskTitleWidth = !isEmpty(taskTitle) ?
    context.measureText(taskTitle).width : 0;

  setCanvasTextPropsForProject(context);
  const projectNameWidth = !isEmpty(projectName) ?
    context.measureText(projectName).width : 0;

  return Math.max(taskTitleWidth, projectNameWidth);
};


const fillTaskTitle = (context, taskTitle) => {
  if (!isEmpty(taskTitle)) {
    setCanvasTextPropsForTitle(context);
    context.fillText(taskTitle, 0, 0);
  }
};

const fillProjectName = (context, projectName) => {
  if (!isEmpty(projectName)) {
    setCanvasTextPropsForProject(context);
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
  const textWidth = measureTaskTextWidth(context, taskTitle, projectName);

  fillTaskTitle(context, taskTitle);
  fillProjectName(context, projectName);

  if (textWidth > maxWidth) {
    cropOverflowingText(context, maxWidth);
  }

  return {
    taskText: canvas,
    textWidth: Math.min(textWidth, maxWidth)
  };
};

export const render = (canvas, context, x, y) => {
  context.drawImage(
    canvas,
    x, y,
    canvas.width / PIXEL_RATIO,
    canvas.height / PIXEL_RATIO
  );
};
