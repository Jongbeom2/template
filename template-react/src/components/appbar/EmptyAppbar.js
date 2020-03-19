import React from 'react';
import {useHistory} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
  toolbar: {
    paddingRight: 24,
  },
  menuButton: {
    marginRight: 36,
  },
  title: {
    flexGrow: 1,
  },
}));
const EmptyAppbar = () => {
  const classes = useStyles();
  const history = useHistory();
  const routeToMain = ()=> {
    history.push('/home');
  }
  return (
    <AppBar position="absolute" >
      <Toolbar className={classes.toolbar}>
        <IconButton edge="start" color="inherit"className={classes.menuButton} onClick={routeToMain}>
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          Template
      </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default EmptyAppbar;