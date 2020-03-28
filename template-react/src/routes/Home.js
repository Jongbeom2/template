import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import profileImg from '../image/profile.png';
import Typography from '@material-ui/core/Typography';
import RoomIcon from '@material-ui/icons/Room';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  profileImg: {
    width: '13rem',
    height: '13rem',
  },
  content: {
    display: 'flex'
  }
}));
const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} className={classes.paper}>
          <Avatar alt="Jongbeom Lee" src={profileImg} className={classes.profileImg} />
          <Typography component="h1" variant="h6" color='textPrimary' style={{marginTop: '0.5rem'}} >
            Jongbeom Lee
          </Typography>
          <Typography component="h1" variant="body2" color='textPrimary' style={{marginTop: '0.5rem'}} >
            Web Developer
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper style={{height: '2rem'}} elevation={0}>
            <div className={classes.content}>
              <RoomIcon />
              <Typography component="h1" variant="h6" color='textPrimary' >
                Bundang-gu, Seongnam-si
              </Typography>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Paper >xs=12 sm=6</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;