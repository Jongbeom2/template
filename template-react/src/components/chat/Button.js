import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CommentIcon from '@material-ui/icons/Comment';
import ClearIcon from '@material-ui/icons/Clear';
import ChatList from './ChatList'
import {useHistory} from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    background: theme.palette.primary.main,
		left: 'calc(100% - 6rem)',
		bottom: '1rem',
		height: '4rem',
    width: '4rem',
    zIndex:'1',
    borderRadius:'4rem',
  },
  icon:{
    height: '2.8rem',
    width: '2.8rem',
    margin: '0.6rem 0 0 0.6rem',
    color: theme.palette.common.white,
    cursor: 'pointer'
  }
}));
const Button = ({isSignedin}) => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const handleClick = () =>{
    if (open){
      setOpen(false)
    }else{
      if(isSignedin){
        setOpen(true)
      }else{
        history.push('signin');
      }
    }
  }
  return (
    <div className={classes.root} >
      <div onClick = {handleClick}> 
      {open
      ?<div>
        <ClearIcon className={classes.icon}/>
      </div>
      :<CommentIcon className={classes.icon}/>}
      </div>
      {open?<ChatList/>:null}
    </div>
  );
}

export default Button;