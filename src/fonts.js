import { fontsLoaded } from './actions/fonts';

export default (store) => {
  document.fonts.load('1em Avenir').then(() => {
    store.dispatch(fontsLoaded());
  });
};
