import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  activateTask,
  deleteTask,
  completeTask,
  compactTask,
} from '@/store/taskSlice';
import { updateWorkTime } from '@/store/taskSlice';

import Button from '@/UI/Button';
import EditForm from '@/components/EditForm';

interface TaskProps {
  id: string;
  title: string;
  description: string;
  workTimeSec: number;
  active: boolean;
  status: 'new' | 'inProcess' | 'completed';
  // completed: boolean;
  planTime: number;
  isVisible: boolean;
  isCompact: boolean;
}

const Task: React.FC<TaskProps> = ({
  id,
  title,
  description,
  workTimeSec,
  active,
  status,
  planTime,
  isVisible,
  isCompact,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!active) return;
    const timer = setInterval(() => {
      dispatch(updateWorkTime({ id }));
    }, 1000);
    return () => clearInterval(timer);
  }, [active, dispatch, id]);

  const [modal, setModal] = useState<boolean>(false);

  const colors: string =
    active && workTimeSec < 0
      ? 'bg-orange-100'
      : active
      ? 'bg-emerald-200'
      : status === 'completed'
      ? 'bg-indigo-100'
      : workTimeSec < 0
      ? 'bg-red-100'
      : 'bg-emerald-100';

  const pseudoOpacity: string = isCompact
    ? `hover:opacity-75 active:opacity-55 cursor-pointer`
    : '';

  const workTime: string =
    workTimeSec > 0
      ? `${Math.floor(workTimeSec / 3600)
          .toString()
          .padStart(2, '0')}:${Math.ceil((workTimeSec % 3600) / 60)
          .toString()
          .padStart(2, '0')}`
      : `${-Math.ceil(workTimeSec / 3600)
          .toString()
          .padStart(2, '0')}:${-Math.ceil((workTimeSec % 3600) / 60)
          .toString()
          .padStart(2, '0')}`;

  const planTimeTask: string = `${Math.floor(planTime / 3600)
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

  const onCompact = () => {
    dispatch(compactTask({ id, isCompact: true }));
  };

  const offCompact = () => {
    if (isCompact) {
      dispatch(compactTask({ id, isCompact: false }));
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`relative flex flex-col gap-y-4 p-6 rounded-3xl ${colors} ${pseudoOpacity} shadow-md transition ease-in-out`}
      onClick={offCompact}
    >
      <h3 className="text-center text-lg font-bold ">{title}</h3>

      {!isCompact && (
        <div className="flex flex-col gap-y-4">
          <span className="text-center">{workTimeSec}</span>{' '}
          {/* Время в секундах для понимания что задача активна*/}
          {!!description.trim().length && (
            <p className="p-3 rounded-lg bg-sky-200">{description}</p>
          )}
          <div className="flex gap-x-4 ">
            <span className="w-2/4 p-3 rounded-lg text-center bg-sky-200">
              {`Плановое время ${planTimeTask}`}
            </span>
            <span className="w-2/4 p-3 rounded-lg text-center bg-sky-200">
              {workTimeSec > 0
                ? `Осталось времени ${workTime}`
                : `Время просрочки ${workTime}`}
            </span>
          </div>
          <Button name="Свернуть" type="button" onClick={onCompact} />
          {status !== 'completed' && (
            <Button
              name={active ? 'Пауза' : 'Начать выполнение'}
              type="button"
              onClick={activateTaskHandle}
            />
          )}
          <Button
            name={
              status === 'completed'
                ? 'Вернуть в работу'
                : 'Завершить выполнение'
            }
            type="button"
            onClick={completeTaskHandle}
          />
          {status !== 'completed' && (
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
            formWorkTimeSec={workTimeSec}
            forEditClose={toggleModal}
          />
        </div>
      )}
    </div>
  );
};

export default Task;
