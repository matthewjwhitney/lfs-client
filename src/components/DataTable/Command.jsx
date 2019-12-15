import React from 'react';
import { IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const AddButton = ({ onExecute }) => (
    <div style={{ textAlign: 'center' }}>
        <IconButton
            color="secondary"
            onClick={onExecute}
            title="Create new row"
        >
            <FontAwesomeIcon icon="plus" />
        </IconButton>
    </div>
);

const EditButton = ({ onExecute }) => (
    <IconButton
        color="secondary" onClick={onExecute} title="Edit row">
        <FontAwesomeIcon icon="edit" />
    </IconButton>
);

const DeleteButton = ({ onExecute }) => (
    <IconButton
        color="secondary"
        onClick={() => {
            // eslint-disable-next-line
            if (window.confirm('Are you sure you want to delete this row?')) {
                onExecute();
            }
        }}
        title="Delete row"
    >
        <FontAwesomeIcon icon="trash" />
    </IconButton>
);

const CommitButton = ({ onExecute }) => (
    <IconButton
        color="secondary" onClick={onExecute} title="Save changes">
        <FontAwesomeIcon icon="save" />
    </IconButton>
);

const CancelButton = ({ onExecute }) => (
    <IconButton
        color="secondary" onClick={onExecute} title="Cancel changes">
        <FontAwesomeIcon icon="times" />
    </IconButton>
);

const commandComponents = {
    add: AddButton,
    edit: EditButton,
    delete: DeleteButton,
    commit: CommitButton,
    cancel: CancelButton,
};

export const Command = ({ id, onExecute }) => {
    const CommandButton = commandComponents[id];
    return (
        <CommandButton
            onExecute={onExecute}
        />
    );
};