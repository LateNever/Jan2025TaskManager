'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';

import { motion, AnimatePresence } from 'framer-motion';

import Task from '@/components/Task';

interface TaskBoardProps {
  sortBy: 'new' | 'inProcess' | 'completed';
  title: string;
}

function TaskBoard({ sortBy, title }: TaskBoardProps) {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const sortedTasks = tasks.filter((task) => {
    if (sortBy === task.status) return true;
  });

  return (
    <motion.div
      className="flex flex-col w-full max-h-min p-6 gap-y-6 rounded-3xl bg-gray-200"
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.6 }}
    >
      <h2 className="text-center text-2xl font-bold">{title}</h2>
      <div className="flex flex-col md:flex-row xl:flex-col md:justify-between lg:justify-start lg:gap-x-7 flex-wrap gap-y-6">
        <AnimatePresence>
          {sortedTasks.map((task) => {
            return (
              <motion.div
                key={task.id}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Task
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
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default TaskBoard;
