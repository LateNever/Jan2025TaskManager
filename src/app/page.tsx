// 'use client';

import TaskBoard from '@/components/TaskBoard';
import Form from '@/components/Form';

export default function Home() {
  return (
    <div className="flex flex-col bg-amber-500 font-[family-name:var(--font-geist-sans)]">
      <h1 className="py-8 text-center text-3xl">Менеджер задач</h1>
      <div className="px-6 flex">
        <Form />
        <TaskBoard />
      </div>
    </div>
  );
}
