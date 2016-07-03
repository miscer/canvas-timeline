import { scroll} from './actions/scroll';

export default (store) => {
  const {element} = store.getState().canvas;
  
  element.addEventListener('wheel', event => {
    event.preventDefault();
    store.dispatch(scroll(event.deltaX, event.deltaY));
  });
};
