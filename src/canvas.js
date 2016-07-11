import autoscale from 'autoscale-canvas';
import { setCanvas } from './actions/canvas';

export default (store) => {
  const element = document.querySelector('canvas');
  store.dispatch(setCanvas(element));

  let size = null;

  const updateSize = () => {
    const state = store.getState();

    if (state.size !== size) {
      size = state.size;

      const {element} = state.canvas;
      element.width = size.width;
      element.height = size.height;
      autoscale(element);
    }
  };

  store.subscribe(updateSize);
  updateSize();
};
