import { scroll } from './actions/scroll';
import { zoom } from './actions/zoom';
import { minY, maxY } from './selectors/scroll';

const clamp = (value, min, max) =>
  Math.max(min, Math.min(max, value));

export default (store) => {
  const {element} = store.getState().canvas;

  element.addEventListener('wheel', event => {
    event.preventDefault();

    const state = store.getState();

    if (!event.ctrlKey) {
      const {x, y} = state.scroll;

      store.dispatch(
        scroll(
          x + event.deltaX,
          clamp(y + event.deltaY, minY(state), maxY(state))
        )
      );
    } else {
      const {ratio} = state.zoom;
      const delta = event.deltaY / -100;

      store.dispatch(zoom(clamp(ratio + delta, 0.333, 3)));
    }
  });
};
