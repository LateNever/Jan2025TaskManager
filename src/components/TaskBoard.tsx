'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
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
            workTimeSec={task.workTimeSec}
            active={task.active}
            completed={task.completed}
            planTime={task.planTime}
            isVisible={task.isVisible}
          />
        );
      })}
    </div>
  );
}

export default TaskBoard;
