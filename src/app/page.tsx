'use client';

import { motion } from 'framer-motion';

import TaskBoard from '@/components/TaskBoard';
import Form from '@/components/Form';
import Search from '@/components/Search';

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen h-full p-6 gap-y-6 font-[family-name:var(--font-geist-sans)]">
      <motion.h1
        className="md:min-w-128 p-6 text-center rounded-3xl text-3xl font-bold bg-blue-200 text-sky-700 shadow-md"
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Менеджер задач
      </motion.h1>
      <Search />
      <div className=" flex flex-col items-center xl:grid xl:grid-cols-4 xl:items-start gap-6 w-full">
        <Form />
        <TaskBoard sortBy={'new'} title={'Новые задачи'} />
        <TaskBoard sortBy={'inProcess'} title={'Задачи в работе'} />
        <TaskBoard sortBy={'completed'} title={'Завершенные задачи'} />
      </div>
    </div>
  );
}
