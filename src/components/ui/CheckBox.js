import React, { Component } from 'react';

// Styles for the dialog and buttons
const dialogStyles = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
};

const buttonStyles = {
    margin: '0 10px',
    padding: '8px 16px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};

class CheckBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.checked, // Initialize with the prop value
            showDialog: false, // Controls the visibility of the dialog
            tempChecked: this.props.checked, // Temporarily store the new checked value
        };
    }

    // Handle checkbox change and show dialog
    handleCheckboxChange = (e) => {
        const { checked } = e.target;
        this.setState({
            showDialog: true, // Show the dialog
            tempChecked: checked, // Temporarily store the new checked value
        });
    };

    // Confirm the checkbox change
    handleConfirm = () => {
        const { tempChecked } = this.state;
        this.setState({
            checked: tempChecked, // Update the actual checked state
            showDialog: false, // Hide the dialog
        });
        this.props.onChange(tempChecked); // Notify the parent component
    };

    // Cancel the checkbox change
    handleCancel = () => {
        this.setState({
            showDialog: false, // Hide the dialog
            checked: false, // Reset checkbox to unmarked (unchecked)
            tempChecked: false, // Reset temporary value to unchecked
        });
    };

    render() {
        const { checked, showDialog } = this.state;

        return (
            <div>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={this.handleCheckboxChange}
                />
                {showDialog && (
                    <div style={dialogStyles}>
                        <p>Are you sure you want to mark this task as completed?</p>
                        <button onClick={this.handleConfirm} style={buttonStyles}>
                            Confirm
                        </button>
                        <button onClick={this.handleCancel} style={buttonStyles}>
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

export default CheckBox;
