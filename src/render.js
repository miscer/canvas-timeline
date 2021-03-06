import { context } from './selectors/canvas';
import { render as renderUsers } from './objects/users';
import { render as renderHeader } from './objects/header';
import { render as renderBackground } from './objects/background';
import { render as renderTasks } from './objects/tasks';

export default (store) => {
  const render = () => {
    const state = store.getState();
    const ctx = context(state);

    const {width, height} = state.size;
    ctx.clearRect(0, 0, width, height);

    renderBackground(state);
    renderTasks(state);
    renderUsers(state);
    renderHeader(state);
  }

  store.subscribe(() => render());
  render();
}
