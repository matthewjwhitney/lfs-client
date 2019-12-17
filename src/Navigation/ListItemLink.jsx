import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link as RouterLink } from 'react-router-dom';

export default function ListItemLink(props) {
    const { title, path } = props;

    const renderLink = React.useMemo(
        () =>
            React.forwardRef((itemProps, ref) => (
                <RouterLink to={path} {...itemProps} innerRef={ref} />
            )),
        [path],
    );

    return (
        <ListItem button component={renderLink}>
            <ListItemText primary={title} />
        </ListItem>
    );
}

ListItemLink.propTypes = {
    icon: PropTypes.element,
    text: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
};