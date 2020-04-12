import React, {useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import socketIOClient from "socket.io-client";
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
		left: 'calc(100% - 25rem)',
		bottom: '6rem',
		height: '35rem',
    width: '23rem',
    zIndex:'1',
    borderRadius: '0.5rem'
  },
  title:{
    color:theme.palette.common.white,
    background:theme.palette.primary.main,
    height:'3rem',
    lineHeight:'3rem',
    borderRadius: '0.5rem 0.5rem 0 0'
  },
  content:{
    height:'28.5rem',
    background:theme.palette.action.selected
  },
  inputContainer:{
    padding: '0.5rem',
    display:'flex'
  },
  inputButton:{
    height:'2rem',
    margin:'0.25rem 0 0 0.5rem'
  }
}));
const MessageList = () => {
  useEffect(() => {
    const socket = socketIOClient('/chat');
    socket.on('join', (data) =>{
      console.log(data);
    });
    socket.on('exit', (data) =>{
      console.log(data);
    });
    socket.on('news', (data) =>{
      console.log(data);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  const classes = useStyles();
  return (
    <Paper  className={classes.root}  elevation={3} >
      <Typography variant ='h6' className = {classes.title} align='center' >
        Open Chat
      </Typography>
      <div className={classes.content}>
      </div>
      <div className={classes.inputContainer}>
        <TextField size="small" variant="outlined" autoFocus fullWidth placeholder="Type Message"/>
        <Button variant="contained" color="primary" className={classes.inputButton} >
          Send
        </Button>
      </div>
    </Paper >
  );
}

export default MessageList;