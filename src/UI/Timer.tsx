import { div } from 'framer-motion/client';

interface TaskProps {
  title: string;
  time: string;
}

const Timer: React.FC<TaskProps> = ({ title, time }) => {
  return (
    <div className="flex flex-col w-full p-3 rounded-lg text-center bg-sky-200">
      <span>{title}</span>
      <span className="text-2xl">{time}</span>
    </div>
  );
};

export default Timer;
