import tasks from 'json!./tasks.json';
import users from 'json!./users.json';
import { calculate } from '../layout/grid_tasks';

export const timeline = users.map(user => {
  const userTasks = tasks.filter(task => task.user_id == user.id);
  const userRows = calculate(userTasks);

  return {
    user: user,
    tasks: userTasks,
    rows: userRows
  };
});

export const timeframe = {
  
}
