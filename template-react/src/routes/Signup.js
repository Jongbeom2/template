import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../components/Copoyright';
import AppbarEmpty from '../components/appbar/AppbarEmpty';
import CircularProgress from '@material-ui/core/CircularProgress';
const useStyles = makeStyles(theme => ({
  root:{
    background: theme.palette.background.paper,
    width:'100%',
    height: '100%'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(15),
    backgroundColor: theme.palette.primary.dark,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  typographyButton: {
    cursor: 'pointer',
    color: theme.palette.primary.main
  },
  message:{
    marginTop: theme.spacing(1),
  }
}));
const Signup = () => {
  const classes = useStyles();
  const history = useHistory();
  const [nickname, setNickname] = useState('');
  const [email, setEamil] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isInProgress, setIsInProgress] = useState(false);
  const [message, setMessage] = useState('');
  useEffect(() => {
    checkIsSignedin();
  }, []);
  const checkIsSignedin = () => {
    axios.post('/auth/check')
		.then(res => {
			if (res.data){
				if(res.data.result === true){
          console.log('[Post] /auth/check',res.data.message);
          history.push('/');
        }else{
          console.log('[Post] /auth/check',res.data.message);
        }
			}
		})
  };
  const handleChangeNickname = (e) => {
    setNickname(e.target.value);
  }
  const handleChangeEmail = (e) => {
    setEamil(e.target.value);
  }
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }
  const handleChangePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  }
  const handleClickSignUp = () => {
    if (nickname === '' || email === '' || password === '' || passwordConfirm === ''){
      setMessage('All fields are required.')
      return;
    }
    if (password !== passwordConfirm){
      setMessage('Those passwords didn\'t match. Try again.')
      return;
    }
    setIsInProgress(true);
    // Server에 signup 요청
    axios.post('/auth/signup',{
      nickname,
			email,
			password
		})
		.then(res => {
			if (res.data.result !== false){
        console.log('[Post] /auth/signup', res.data.message);
        history.push('/signin');
			}else{
        if (res.data.type === 'useError'){
          setIsInProgress(false);
          setMessage('This email address is already exist.');
        }else{
          setIsInProgress(false);
          setMessage('There was an error. Please try again.');
        }
				console.log('[Post] /auth/signup', res.data.message);
			}
		})
  }
  const handleClickSignIn = () => {
    history.push('/signin');
  }
  return (
    <div className={classes.root}>
    <AppbarEmpty/>
    {isInProgress
    ?<Container maxWidth="xs">
      <div className={classes.paper}>
        <CircularProgress className={classes.progress}/>
        <Typography component="h1" variant="h5" color='textPrimary'>
          Wait...
        </Typography>
      </div>
    </Container>
    :<Container component="main" maxWidth="xs" >
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" color='textPrimary'>
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="nickname"
                name="nickname"
                variant="outlined"
                required
                fullWidth
                id="nickname"
                label="Nickname"
                onChange = {handleChangeNickname}
                autoFocus/>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange = {handleChangeEmail}/>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange = {handleChangePassword}/>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password-confirm"
                label="Password Confirm"
                type="password"
                id="password-confirm"
                autoComplete="current-password"
                onChange = {handleChangePasswordConfirm}/>
            </Grid>
          </Grid>
          <Typography component="h1" variant="subtitle2" color='error' className={classes.message}>
            {message}
          </Typography>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {handleClickSignUp}>
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item> 
              <Typography onClick = {handleClickSignIn} className={classes.typographyButton} variant="body2">
                Already have an account? Sign in
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
    }
    </div>
  );
}

export default Signup;