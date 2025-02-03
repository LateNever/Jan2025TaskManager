interface TaskProps {
  name: string;
  type: 'button' | 'submit';
  onClick?: () => void;
  width?: string;
}

const Task: React.FC<TaskProps> = ({ name, type, onClick, width }) => {
  return (
    <button
      className={`${width} p-3 rounded-xl bg-blue-200 transition ease-in-out hover:bg-blue-300 active:bg-blue-400`}
      type={type}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Task;
