import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { activateTask, deleteTask, completeTask } from '@/store/taskSlice';
import { updateWorkTime } from '@/store/taskSlice';

import Button from '@/UI/Button';
import EditForm from '@/components/EditForm';

interface TaskProps {
  id: string;
  title: string;
  description: string;
  workTimeSec: number;
  active: boolean;
  completed: boolean;
  planTime: number;
  isVisible: boolean;
}

const Task: React.FC<TaskProps> = ({
  id,
  title,
  description,
  workTimeSec,
  active,
  completed,
  planTime,
  isVisible,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!active) return;
    const timer = setInterval(() => {
      dispatch(updateWorkTime({ id }));
    }, 1000);
    return () => clearInterval(timer);
  });

  const [modal, setModal] = useState<boolean>(false);
  const [isCompact, setIsCompact] = useState<boolean>(true);

  const color: string =
    active && workTimeSec < 0
      ? 'bg-orange-100'
      : active
      ? 'bg-amber-100'
      : completed
      ? 'bg-indigo-100'
      : workTimeSec < 0
      ? 'bg-red-100'
      : 'bg-emerald-100';

  const workTime: string =
    workTimeSec > 0
      ? `Оставшееся время ${Math.floor(workTimeSec / 3600)
          .toString()
          .padStart(2, '0')}:${Math.ceil((workTimeSec % 3600) / 60)
          .toString()
          .padStart(2, '0')}`
      : `Просрочена на ${-Math.ceil(workTimeSec / 3600)
          .toString()
          .padStart(2, '0')}:${-Math.ceil((workTimeSec % 3600) / 60)
          .toString()
          .padStart(2, '0')}`;

  const planTimeTask: string = `Плановое время выполнения ${Math.floor(
    planTime / 3600
  )
    .toString()
    .padStart(2, '0')}:${Math.ceil((planTime % 3600) / 60)
    .toString()
    .padStart(2, '0')}`;

  const activateTaskHandle = () => {
    dispatch(activateTask({ id }));
  };

  const completeTaskHandle = () => {
    dispatch(completeTask({ id }));
  };

  const deleteTaskHandle = () => {
    dispatch(deleteTask({ id }));
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleCompact = () => {
    setIsCompact(!isCompact);
  };

  return (
    <>
      {isVisible && (
        <div
          className={`relative flex flex-col gap-y-4 p-6 rounded-3xl ${color} shadow-md`}
          key={id}
        >
          <button
            className="absolute top-6 right-6 w-9 h-7 rounded-lg bg-indigo-200"
            type="button"
            onClick={toggleCompact}
          >
            +
          </button>
          <h3 className="text-center text-lg font-bold ">{title}</h3>
          {!isCompact && (
            <div className="flex flex-col gap-y-4">
              <span className="text-center">{planTimeTask}</span>
              <span className="text-center">{workTimeSec}</span>
              <span className="text-center">{workTime}</span>
              <p>{description}</p>
              {!completed && (
                <Button
                  name={active ? 'Пауза' : 'Начать выполнение'}
                  type="button"
                  onClick={activateTaskHandle}
                />
              )}
              {
                <Button
                  name={completed ? 'Вернуть в работу' : 'Завершить выполнение'}
                  type="button"
                  onClick={completeTaskHandle}
                />
              }
              {!completed && (
                <Button
                  name="Редактировать задачу"
                  type="button"
                  onClick={toggleModal}
                />
              )}
              <Button
                name="Удалить задачу"
                type="button"
                onClick={deleteTaskHandle}
              />
            </div>
          )}

          {modal && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
              onClick={toggleModal}
            >
              <EditForm
                formId={id}
                formTitle={title}
                formDescription={description}
                formWorkTime={workTime}
                forEditClose={toggleModal}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Task;
