import React from 'react';

const TaskCreationForm = ({ addNew, changeDueDate, changePriority, newTaskPriority, newTaskDueDate }) => {
    return (
        <div>
            <input type="text" placeholder="New task" onChange={(e) => addNew(e.target.value)} />
            <input
                type="date"
                value={newTaskDueDate}
                onChange={(e) => changeDueDate(e.target.value)}
            />
            <select value={newTaskPriority} onChange={(e) => changePriority(e.target.value)}>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
        </div>
    );
};

export default TaskCreationForm;
