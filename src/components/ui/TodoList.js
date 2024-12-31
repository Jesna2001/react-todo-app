import React from 'react';
import TodoItem from './TodoItem';
import Header from './Header';
import Footer from './Footer';
import Info from './Info';
import { applyFilter, search, FILTER_ACTIVE } from '../../services/filter';

export default function TodoList(props) {
    const { list, filter, mode, query } = props.data;
    const { addNew, changeFilter, changeStatus, changeMode, setSearchQuery, changePriority } = props.actions;
    const activeItemCount = applyFilter(list, FILTER_ACTIVE).length;
    const items = search(applyFilter(list, filter), query);

    // Function to handle priority change on task creation
    const handlePriorityChange = (event) => {
        changePriority(event.target.value);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="todolist">
                    {/* Header with task creation */}
                    <Header {...{ addNew, mode, query, setSearchQuery }} />

                    {/* Add priority dropdown to set priority for new tasks */}
                    <div>
                        <label htmlFor="priority">Set Priority:</label>
                        <select id="priority" onChange={handlePriorityChange}>
                            <option value="High">High</option>
                            <option value="Medium" selected>Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>

                    {/* Render list of TodoItems */}
                    <ul>
                        {items.map((task) => (
                            <TodoItem key={task.id} data={task} changeStatus={changeStatus} />
                        ))}
                    </ul>

                    {/* Footer with active task count and filter */}
                    <Footer {...{ activeItemCount, filter, changeFilter, mode, changeMode }} />

                    {/* Info for displaying the current mode */}
                    <Info {...{ mode }} />
                </div>
            </div>
        </div>
    );
}
