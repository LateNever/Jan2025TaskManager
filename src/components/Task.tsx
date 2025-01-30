'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { TaskType } from '@/types/task';

function Task() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  return (
    <div>
      {tasks.map((task) => {
        return (
          <div
            className="task-wrap bg-gray-500 p-2 m-2 rounded-md shadow-md"
            key={task.id}
          >
            <h3 className="title">{task.title}</h3>
            <p className="description">{task.description}</p>
            <span className="work-time">{task.workTime}</span>
          </div>
        );
      })}
    </div>
  );
}

export default Task;
