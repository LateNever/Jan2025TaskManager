import { TaskType } from '@/types/task';

function Task() {
  const tasks: TaskType[] = [
    {
      id: 1,
      title: 'Вспомнить JS',
      description: 'Все забыл, но базовая инфа есть в глубинах сознания',
      completed: false,
      timeIsUp: false,
    },
    {
      id: 2,
      title: 'Вспомнить React',
      description: 'Уже начинаю что-то припоминать',
      completed: false,
      timeIsUp: false,
    },
    {
      id: 3,
      title: 'Начать писать на tsx',
      description: 'Вроде не так уж и сложно',
      completed: false,
      timeIsUp: false,
    },
  ];

  return (
    <div>
      {tasks.map((task) => {
        return (
          <div
            className="task-wrap bg-gray-500 p-2 m-2 rounded-md shadow-md"
            key={task.id}
          >
            <h3 className="title">{task.title}</h3>
            <p className="description">{task.description}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Task;
