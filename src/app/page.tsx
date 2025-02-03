// 'use client';

import TaskBoard from '@/components/TaskBoard';
import Form from '@/components/Form';
import Search from '@/components/Search';

export default function Home() {
  return (
    <div className="flex flex-col bg-gray-100 font-[family-name:var(--font-geist-sans)]">
      <h1 className="p-6 text-center text-3xl">Менеджер задач</h1>
      <Search />
      <div className="p-6 flex">
        <Form />
        <TaskBoard />
      </div>
    </div>
  );
}
