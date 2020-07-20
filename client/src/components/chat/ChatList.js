import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import socketIOClient from "socket.io-client";
import Button from '@material-ui/core/Button';
import Chat from './Chat';
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    left: 'calc(100% - 25rem)',
    bottom: '6rem',
    height: '35rem',
    width: '23rem',
    zIndex: '1',
    borderRadius: '0.5rem'
  },
  title: {
    color: theme.palette.common.white,
    background: theme.palette.primary.main,
    height: '3rem',
    lineHeight: '3rem',
    borderRadius: '0.5rem 0.5rem 0 0'
  },
  content: {
    height: '28.5rem',
    background: theme.palette.action.selected,
    overflowY: 'scroll',
    boxSizing: 'border-box',
    padding: theme.spacing(1)
  },
  inputContainer: {
    padding: '0.5rem',
    display: 'flex'
  },
  inputButton: {
    height: '2rem',
    margin: '0.25rem 0 0 0.5rem'
  }
}));
const ChatList = () => {
  const [chatList, setChatList] = useState([]);
  const [chatMessage, setChatMessage] = useState('');
  const contentContainer = useRef(null);
  const chatInput = useRef(null);
  useEffect(() => {
    getChatList();
    const socket = socketIOClient('/chat');
    chatJoin();
    socket.on('join', (data) => {
      if (data.user === 'system') {
        setChatList(chatList => [...chatList, data])
      }
      contentContainer.current.scrollTop = contentContainer.current.scrollHeight
    });
    socket.on('exit', (data) => {
      if (data.user === 'system') {
        setChatList(chatList => [...chatList, data])
      }
      contentContainer.current.scrollTop = contentContainer.current.scrollHeight
    });
    socket.on('send', (data) => {
      (async function getUserId() {
        try {
          const res = await axios.get('/auth/id');
          const newChat = data;
          console.log(res.data.id, data.user);
          if(res.data.result){
            if (res.data.id === data.user){
              newChat.isMe = true;
            }
            setChatList(chatList => [...chatList, newChat]);
            contentContainer.current.scrollTop = contentContainer.current.scrollHeight
            console.log('[Get] /chat', res.data.message);
          }else{
            console.log('[Get] /chat', res.data.message);
          }
        } catch (error) {
          console.log(error);
        }
      })();

    });
    return () => {
      socket.disconnect();
      chatExit();
    };
  }, []);
  async function getChatList() {
    try {
      const res = await axios.get('/chat');
      setChatList(res.data.chatList);
      contentContainer.current.scrollTop = contentContainer.current.scrollHeight
      console.log('[Get] /chat', res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  async function chatJoin() {
    try {
      const res = await axios.post('/chat/join');
      console.log('[Post] /chat/join', res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  async function chatExit() {
    try {
      const res = await axios.post('/chat/exit');
      console.log('[Post] /chat/exit', res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  async function chatSend() {
    try {
      setChatMessage('');
      chatInput.current.value = ''
      const res = await axios.post('/chat/send', { chatMessage });
      console.log('[Post] /chat/send', res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setChatMessage(e.target.value);
  }
  const handleClick = () => {
    if (chatMessage !== '') {
      chatSend();
    }
  }
  const handleKeyPress = (e)=>{
    if (e.key === 'Enter') {
      handleClick();
    }
  }
  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={3} >
      <Typography variant='h6' className={classes.title} align='center' >
        Open Chat
      </Typography>
      <div className={classes.content} ref={contentContainer}>
        {chatList.map((chat) => (
          <Chat key={chat._id} chat={chat} />
        ))}
      </div>
      <div className={classes.inputContainer}>
        <TextField
          inputRef = {chatInput}
          size="small"
          variant="outlined"
          autoFocus
          fullWidth
          placeholder="Type Message"
          onChange={handleChange}
          onKeyPress={handleKeyPress}/>
        <Button variant="contained" color="primary" className={classes.inputButton} onClick={handleClick} >
          Send
        </Button>
      </div>
    </Paper >
  );
}

export default ChatList;