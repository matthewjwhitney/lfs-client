import * as React from "react";
import {
    Template,
    Plugin,
} from "@devexpress/dx-react-core";
import { Typography, makeStyles } from "@material-ui/core";

const pluginDependencies = [
    { name: "Toolbar" }
];

const useStyles = makeStyles(theme => ({
    title: {
        marginLeft: theme.spacing(12),
        marginRight: theme.spacing(2)
    }
}));

export default function ToolbarTitle(props) {
    const classes = useStyles();
    return (
        <Plugin name="ToolbarTitle" dependencies={pluginDependencies}>
            <Template name="toolbarContent">
                <Typography variant="h5" className={classes.title}>{props.children}</Typography>
                {/* <div style={{ flexGrow: 1 }} /> */}
            </Template>
        </Plugin>
    );
}