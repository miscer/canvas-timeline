import { createSelector } from 'reselect';

export const gridSelector = createSelector(
  state => state.tasks,
  state => state.users,
  (tasks, users) =>
    users
      .map(user => ({
        user: user,
        tasks: tasks.filter(task => task.user_id === user.id)
      }))
      .map(section => ({
        ...section,
        rows: createRows(section.tasks),
      }))
);

export const createRows = (tasks) => {
  const rows = [];

  for (const task of tasks) {
    insertTask(rows, task);
  }

  return rows;
};

const insertTask = (rows, task) => {
  for (const row of rows) {
    if (isRowFree(row, task)) {
      row.push(task);
      return;
    }
  }

  rows.push([task]);
};

const isRowFree = (row, t1) => {
  for (const t2 of row) {
    if (hasOverlap(t1, t2)) return false;
  }

  return true;
}

const hasOverlap = (t1, t2) => (
  (t1.start_date > t2.end_date) ||
  (t1.end_date < t2.start_date)
);
