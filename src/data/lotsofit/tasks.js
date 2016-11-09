const tasks = [];
let taskId = 1;

for (let user = 1; user <= 200; user++) {
  for (let task = 0; task < 1000; task++) {
    const date = new Date(2016, 6, 3);
    date.setDate(date.getDate() + task);

    const dateStr = date.toISOString().slice(0, 10);

    tasks.push({
      id: taskId++,
      start_date: dateStr,
      end_date: dateStr,
      name: "Task",
      user_id: user,
      color_id: 14
    });
  }
}

export default tasks;
