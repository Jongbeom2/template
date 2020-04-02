import React, {useState} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
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
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  dialogFileName:{
    width: '30rem'
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
  }
}));
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const FreeImage = () => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPrevieURL] = useState(null);
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
    const fd = new FormData();
    fd.append('image',selectedFile);
    axios.post('/file/img',fd)
      .then(res=>{
        console.log(res);
        handleClose();
      })
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
          Free Image
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          These are free image collections. You can upload or download images.
        </Typography>
        <div className={classes.buttons}>
          <Grid container spacing={2} justify="center">
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
              Submit a photo
            </Button>
          </Grid>
        </div>
      </Container>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image="https://source.unsplash.com/random"
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Heading
                  </Typography>
                  <Typography>
                    This is a media card. You can use this section to describe the content.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    View
                  </Button>
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}>
        <DialogTitle> {"Image Upload"}</DialogTitle>
        <DialogContent className={classes.dialogFileName}>
          <TextField
          variant="outlined"
          required
          fullWidth
          label="Image Name"
          type="text"/>
          <input type="file" onChange={handleFileChange} style={{display: 'none'}} id="file" name="file"/>
          {selectedFile
          ?
          <div className={classes.dialogUploadBtn}>
            <div className={classes.imgPreviewContainer}>
              <img className={classes.imgPreview} src={previewURL}/>
            </div>
          </div>
          :<Button className = {classes.dialogUploadBtn}>
            <label for="file" style={{ width: '100%', height:'20rem',lineHeight:'20rem'}}>
              Upload
            </label>
          </Button>}
          
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

export default FreeImage;