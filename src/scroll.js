import { scroll } from './actions/scroll';
import { minY, maxY } from './selectors/scroll';

const clamp = (value, min, max) =>
  Math.max(min, Math.min(max, value));

export default (store) => {
  const {element} = store.getState().canvas;

  element.addEventListener('wheel', event => {
    event.preventDefault();

    const state = store.getState();
    const {x, y} = state.scroll;

    store.dispatch(
      scroll(
        x + event.deltaX,
        clamp(y + event.deltaY, minY(state), maxY(state))
      )
    );
  });
};
