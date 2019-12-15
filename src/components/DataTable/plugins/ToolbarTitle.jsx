import * as React from "react";
import {
    Template,
    Plugin,
} from "@devexpress/dx-react-core";
import { Typography } from "@material-ui/core";

const pluginDependencies = [
    { name: "Toolbar" }
];

export default class ToolbarTitle extends React.PureComponent {
    render() {
        return (
            <Plugin name="ToolbarTitle" dependencies={pluginDependencies}>
                <Template name="toolbarContent">
                    <Typography variant="h5">{this.props.children}</Typography>
                    <div style={{ flexGrow: 1 }} />
                </Template>
            </Plugin>
        );
    }
}
