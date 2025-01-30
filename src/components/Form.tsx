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
      <form onSubmit={addTaskHandle} className="bg-blue-300" action="#">
        <input
          className="border-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          id="taskTitle"
          name="title"
          placeholder="Название задачи"
        />
        <textarea
          className="border-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id="taskDescription"
          name="description"
          placeholder="Введите описание задачи"
        ></textarea>
        <input
          className="border-2"
          value={workTime}
          onChange={(e) => setWorkTime(e.target.value)}
          type="time"
          id="taskTime"
          name="workTime"
        />
        <button className="border-2" type="submit">
          Добавить
        </button>
      </form>
    </div>
  );
}

export default Form;
