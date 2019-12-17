import React from "react";
import PropTypes from 'prop-types';
import Skeleton from '@material-ui/lab/Skeleton';
import { Paper, IconButton, Typography, useTheme, Chip, makeStyles } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/FavoriteOutlined";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ShareIcon from "@material-ui/icons/ShareOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVertOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons"
import { formatURL } from "../../utils/string";
const useStyles = makeStyles(theme => ({
}));


export default function ProducerCard(props) {
  const classes = useStyles();
  const theme = useTheme();

  const Media = () => props.image ?
    <img src={props.image} alt={props.name} />
    : <Skeleton variant="rect" width='100%' height={200} />;

  return (
    <Paper square style={{ marginBottom: 1 }}>
      <div style={{ display: 'flex' }}>
        <div style={{ flexGrow: 1, width: '100%', height: '100%' }}>
          <Media />
        </div>
        <div style={{ flexGrow: 1, minWidth: '400px', padding: theme.spacing(2) }}>
          <Typography variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
            {props.description}
          </Typography>
          {props.tags.split(',').map(tag => <Chip key={tag} size="small" label={tag} />)}
        </div>
        <div style={{ flexGrow: 1 }}>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
          <IconButton>
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton>
            <ShareIcon />
          </IconButton>
          <IconButton target="_blank" href={formatURL(props.website)}>
            <FontAwesomeIcon icon={faGlobe} />
          </IconButton>
        </div>
      </div >
    </Paper >
  );
}

ProducerCard.propTypes = {
  id: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.string,
  website: PropTypes.string
};
