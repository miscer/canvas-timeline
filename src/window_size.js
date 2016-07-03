import { setSize } from './actions/size';

export default (store) => {
  const update = () => {
    const [width, height] = [window.innerWidth, window.innerHeight];
    store.dispatch(setSize(width, height));
  };

  window.addEventListener('resize', () => update());
  update();
};
