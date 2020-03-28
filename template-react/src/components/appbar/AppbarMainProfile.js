import React, { useRef, useState } from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    cursor: 'pointer'
  },
  menuItem: {
    fontSize: '1rem',
  }
}));
const AppbarMainProfile = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const history = useHistory();
  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickSignout = () => {
    axios.post('/auth/signout')
		.then(res => {
			if (res.data){
				if(res.data.result === true){
          console.log('[Post] /auth/signout',res.data.message);
          history.push('/signin');
        }else{
          console.log('[Post] /auth/signout',res.data.message);
          history.push('/signin');
        }
			}
		})
  }
  return (
    <div className={classes.root}>
      <AccountCircleIcon ref={anchorRef} onClick={handleToggle} />
      <Popper open={open} anchorEl={anchorRef.current} transition disablePortal placement='bottom-end'>
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: 'center top' }}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  <MenuItem className={classes.menuItem} onClick={handleClose}>Profile</MenuItem>
                  <MenuItem className={classes.menuItem} onClick={handleClickSignout}>Signout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}

export default AppbarMainProfile;