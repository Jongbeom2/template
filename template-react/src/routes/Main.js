import React, { useEffect} from 'react';
import { Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Home from './Home';
import Portfolio from './Portfolio'
import APIList from './APIList';
import Appkey from './AppKey';
import Video from './Video';
import PrivateRoute from '../components/auth/PrivateRoute';
import MainAppbar from '../components/appbar/MainAppbar';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));
const Main = () => {
  const classes = useStyles();
  useEffect(() => {
    // Check login from server
    
  }, []);
  return (
    <div className={classes.root}>
      <MainAppbar />
      <div className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Route path="/home" component={Home} />
            <Route path="/portfolio" component={Portfolio} />
            <Route path="/freeimage" component={Video} />
            <Route path="/video" component={Video} />
            <Route path="/apilist" component={APIList} />
            <PrivateRoute path="/appkey">
              <Appkey />
            </PrivateRoute>
          </Grid>
        </Container>
      </div>
    </div>
  );
}

export default Main;