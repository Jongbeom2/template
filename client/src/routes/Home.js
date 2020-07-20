import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import profileImg from '../image/profile.png';
import Typography from '@material-ui/core/Typography';
import RoomIcon from '@material-ui/icons/Room';
import EmailIcon from '@material-ui/icons/Email';
import WebIcon from '@material-ui/icons/Web';
import CodeIcon from '@material-ui/icons/Code';
import WorkIcon from '@material-ui/icons/Work';
import Container from '@material-ui/core/Container';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4, 0, 6),
  },
  intro: {
    marginBottom: theme.spacing(10)
  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  profileImg: {
    width: '10rem',
    height: '10rem',
  },
  content: {
    display: 'flex',
    marginTop: theme.spacing(1)
  }
}));
const Home = () => {
  const classes = useStyles();
  const introContent = 'JB template is made by Jongbeom Lee using React, Express and MongoDB. This App is deployed in Heroku.';
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} className={classes.intro}>
          <Container maxWidth="sm">
            <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
              JB's Template
          </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              {introContent}
            </Typography>
          </Container>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.profile}>
          <Avatar alt="Jongbeom Lee" src={profileImg} className={classes.profileImg} />
          <Typography component="h1" variant="h6" color='textPrimary' style={{ marginTop: '0.5rem' }} >
            Jongbeom Lee
          </Typography>
          <Typography component="h1" variant="body2" color='textPrimary' style={{ marginTop: '0.5rem' }} >
            Web Developer
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper elevation={0} className={classes.content}>
            <RoomIcon style={{ height: '2rem', marginRight: '1rem' }} />
            <Typography style={{ height: '2rem' }} component="h1" variant="h6" color='textPrimary' >
              Bundang-gu, Seongnam-si (Location)
            </Typography>
          </Paper>
          <Paper elevation={0} className={classes.content}>
            <EmailIcon style={{ height: '2rem', marginRight: '1rem' }} />
            <Typography style={{ height: '2rem' }} component="h1" variant="h6" color='textPrimary' >
              n11334@naver.com (Contact)
            </Typography>
          </Paper>
          <Paper elevation={0} className={classes.content}>
            <WebIcon style={{ height: '2rem', marginRight: '1rem' }} />
            <Typography style={{ height: '2rem' }} component="h1" variant="h6" color='textPrimary' >
              https://jongbeom-dev.tistory.com (Blog)
            </Typography>
          </Paper>
          <Paper elevation={0} className={classes.content}>
            <CodeIcon style={{ height: '2rem', marginRight: '1rem' }} />
            <Typography style={{ height: '2rem' }} component="h1" variant="h6" color='textPrimary' >
              TOP, PO, React, Node js, Express, RDB, MongoDB, Git (Skills)
            </Typography>
          </Paper>
          <Paper elevation={0} className={classes.content}>
            <WorkIcon style={{ height: '2rem', marginRight: '1rem' }} />
            <Typography style={{ height: '2rem' }} component="h1" variant="h6" color='textPrimary' >
              Researcher in Tmax Soft (Work)
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;