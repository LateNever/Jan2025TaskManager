'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { editTask } from '@/store/taskSlice';

import Button from '@/UI/Button';

interface TaskProps {
  formId: string;
  formTitle: string;
  formDescription: string;
  formWorkTime: string;
  formWorkTimeSec: number;
  forEditClose: () => void;
}

const EditForm: React.FC<TaskProps> = ({
  formId,
  formTitle,
  formDescription,
  formWorkTime,
  formWorkTimeSec,
  forEditClose,
}) => {
  const [title, setTitle] = useState<string>(formTitle);
  const [description, setDescription] = useState<string>(formDescription);
  const [workTime, setWorkTime] = useState<string>(formWorkTime);
  const [workTimeSec, setWorkTimeSec] = useState<number>(formWorkTimeSec);
  const [planTime, setPlanTime] = useState<number>(0);

  const dispatch = useDispatch();

  const editTaskHandle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title.trim().length && workTime) {
      dispatch(
        editTask({
          formId,
          title,
          description,
          workTime,
          workTimeSec,
          planTime,
        })
      );
      forEditClose();
    }
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <form
        onSubmit={editTaskHandle}
        className="flex flex-col gap-y-6 p-6 rounded-3xl bg-blue-100 shadow-md"
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
        <label className="flex gap-x-3">
          <span className="p-3 rounded-xl text-center bg-blue-300">
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
        </label>
        <textarea
          className="p-3 rounded-xl bg-blue-200 focus:bg-blue-300"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id="taskDescription"
          name="description"
          placeholder="Введите описание задачи"
        ></textarea>
        <Button name="Ок" type="submit" />
        <Button name="Отмена" type="button" onClick={forEditClose} />
      </form>
    </div>
  );
};

export default EditForm;
