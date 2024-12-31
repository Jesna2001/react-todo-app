import React from 'react';

const SortingControls = ({ toggleSortOrder, sortByDueDate, sortAscending }) => {
    return (
        <div>
            <button onClick={toggleSortOrder}>
                Sort by {sortByDueDate ? 'Priority' : 'Due Date'} ({sortAscending ? 'Ascending' : 'Descending'})
            </button>
        </div>
    );
};

export default SortingControls;
