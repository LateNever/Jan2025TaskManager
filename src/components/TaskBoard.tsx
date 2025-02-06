'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Task from '@/components/Task';

interface TaskBoardProps {
  sortBy: 'new' | 'inProcess' | 'completed';
}

function TaskBoard({ sortBy }: TaskBoardProps) {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const sortedTasks = tasks.filter((task) => {
    if (sortBy === task.status) return true;
  });

  return (
    <div className="flex flex-col p-6 gap-y-6 rounded-3xl bg-gray-200">
      {sortedTasks.map((task) => {
        return (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            workTimeSec={task.workTimeSec}
            active={task.active}
            status={task.status}
            planTime={task.planTime}
            isVisible={task.isVisible}
            isCompact={task.isCompact}
          />
        );
      })}
    </div>
  );
}

export default TaskBoard;
