'use client';

import { useState } from 'react';
import { useDispatch, UseDispatch } from 'react-redux';

import { addTask } from '@/store/taskSlice';

function Form() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [workTime, setWorkTime] = useState<string>('');

  const dispatch = useDispatch();

  const addTaskHandle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title.trim().length && workTime.trim().length) {
      const id: string = new Date().toISOString();

      dispatch(addTask({ id, title, description, workTime }));

      setTitle('');
      setDescription('');
      setWorkTime('');
    }
  };

  return (
    <div>
      <form
        onSubmit={addTaskHandle}
        className="flex flex-col mr-4 gap-y-6 p-6 rounded-3xl bg-blue-100 shadow-md"
        action="#"
      >
        <input
          className="p-3 rounded-xl bg-blue-200 focus:bg-blue-300"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          id="taskTitle"
          name="title"
          placeholder="Название задачи"
        />
        <input
          className="p-3 pl-6 rounded-xl text-center bg-blue-200 focus:bg-blue-300"
          value={workTime}
          // value="10:20:20"
          onChange={(e) => setWorkTime(e.target.value)}
          type="time"
          step="1"
          id="taskTime"
          name="workTime"
        />
        <textarea
          className="p-3 rounded-xl bg-blue-200 focus:bg-blue-300"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id="taskDescription"
          name="description"
          placeholder="Введите описание задачи"
        ></textarea>
        <button
          className="p-3 rounded-xl bg-blue-200 transition ease-in-out hover:bg-blue-300 active:bg-blue-400"
          type="submit"
        >
          Добавить
        </button>
      </form>
    </div>
  );
}

export default Form;
