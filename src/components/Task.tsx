import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AnimatePresence, motion } from 'framer-motion';

import {
  activateTask,
  deleteTask,
  completeTask,
  compactTask,
} from '@/store/taskSlice';
import { updateWorkTime } from '@/store/taskSlice';

import Button from '@/UI/Button';
import Timer from '@/UI/Timer';
import EditForm from '@/components/EditForm';
import { audio } from 'framer-motion/client';

interface TaskProps {
  id: string;
  title: string;
  description: string;
  workTimeSec: number;
  active: boolean;
  status: 'new' | 'inProcess' | 'completed';
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
    workTimeSec < 0 || workTimeSec > planTime ? 'bg-red-100' : 'bg-teal-100';

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
    dispatch(completeTask({ id, workTimeSec, planTime }));
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
      className={`relative flex flex-col gap-y-4 md:w-[calc(50%-1rem)] lg:w-[calc(33%-1rem)] xl:w-full max-h-min p-6 rounded-3xl ${colors} ${pseudoOpacity} ${
        active && 'outline outline-4 outline-indigo-400'
      } shadow-md transition ease-in-out`}
      onClick={offCompact}
    >
      <h3 className="text-center text-lg font-bold ">{title}</h3>

      <AnimatePresence>
        {!isCompact && (
          <motion.div
            className="flex flex-col gap-y-4 overflow-hidden"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
          >
            <span className="text-center">{workTimeSec}</span>{' '}
            {/* Время в секундах для понимания что задача активна*/}
            {!!description.trim().length && (
              <p className="p-3 rounded-lg bg-sky-200">{description}</p>
            )}
            <span className="text-center">Время выполнения</span>
            <div className="flex gap-x-4 ">
              <Timer title="План" time={planTimeTask} />
              <Timer
                title={
                  status === 'completed'
                    ? `Факт`
                    : workTimeSec > 0
                    ? `Осталось`
                    : `Просрочено`
                }
                time={workTime}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {status !== 'completed' && (
                <Button
                  name={
                    active
                      ? 'Пауза'
                      : status === 'new'
                      ? 'Начать'
                      : 'Продолжить'
                  }
                  type="button"
                  onClick={activateTaskHandle}
                />
              )}
              <Button
                name={status === 'completed' ? 'Вернуть в работу' : 'Завершить'}
                type="button"
                onClick={completeTaskHandle}
              />
              {status !== 'completed' && (
                <Button name="Изменить" type="button" onClick={toggleModal} />
              )}
              <Button name="Свернуть" type="button" onClick={onCompact} />
            </div>
            <Button
              name="Удалить задачу"
              type="button"
              onClick={deleteTaskHandle}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {modal && (
        <AnimatePresence>
          <motion.div
            key="modalEdit"
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={toggleModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <EditForm
              formId={id}
              formTitle={title}
              formDescription={description}
              formWorkTime={workTime}
              formWorkTimeSec={workTimeSec}
              forEditClose={toggleModal}
            />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default Task;
