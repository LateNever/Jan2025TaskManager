'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { motion, AnimatePresence } from 'framer-motion';

import { addTask } from '@/store/taskSlice';

import Button from '@/UI/Button';

const Form = () => {
  const [title, setTitle] = useState<string>('ЗАдача тест');
  const [description, setDescription] = useState<string>('Это ткстовая задача');
  const [workTime, setWorkTime] = useState<string>('11:11');
  const [workTimeSec, setWorkTimeSec] = useState<number>(0);
  const [planTime, setPlanTime] = useState<number>(0);

  const dispatch = useDispatch();

  const addTaskHandle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title.trim().length && workTime) {
      const id: string = new Date().toISOString();
      console.log(id);

      dispatch(addTask({ id, title, description, workTimeSec, planTime }));

      setTitle('ЗАдача тест');
      setDescription('Это ткстовая задача');
      setWorkTime('11:11');
    }
  };

  return (
    <motion.form
      onSubmit={addTaskHandle}
      className="flex flex-col sm:min-w-100 md:min-w-128 xl:min-w-min gap-y-6 p-6 rounded-3xl bg-blue-100 shadow-md"
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
    >
      <input
        className="p-3 rounded-xl bg-blue-200 focus:bg-blue-300"
        value={title}
        onChange={(e) => {
          if (e.target.value.length <= 500) {
            setTitle(e.target.value);
          }
        }}
        type="text"
        id="taskTitle"
        name="title"
        placeholder="Название задачи"
      />
      <div className="flex gap-x-3 ">
        <span className="w-full p-3 rounded-xl bg-blue-300 focus:bg-blue-300">
          Время выполнения
        </span>
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
      </div>
      <textarea
        className="p-3 rounded-xl bg-blue-200 focus:bg-blue-300"
        value={description}
        onChange={(e) => {
          if (e.target.value.length <= 500) {
            setDescription(e.target.value);
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
          }
        }}
        id="taskDescription"
        name="description"
        placeholder="Введите описание задачи"
      ></textarea>
      <button /* Использование компонента Button почему-то ломает tailwind*/
        className="p-3 rounded-xl bg-blue-200 transition ease-in-out hover:bg-blue-300 active:bg-blue-400"
        type="submit"
      >
        Создать задачу
      </button>
    </motion.form>
  );
};

export default Form;
