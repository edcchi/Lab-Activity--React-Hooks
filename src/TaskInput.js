import React, { useState } from 'react';

const TaskInput = ({ addTask, inputRef }) => {
  const [newTaskText, setNewTaskText] = useState('');

  const handleInputChange = (e) => {
    setNewTaskText(e.target.value);
  };

  const handleAddTask = () => {
    if (newTaskText.trim() !== '') {
      addTask(newTaskText);
      setNewTaskText('');
    }
  };

  return (
    <div className="task-input">
      <input
        type="text"
        placeholder="Enter task..."
        value={newTaskText}
        onChange={handleInputChange}
        ref={inputRef}
        className="task-input__field"
      />
      <button onClick={handleAddTask} className="task-input__button">Add Task</button>
    </div>
  );
};

export default TaskInput;
