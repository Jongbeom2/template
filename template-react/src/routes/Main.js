import React, { useEffect, useState } from 'react';
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
/** 
 * @author : 이종범
 * @description
 * Main component로 Appbar component를 불러 오고 router를 설정함.
 * 로그인 유무를 체크하고 로그인과 상관없는 router는 그대로 두고
 * 로그인을 해야 접근할 수 있는 router는 AuthRoute에 로그인 유무와 함께 전달함.
 * @since : 2020.04.15
*/
const useStyles = makeStyles(theme => ({
  /** 
  * @description
  * Main component의 style과 className을 정의함.
  */
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
  /** 
  * @description
  * /auth/check로 요청하여 로그인 유무를 받음
  * res.data.result에 로그인 유무가 저장되어 있음.
  */
  async function getUser() {
    try {
      const res = await axios.post('/auth/check');
      if (res.data.result) {
        setIsSignedin(true);
        console.log('[Post] /auth/check', res.data.message);
      } else {
        console.log('[Post] /auth/check', res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={classes.root} >
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
      <ChatButton isSignedin={isSignedin} />
    </div >
  );
}
export default Main;