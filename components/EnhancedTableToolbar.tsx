

import React from 'react';
import clsx from 'clsx';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
        : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
    title: {
      flex: '1 1 100%',
    },
  }),
);

export interface EnhancedTableToolbarProps {
  isSelected: boolean;
  deleteWorkout: () => void,
  editWorkout: () => void
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { isSelected, editWorkout, deleteWorkout } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: isSelected,
      })}
    >
      {isSelected && (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          Actions
        </Typography>
      )}
      {isSelected && (
        <>
          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={deleteWorkout}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <IconButton aria-label="delete" onClick={editWorkout}>
            <EditIcon />
          </IconButton>
        </>
      )}
    </Toolbar>
  );
};

export default EnhancedTableToolbar