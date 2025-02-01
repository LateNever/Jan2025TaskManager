'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { TaskType } from '@/types/task';
import Task from '@/components/Task';

function TaskBoard() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  return (
    <div className="flex flex-col gap-y-6">
      {tasks.map((task) => {
        return (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            workTime={task.workTime}
            active={task.active}
          />
        );
      })}
    </div>
  );
}

export default TaskBoard;
