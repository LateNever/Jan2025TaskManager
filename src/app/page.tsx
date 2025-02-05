// 'use client';

import TaskBoard from '@/components/TaskBoard';
import Form from '@/components/Form';
import Search from '@/components/Search';

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen h-full p-6 gap-y-6 font-[family-name:var(--font-geist-sans)] bg-gray-100 ">
      <h1 className="min-w-128 p-6 text-center rounded-3xl text-3xl font-bold bg-blue-200 shadow-md">
        Менеджер задач
      </h1>
      <Search />
      <div className="grid grid-cols-4 gap-x-6 w-full">
        <Form />
        <TaskBoard />
        {/* <TaskBoard /> */}
        {/* <TaskBoard /> */}
      </div>
    </div>
  );
}
