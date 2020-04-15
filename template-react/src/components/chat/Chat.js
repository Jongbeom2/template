import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
const useStyles = makeStyles((theme) => ({
  root: {

  },
  systemChatContainer: {
    width: '15rem',
    marginTop: theme.spacing(1),
    background:theme.palette.text.disabled,
    borderRadius: '1.5rem'
  },
  systemChat:{
    height:'1.5rem',
    lineHeight:'1.5rem',
    color:theme.palette.common.white
  },
  myChatContainer:{
    marginTop: theme.spacing(1),
    background:theme.palette.primary.main,
    borderRadius: '0.5rem',
    width: 'fit-content',
    marginRight: '0rem',
    maxWidth: '15rem',
    padding:theme.spacing(1)
  },
  myChat:{
    lineHeight:'1.5rem',
    color:theme.palette.common.white
  },
  otherChatNickName:{
    marginTop: theme.spacing(1),
    color:theme.palette.common.black,
  },
  otherChatContainer:{
    marginTop: theme.spacing(1),
    background:theme.palette.common.white,
    borderRadius: '0.5rem',
    width: 'fit-content',
    marginLeft: '0rem',
    maxWidth: '15rem',
    padding:theme.spacing(1),
    wordBreak: 'break-word'
  },
  otherChat:{
    lineHeight:'1.5rem',
    color:theme.palette.common.black
  }
}));
const Chat = ({chat}) => {
  const classes = useStyles();
  return (
    <div className={classes.root} >
      {chat.user==='system'
      ?<Container  className={classes.systemChatContainer}>
        <Typography variant='body2' align='center' className={classes.systemChat}>
          {chat.chat}
        </Typography>
      </Container>
      :<div>
        {chat.isMe
        ?<Container  className={classes.myChatContainer}>
        <Typography variant='body2' align='right' className={classes.myChat}>
          {chat.chat}
        </Typography>
      </Container>
        :
        <div>
          <Typography className={classes.otherChatNickName}>
            {chat.nickName}
          </Typography>
          <Container className={classes.otherChatContainer}>
            <Typography variant='body2' align='left' className={classes.otherChat}>
              {chat.chat}
            </Typography>
          </Container>
        </div>}
      </div>}
    </div>
  );
}

export default Chat;