import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
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
  dialogFileName:{
    width: '30rem',
  },
  dialogUploadBtn:{
    width: '30rem',
    height: '20rem',
    marginTop: theme.spacing(2)
  },
  dialogActionBtn:{
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
  imgPreview:{
    width: '30rem',
    height: 'auto'
  },
  imgPreviewContainer:{
    width: '30rem',
    overflowY: 'scroll',
    overflowX: 'hidden',
    height: '20rem',
  },
  message:{
    marginTop: theme.spacing(1),
  },
}));
const ImageUpload = ({handleClickCloseImageUploadDialog}) => {
  const history = useHistory();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPrevieURL] = useState(null);
  const [fileName, setFileName] = useState('');
  const [message, setMessage] = useState('');
  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setSelectedFile(file);
    const reader = new FileReader();
    // Read File
		if (file) {
			reader.readAsDataURL(file);
		}
		// Draw
		reader.onload = (e) => {
			setPrevieURL(e.target.result);
		}
  };
  const handleFileSubmit = () => {
    if (!fileName || !selectedFile){
      setMessage('Image and image name are required.')
      return;
    }
    const fd = new FormData();
    fd.append('image',selectedFile);
    fd.append('name',fileName);
    axios.post('/file/img',fd)
      .then(res=>{
        if(!res.data.result){
          history.push('signin');
          console.log('[Post] /file/img', res.data.message);
        }else{
          console.log('[Post] /file/img', res.data.message);
        }
        handleClose();
      })
      .catch(error=>{
        console.log('[Post] /file/img', error.message);
        setMessage('Error! Try agian.')
      })
  };
  const handleClose = () => {
    handleClickCloseImageUploadDialog();
  };
  const handleChangeFileName = (e) => {
    setFileName(e.target.value);
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Dialog
        open={true}
        onClose={handleClose}>
        <DialogTitle> {"Image Upload"}</DialogTitle>
        <DialogContent className={classes.dialogFileName}>
          <TextField
          variant="outlined"
          required
          fullWidth
          label="Image Name"
          type="text"
          onChange={handleChangeFileName}/>
          <input type="file" onChange={handleFileChange} style={{display: 'none'}} id="file" name="file"/>
          {selectedFile
          ?
          <div className={classes.dialogUploadBtn}>
            <div className={classes.imgPreviewContainer}>
              <label htmlFor="file" style={{ width: '100%', height:'20rem',lineHeight:'20rem',cursor:'pointer'}}>
                <img alt='upload' className={classes.imgPreview} src={previewURL}/>
              </label>
            </div>
          </div>
          :<Button className = {classes.dialogUploadBtn}>
            <label for="file" style={{ width: '100%', height:'20rem',lineHeight:'20rem'}}>
              Upload
            </label>
          </Button>}
          <Typography component="h1" variant="subtitle2" color='error' className={classes.message}> 
            {message}
          </Typography>
        </DialogContent>
        <DialogActions className={classes.dialogActionBtn}>
          <Button variant="contained" onClick={handleFileSubmit} color="primary">
            Submit
          </Button>
          <Button variant ="outlined" onClick={handleClose} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ImageUpload;