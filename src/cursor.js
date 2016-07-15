import { setPosition } from './actions/cursor';
import {
  cursorSelector,
  hoverTaskSelector
} from './selectors/cursor';

export default (store) => {
  const state = store.getState();
  const {element} = state.canvas;

  element.addEventListener('mousemove', event => {
    store.dispatch(
      setPosition(event.clientX, event.clientY)
    );
  });

  element.addEventListener('click', event => {
    const state = store.getState();
    const task = hoverTaskSelector(state);
    alert(`Clicked on task "${task.name}"`);
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
