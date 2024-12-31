import React, { Component } from 'react';
import { FILTER_ALL } from '../../services/filter';
import { MODE_CREATE, MODE_NONE } from '../../services/mode';
import { objectWithOnly, wrapChildrenWith } from '../../util/common';
import { getAll, addToList, updateStatus } from '../../services/todo';

class StateProvider extends Component {
    constructor() {
        super();
        this.state = {
            query: '',
            mode: MODE_CREATE,
            filter: FILTER_ALL,
            list: getAll(),
            newTaskPriority: 'Medium', // Default priority for new tasks
            newTaskDueDate: '', // Store due date for new tasks
            sortByDueDate: true, // Whether to sort by due date or priority
            sortAscending: true, // Whether the sorting is ascending or descending
        };
    }

    render() {
        let children = wrapChildrenWith(this.props.children, {
            data: this.state,
            actions: objectWithOnly(this, ['addNew', 'changeFilter', 'changeStatus', 'changeMode', 'setSearchQuery', 'changePriority', 'changeDueDate', 'toggleSortOrder'])
        });

        return <div>{children}</div>;
    }

    addNew(text) {
        let updatedList = addToList(this.state.list, {
            text,
            completed: false,
            priority: this.state.newTaskPriority,
            dueDate: this.state.newTaskDueDate, // Add the due date
        });

        this.setState({ list: updatedList });
    }

    // Handle due date change for new tasks
    changeDueDate(dueDate) {
        this.setState({ newTaskDueDate: dueDate });
    }

    // Handle priority change for new tasks
    changePriority(priority) {
        this.setState({ newTaskPriority: priority });
    }

    changeFilter(filter) {
        this.setState({ filter });
    }

    changeStatus(itemId, completed) {
        const updatedList = updateStatus(this.state.list, itemId, completed);
        this.setState({ list: updatedList });
    }

    changeMode(mode = MODE_NONE) {
        this.setState({ mode });
    }

    setSearchQuery(text) {
        this.setState({ query: text || '' });
    }

    // Toggle between ascending and descending sort order
    toggleSortOrder() {
        this.setState(prevState => ({ sortAscending: !prevState.sortAscending }));
    }

    // Sorting logic based on the selected sorting method (Due Date or Priority)
    sortedList() {
        let sortedList = this.state.list;
        
        if (this.state.sortByDueDate) {
            sortedList = sortedList.sort((a, b) => {
                const dateA = new Date(a.dueDate);
                const dateB = new Date(b.dueDate);
                return this.state.sortAscending ? dateA - dateB : dateB - dateA;
            });
        } else {
            sortedList = sortedList.sort((a, b) => {
                const priorityOrder = { High: 3, Medium: 2, Low: 1 };
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            });
        }

        return sortedList;
    }
}

export default StateProvider;
