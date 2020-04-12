import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Home from './Home';
import SideProject from './SideProject'
import APIDoc from './APIDoc';
import APIKey from './APIKey';
import FreeImage from './FreeImage';
import AuthRoute from '../components/auth/AuthRoute';
import AppbarMain from '../components/appbar/AppbarMain';
import ChatButton from '../components/chat/Button'
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    background: theme.palette.background.paper,
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
  const [isSignedin, setIsSignedin] = useState(false);
  useEffect(() => {
    getUser();
  }, []);
  const getUser = () => {
    axios.post('/auth/check')
		.then(res => {
			if (res.data.result){
        setIsSignedin(true);
        console.log('[Post] /auth/check',res.data.message);
			}else{
        console.log('[Post] /auth/check',res.data.message);
      }
		})
  };
  return (
    <div  className={classes.root} >
      <AppbarMain isSignedin={isSignedin} />
      <div className={classes.content} >
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/sideproject" component={SideProject} />
            <Route exact path="/freeimage" component={FreeImage} />
            <Route exact path="/openapidoc" component={APIDoc} />
            <AuthRoute isSignedin={isSignedin} path="/openapikey">
              <APIKey />
            </AuthRoute>
          </Grid>
        </Container>
      </div>
      <ChatButton />
    </div >
  );
}

export default Main;