interface TaskProps {
  name: string;
  type: 'button' | 'submit';
  onClick?: () => void;
}

const Task: React.FC<TaskProps> = ({ name, type, onClick }) => {
  return (
    <button
      className="p-3 rounded-xl bg-blue-200 transition ease-in-out hover:bg-blue-300 active:bg-blue-400"
      type={type}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Task;
