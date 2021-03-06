import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 1),
  },
  otherSignin: {
    margin: theme.spacing(1, 0, 2),
    backgroundColor: theme.palette.custom.kakao,
    '&:hover': {
      backgroundColor: theme.palette.custom.kakaoHover,
    },
  },
  typographyButton: {
    cursor: 'pointer',
    color: theme.palette.primary.main
  },
  progress:{
    marginBottom: theme.spacing(10),
    marginTop: theme.spacing(30),
  },

}));
const Signin = () => {
  const classes = useStyles();
  const [email, setEamil] = useState('');
  const [password, setPassword] = useState('');
  const [isInProgress, setIsInProgress] = useState(false);
  const [message, setMessage] = useState('');
  const history = useHistory();
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
  const handleChangeEmail = (e) => {
    setEamil(e.target.value);
  }
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }
  const hanldeClickSignIn = () => {
    if (email ==='' || password === ''){
      setMessage('Email address and password are required.');
      return;
    }
    setIsInProgress(true);
    // Server에 Signin 요청
    axios.post('/auth/signin',{
			email,
			password
		})
		.then(res => {
			if (res.data.result !== false){
        console.log('[Post] /auth/signin', res.data.message);
        history.push('/home');
			}else{
        setIsInProgress(false);
        setMessage('Try again or click Forgot password to reset it.');
				console.log('[Post] /auth/signin', res.data.message);
			}
		})
  }
  const handleClickKakao = () => {
    window.location.href = 'http://localhost:5000/auth/kakao';
    //window.location.href = 'https://jb-template.herokuapp.com/auth/kakao';
  }
  const handleClickSignUp = () =>{
    history.push('/signup');
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
    :<Container maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" color='textPrimary'>
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange = {handleChangeEmail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange = {handleChangePassword}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Typography component="h1" variant="subtitle2" color='error'>
            {message}
          </Typography>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={hanldeClickSignIn}
          >
            Sign In
          </Button>
          <Button
            fullWidth
            variant="contained"
            className={classes.otherSignin}
            onClick={handleClickKakao}
          >
            Kakao
          </Button>
          <Grid container>
            <Grid item xs>
              <Typography className = {classes.typographyButton} variant="body2">
                Forgot password?
              </Typography>
            </Grid>
            <Grid item>
              <Typography className = {classes.typographyButton} onClick = {handleClickSignUp} variant="body2">
                {"Don't have an account? Sign Up"}
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

export default Signin;