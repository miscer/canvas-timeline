import autoscale from 'autoscale-canvas';
import { setCanvas } from './actions/canvas';

export default (store) => {
  const element = document.querySelector('canvas');
  store.dispatch(setCanvas(element));

  const updateSize = () => {
    const {width, height} = store.getState().size;
    const {element} = store.getState().canvas;
    element.width = width;
    element.height = height;
    autoscale(element);
  };

  store.subscribe(updateSize);
  updateSize();
};
