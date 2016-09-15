import { fontsLoaded } from './actions/fonts';

export default (store) => {
  document.fonts.load('bold italic 1em Avenir').then(() => {
    store.dispatch(fontsLoaded());
  });
};
