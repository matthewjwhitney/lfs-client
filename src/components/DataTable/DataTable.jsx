import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { camelCaseToTitle } from "../../utils/string";
import {
    Grid,
    Table,
    TableHeaderRow,
    TableEditRow,
    TableEditColumn,
    SearchPanel,
    Toolbar
} from "@devexpress/dx-react-grid-material-ui";
import { Paper } from "@material-ui/core";
import { EditingState, IntegratedFiltering, IntegratedSorting, SearchState, SortingState } from "@devexpress/dx-react-grid";

import ToolbarTitle from './plugins/ToolbarTitle';
import { Command } from "./Command";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    }
}));

const getRowId = row => row.id;

export default function DataTable(props) {
    const classes = useStyles();
    const { commitChanges, rows, title } = props;
    let columns = [];
    if (rows && rows.length > 0) {
        columns = Object.keys(rows[0]).map(key => ({
            title: camelCaseToTitle(key), name: key
        }));
    }
    return (
        <div className={classes.root}>
            <Paper>
                <Grid rows={rows} columns={columns} getRowId={getRowId}>
                    <EditingState onCommitChanges={commitChanges} />
                    <SearchState />
                    <SortingState
                        defaultSorting={[{ columnName: 'name', direction: 'asc' }]}
                    />
                    <IntegratedSorting />
                    <IntegratedFiltering />
                    <Toolbar />
                    <ToolbarTitle >{title}</ToolbarTitle>
                    <SearchPanel />
                    <Table />
                    <TableHeaderRow showSortingControls />
                    <TableEditColumn showAddCommand showEditCommand showDeleteCommand commandComponent={Command} />
                    <TableEditRow />
                </Grid>
            </Paper>
        </div>
    );
}
