interface TaskProps {
  name: string;
  onClick?: () => void;
}

const Task: React.FC<TaskProps> = ({ name, onClick }) => {
  return (
    <button
      className="p-3 rounded-xl bg-blue-200 transition ease-in-out hover:bg-blue-300 active:bg-blue-400"
      type="submit"
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Task;
