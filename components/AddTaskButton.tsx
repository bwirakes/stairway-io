// components/AddTaskButton.tsx
import React from 'react';
import { FiPlus } from 'react-icons/fi';

interface AddTaskButtonProps {
  onClick: () => void;
}

const AddTaskButton: React.FC<AddTaskButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center px-4 py-2 text-white transition duration-300 bg-green-500 rounded-lg shadow-md hover:bg-green-600"
    >
      <FiPlus className="mr-2" />
      Add Task
    </button>
  );
};

export default AddTaskButton;
