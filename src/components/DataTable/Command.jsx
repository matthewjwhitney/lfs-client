import React from 'react';
import { IconButton } from '@material-ui/core';
import { AddOutlined, DeleteOutlined, EditOutlined, CloseOutlined, SaveOutlined } from '@material-ui/icons'

const AddButton = ({ onExecute }) => (
    <div style={{ textAlign: 'center' }}>
        <IconButton
            onClick={onExecute}
            title="Create new row"
        >
            <AddOutlined />
        </IconButton>
    </div>
);

const EditButton = ({ onExecute }) => (
    <IconButton
        onClick={onExecute} title="Edit row">
        <EditOutlined />
    </IconButton>
);

const DeleteButton = ({ onExecute }) => (
    <IconButton

        onClick={() => {
            // eslint-disable-next-line
            if (window.confirm('Are you sure you want to delete this row?')) {
                onExecute();
            }
        }}
        title="Delete row"
    >
        <DeleteOutlined />
    </IconButton>
);

const CommitButton = ({ onExecute }) => (
    <IconButton
        onClick={onExecute} title="Save changes">
        <SaveOutlined />
    </IconButton>
);

const CancelButton = ({ onExecute }) => (
    <IconButton
        onClick={onExecute} title="Cancel changes">
        <CloseOutlined />
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