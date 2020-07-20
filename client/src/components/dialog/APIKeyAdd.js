import React, { useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 0, 6),
  },
  buttons: {
    marginTop: theme.spacing(4),
  },
  content: {
    width: '30rem',
  },
  dialogActionBtn: {
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
  message: {
    marginTop: theme.spacing(1),
  },
}));
const APIKeyAdd = ({handleClickCloseDialog }) => {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');
  const handleSubmit = () => {
    if (!name || !domain){
      setMessage('Name and Domain are required.')
      return;
    }
    (async function addAPIKey(){
      try {
        const res = await axios.post('/apikey',{name,domain});
        if (res.data.result){
          console.log('[Post] /apikey', res.data.message);
        }        
      }catch(error){
        console.log(error);
      }
    })();
    handleClose();
  };
  const handleClose = () => {
    handleClickCloseDialog();
  };
  const handleChangeName = (e) => {
    setName(e.target.value);
  }
  const handleChangeDomain = (e)=>{
    setDomain(e.target.value);
  }
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Dialog
        open={true}
        onClose={handleClose}>
        <DialogTitle> {"API Key Apply"}</DialogTitle>
        <DialogContent >
          <TextField
            variant="outlined"
            required
            fullWidth
            margin="normal"
            label="Name"
            onChange = {handleChangeName}
            type="text"/>
            <TextField
            variant="outlined"
            required
            fullWidth
            margin="normal"
            onChange = {handleChangeDomain}
            label="Domain"
            type="text"/>
          <Typography component="h1" variant="subtitle2" color='error' className={classes.message}>
            {message}
          </Typography>
        </DialogContent>
        <DialogActions className={classes.dialogActionBtn}>
          <Button variant="contained" onClick={handleSubmit} color="primary">
            Submit
          </Button>
          <Button variant="outlined" onClick={handleClose} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default APIKeyAdd;