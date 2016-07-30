import { scroll } from './actions/scroll';
import { minY, maxY } from './selectors/scroll';

const clamp = (value, min, max) =>
  Math.max(min, Math.min(max, value));

const getChangedTouch = (event) =>
  event.changedTouches[0]

export default (store) => {
  const {element} = store.getState().canvas;
  const lastTouchPosition = {x: null, y: null};

  const getDeltaX = touch => lastTouchPosition.x - touch.pageX;
  const getDeltaY = touch => lastTouchPosition.y - touch.pageY;

  const updateLastTouchPosition = touch => {
    lastTouchPosition.x = touch.pageX;
    lastTouchPosition.y = touch.pageY;
  };

  element.addEventListener('touchstart', event => {
    event.preventDefault();

    const touch = getChangedTouch(event);
    updateLastTouchPosition(touch);
  });

  element.addEventListener('touchmove', event => {
    event.preventDefault();

    const touch = getChangedTouch(event);
    const deltaX = getDeltaX(touch);
    const deltaY = getDeltaY(touch);
    updateLastTouchPosition(touch);

    const state = store.getState();
    const {x, y} = state.scroll;

    store.dispatch(
      scroll(
        x + deltaX,
        clamp(y + deltaY, minY(state), maxY(state))
      )
    );
  });
};
