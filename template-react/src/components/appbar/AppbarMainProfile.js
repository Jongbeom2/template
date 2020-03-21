import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
const useStyles = makeStyles(theme => ({
  root: {
    cursor: 'pointer',
  },
}));
const AppbarMainProfile = ({onClick}) => {
  const classes = useStyles();
  return(
    <AccountCircleIcon className= {classes.root} onClick={onClick}/>
  )
}

export default AppbarMainProfile;