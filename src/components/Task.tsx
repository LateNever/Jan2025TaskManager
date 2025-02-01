import { useDispatch, UseDispatch } from 'react-redux';

import { activateTask } from '@/store/taskSlice';

import Button from '@/UI/Button';

interface TaskProps {
  id: string;
  title: string;
  description: string;
  workTime: string;
  active: boolean;
}

const Task: React.FC<TaskProps> = ({
  id,
  title,
  description,
  workTime,
  active,
}) => {
  const dispatch = useDispatch();

  const activateTaskHandle = () => {
    console.log(active);

    dispatch(activateTask({ id }));
  };

  return (
    <div
      className="flex flex-col gap-y-4 task-wrap p-6 rounded-3xl bg-emerald-100 shadow-md"
      key={id}
    >
      <h3 className="title text-center">{title}</h3>
      <span className="work-time text-center">{workTime}</span>
      <p className="description">{description}</p>
      <Button name="Начать выполнение" onClick={activateTaskHandle} />
      <Button name="Завершить выполнение" />
      {active && <span>Актвная</span>}
    </div>
  );
};

export default Task;
