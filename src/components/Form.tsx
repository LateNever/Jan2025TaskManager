'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addTask } from '@/store/taskSlice';

import Button from '@/UI/Button';

const Form = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [workTime, setWorkTime] = useState<string>('');
  const [workTimeSec, setWorkTimeSec] = useState<number>(0);
  const [planTime, setPlanTime] = useState<number>(0);

  const dispatch = useDispatch();

  const addTaskHandle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title.trim().length && workTime) {
      const id: string = new Date().toISOString();

      dispatch(addTask({ id, title, description, workTimeSec, planTime }));

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
          onChange={(e) => {
            const inputWorkTime = e.target.value;
            const [hours, minutes] = inputWorkTime.split(':');
            const WorkTimeSec = Number(hours) * 3600 + Number(minutes) * 60;
            setWorkTimeSec(WorkTimeSec);
            setPlanTime(WorkTimeSec);
            setWorkTime(e.target.value);
          }}
          type="time"
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
        <Button name="Добавить" type="submit" />
      </form>
    </div>
  );
};

export default Form;
