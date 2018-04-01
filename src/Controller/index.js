import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import {
  LowPriority as SelectFromListIcon,
  FastRewind as FastRewindIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  FastForward as FastForwardIcon,
  Settings as SettingsIcon
} from 'material-ui-icons';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

function Controller(props) {
  const { classes } = props;
  return (
    <div>
      <Button variant="fab" mini color="secondary" aria-label="add" className={classes.button}>
        <SelectFromListIcon />
      </Button>
      <Button variant="fab" mini color="primary" aria-label="add" className={classes.button}>
        <FastRewindIcon />
      </Button>
      <Button variant="fab" color="primary" aria-label="add" className={classes.button}>
        <PlayIcon />
      </Button>
      <Button variant="fab" color="primary" aria-label="add" className={classes.button}>
        <PauseIcon />
      </Button>
      <Button variant="fab" mini color="primary" aria-label="add" className={classes.button}>
        <FastForwardIcon />
      </Button>
      <Button variant="fab" mini color="secondary" aria-label="add" className={classes.button}>
        <SettingsIcon />
      </Button>
    </div>
  );
}

export default withStyles(styles)(Controller);