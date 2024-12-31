import React, { Component } from 'react';
import CheckBox from './CheckBox';

class TodoItem extends Component {
    render() {
        const { data, changeStatus, updateTaskPriority, updateTaskDueDate, mode } = this.props;

        const handleChange = (checked) => changeStatus(data.id, checked);

        return (
            <li className={`todo-item ui-state-default ${data.completed ? 'completed' : 'pending'}`}>
                <div className="checkbox">
                    <label>
                        <CheckBox checked={data.completed} onChange={handleChange} />
                        {data.text}

                        {/* Display priority */}
                        <span className="priority" style={{ color: this.getPriorityColor(data.priority) }}>
                            ({data.priority})
                        </span>

                        {/* Display due date */}
                        {data.dueDate && <span className="due-date"> (Due: {data.dueDate})</span>}
                    </label>
                </div>
            </li>
        );
    }

    // Helper function to set color based on priority
    getPriorityColor(priority) {
        switch (priority) {
            case 'High':
                return 'red';
            case 'Medium':
                return 'orange';
            case 'Low':
                return 'green';
            default:
                return 'black';
        }
    }
}

export default TodoItem;
