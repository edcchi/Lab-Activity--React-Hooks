import React from 'react';

const TaskList = ({ tasks, onDelete, onToggle }) => {
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <li key={task.id} className={`task-list__item ${task.completed ? 'completed' : ''}`}>
          <span
            className="task-list__text"
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            onClick={() => onToggle(task.id)}
          >
            {task.text}
          </span>
          <button onClick={() => onDelete(task.id)} className="task-list__delete">Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
