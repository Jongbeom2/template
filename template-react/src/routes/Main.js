import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Home from './Home';
import Portfolio from './Portfolio'
import APIList from './APIList';
import Appkey from './AppKey';
import Video from './Video';
import FreeImage from './FreeImage';
import PrivateRoute from '../components/PrivateRoute';
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
  const [user, setUser] = useState({isLogined:false});
  useEffect(() => {
    getUser();
  }, []);
  const getUser = () => {
    axios.post('/auth')
		.then(res => {
			if (res.data){
				setUser(res.data);
			}
		})
  };
  return (
    <div className={classes.root}>
      <MainAppbar user={user} />
      <div className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/portfolio" component={Portfolio} />
            <Route exact path="/freeimage" component={FreeImage} />
            <Route exact path="/video" component={Video} />
            <Route exact path="/apilist" component={APIList} />
            <PrivateRoute user={user} path="/appkey">
              <Appkey />
            </PrivateRoute>
          </Grid>
        </Container>
      </div>
    </div>
  );
}

export default Main;