import { setPosition } from './actions/cursor';
import { cursorSelector } from './selectors/cursor';

export default (store) => {
  const state = store.getState();
  const {element} = state.canvas;

  element.addEventListener('mousemove', event => {
    store.dispatch(
      setPosition(event.clientX, event.clientY)
    );
  });

  let cursor = cursorSelector(state);

  const updateCursor = () => {
    const state = store.getState();
    const current = cursorSelector(state);

    if (cursor != current) {
      cursor = current;
      element.style.cursor = cursor;
    }
  };

  store.subscribe(updateCursor);
};
