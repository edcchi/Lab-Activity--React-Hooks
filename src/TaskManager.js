import React, { useState, useMemo, useCallback, useRef } from 'react';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import { useTaskContext } from './TaskContext';

const TaskManager = () => {
  const { state, dispatch } = useTaskContext();
  const { tasks } = state;
  const [filterType, setFilterType] = useState('all');
  const inputRef = useRef(null);

  const addTask = useCallback((text) => {
    if (text.trim() !== '') {
      const newTask = {
        id: tasks.length + 1,
        text: text,
        completed: false
      };
      dispatch({ type: 'ADD_TASK', payload: newTask });
      inputRef.current.focus();
    }
  }, [tasks, dispatch]);

  const deleteTask = useCallback((taskId) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId });
  }, [dispatch]);

  const toggleTask = useCallback((taskId) => {
    dispatch({ type: 'TOGGLE_TASK', payload: taskId });
  }, [dispatch]);

  const filteredTasks = useMemo(() => {
    switch (filterType) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'incomplete':
        return tasks.filter(task => !task.completed);
      default:
        return tasks; 
    }
  }, [tasks, filterType]);


  const handleFilterChange = useCallback((newFilter) => {
    setFilterType(newFilter);
  }, []);

  return (
    <div className="task-manager">
      <h2 className="task-manager__title">To-Do List</h2>
      <TaskInput addTask={addTask} inputRef={inputRef} />
      <div className="task-manager__filters">
        <button className={`task-manager__filter ${filterType === 'all' ? 'active' : ''}`} onClick={() => handleFilterChange('all')}>All</button>
        <button className={`task-manager__filter ${filterType === 'completed' ? 'active' : ''}`} onClick={() => handleFilterChange('completed')}>Completed</button>
        <button className={`task-manager__filter ${filterType === 'incomplete' ? 'active' : ''}`} onClick={() => handleFilterChange('incomplete')}>Incomplete</button>
      </div>
      <TaskList tasks={filteredTasks} onDelete={deleteTask} onToggle={toggleTask} />
    </div>
  );
};

export default TaskManager;
